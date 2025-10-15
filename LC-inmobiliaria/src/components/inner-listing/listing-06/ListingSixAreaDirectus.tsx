"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { DirectusProperty } from "@/types/directus";

const initialFilterState = {
  type: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  operation: "",
};

const normalizeText = (value?: string) => {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
};

const formatLocation = (property: DirectusProperty) => {
  const parts = [property.Address, property.City, property.State].filter(Boolean);
  return parts.join(", ");
};

const formatPrice = (price: number | string, currency: string[] = ["MXN"]) => {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;
  const curr = Array.isArray(currency) ? currency[0] : currency;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: curr || "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceNum);
};

const getDirectusImageUrl = (imageId?: string, width: number = 1200) => {
  if (!imageId) return "/assets/images/listing/img_large_07.jpg"; // imagen por defecto
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  return `${directusUrl}/assets/${imageId}?fit=cover&width=${width}&height=800`;
};

const ListingSixAreaDirectus = () => {
  const [properties, setProperties] = useState<DirectusProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(initialFilterState);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch properties from Directus
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams();
        
        if (filters.operation) {
          searchParams.append('operation_type', filters.operation);
        }
        if (filters.type) {
          searchParams.append('property_type', filters.type);
        }
        if (filters.location) {
          searchParams.append('city', filters.location);
        }
        if (filters.minPrice) {
          searchParams.append('min_price', filters.minPrice);
        }
        if (filters.maxPrice) {
          searchParams.append('max_price', filters.maxPrice);
        }

        const url = `/api/directus/properties${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Error al cargar las propiedades');
        }

        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  // Obtenir valores únicos para los filtros
  const uniquePropertyTypes = useMemo(() => {
    const types = properties.flatMap(p => p.Property_type || []).filter(Boolean);
    return [...new Set(types)];
  }, [properties]);

  const uniqueOperationTypes = useMemo(() => {
    const operations = properties.flatMap(p => p.Operation_type || []).filter(Boolean);
    return [...new Set(operations)];
  }, [properties]);

  const uniqueCities = useMemo(() => {
    const cities = properties.map(p => p.City).filter(Boolean);
    return [...new Set(cities)];
  }, [properties]);

  // Función para manejar cambios en filtros
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilterState);
  };

  // Filtrar y ordenar propiedades
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...properties];

    // Ordenar según sortBy
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = typeof a.Price === 'string' ? parseFloat(a.Price) : a.Price;
          const priceB = typeof b.Price === 'string' ? parseFloat(b.Price) : b.Price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = typeof a.Price === 'string' ? parseFloat(a.Price) : a.Price;
          const priceB = typeof b.Price === 'string' ? parseFloat(b.Price) : b.Price;
          return priceB - priceA;
        });
        break;
      case "newest":
      default:
        // Mantener orden original (más recientes primero)
        break;
    }

    return filtered;
  }, [properties, sortBy]);

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando propiedades...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="alert alert-danger">
              <h4>Error al cargar las propiedades</h4>
              <p>{error}</p>
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="property-listing-six bg-pink-two pt-110 lg-pt-80 pb-180 xl-pb-120 lg-pb-80">
      <div className="container container-large">
        <div className="row">
          <div className="col-lg-8">
            <div className="ps-xxl-5">
              <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
                <div>Mostrando <strong>{filteredAndSortedProperties.length}</strong> de <strong>{properties.length}</strong> resultados</div>
                <div className="d-flex align-items-center xs-mt-20">
                  <div className="short-filter d-flex align-items-center">
                    <div className="fs-16 me-2">Ordenar por:</div>
                    <select 
                      className="nice-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Más recientes</option>
                      <option value="price-low">Precio: menor a mayor</option>
                      <option value="price-high">Precio: mayor a menor</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row gx-xxl-25">
                {filteredAndSortedProperties.map((property) => (
                  <div key={property.id} className="col-lg-4 col-sm-6 d-flex mb-50 lg-mb-30">
                    <div className="listing-card-one theme-border-radius h-100 w-100">
                      <div className="img-gallery p-15">
                        <div className="position-relative overflow-hidden">
                          <div className="tag bg-white text-dark fw-500 fs-13">
                            {property.Operation_type?.[0] === 'venta' ? 'VENTA' : 'RENTA'}
                          </div>
                          {property.Featured && (
                            <div className="feature-tag bg-primary text-white fw-500 fs-13">
                              DESTACADA
                            </div>
                          )}
                          <img 
                            src={getDirectusImageUrl(property.Image?.id)} 
                            alt={property.Title}
                            className="w-100 rounded-4"
                            style={{ height: '240px', objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                      <div className="property-info p-25">
                        <a href={`/property-directus/${property.id}`} className="title tran3s">
                          {property.Title}
                        </a>
                        <div className="address fs-15 mt-5 mb-25">
                          <i className="bi bi-geo-alt"></i>
                          {formatLocation(property)}
                        </div>
                        <div className="feature-list d-flex flex-wrap align-items-center justify-content-between">
                          <div>
                            <strong className="price fw-500 color-dark">
                              {formatPrice(property.Price, property.Currency)}
                            </strong>
                          </div>
                          <div className="d-flex align-items-center">
                            {property.Bedrooms && (
                              <div className="d-flex align-items-center me-3">
                                <i className="bi bi-bed fs-18 me-1"></i>
                                <span className="fs-15">{property.Bedrooms}</span>
                              </div>
                            )}
                            {property.Bathrooms && (
                              <div className="d-flex align-items-center">
                                <i className="bi bi-droplet fs-18 me-1"></i>
                                <span className="fs-15">{property.Bathrooms}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAndSortedProperties.length === 0 && (
                <div className="text-center py-5">
                  <h4>No se encontraron propiedades</h4>
                  <p>Intenta ajustar tus filtros de búsqueda</p>
                  <button 
                    className="btn btn-primary"
                    onClick={clearFilters}
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="advance-search-panel dot-bg md-mt-80">
              <div className="main-bg rounded-3">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="advance-search-form">
                    <div className="row">
                      <div className="col-12">
                        <div className="input-box-one">
                          <div className="label">Tipo de Operación</div>
                          <select 
                            className="nice-select fw-normal"
                            value={filters.operation}
                            onChange={(e) => handleFilterChange('operation', e.target.value)}
                          >
                            <option value="">Todos</option>
                            {uniqueOperationTypes.map(op => (
                              <option key={op} value={op}>
                                {op === 'venta' ? 'Venta' : 'Renta'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-box-one">
                          <div className="label">Tipo de Propiedad</div>
                          <select 
                            className="nice-select fw-normal"
                            value={filters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                          >
                            <option value="">Todos</option>
                            {uniquePropertyTypes.map(type => (
                              <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-box-one">
                          <div className="label">Ciudad</div>
                          <select 
                            className="nice-select fw-normal"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                          >
                            <option value="">Todas las ciudades</option>
                            {uniqueCities.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-box-one">
                          <div className="label">Precio mínimo</div>
                          <input 
                            type="number" 
                            placeholder="Ej. 500000"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-box-one">
                          <div className="label">Precio máximo</div>
                          <input 
                            type="number" 
                            placeholder="Ej. 1500000"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="button"
                      className="fw-500 text-uppercase tran3s search-btn-two w-100 d-block mb-25"
                      onClick={clearFilters}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingSixAreaDirectus;