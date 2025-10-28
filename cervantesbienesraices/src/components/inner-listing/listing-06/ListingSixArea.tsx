"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";

const formatLocation = (location: any) => {
  if (!location) return "Ubicación no disponible";

  if (typeof location === "string") {
    return location;
  }

  const parts = [
    location?.name,
    location?.street,
    location?.exterior_number,
    location?.interior_number,
    location?.city,
    location?.state,
    location?.country,
  ].filter(Boolean);

  return parts.length ? parts.join(", ") : "Ubicación no disponible";
};

const normalizeText = (value?: string) => {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
};

const mapOperationType = (operationType?: string) => {
  if (!operationType) return "";
  const normalized = operationType.toLowerCase();
  if (normalized === "sale") return "venta";
  if (normalized === "rent") return "renta";
  return normalized;
};

const getLocationLabel = (location: any) => {
  if (!location) return "";
  const parts = [location.city, location.state].filter(Boolean);
  if (parts.length) return parts.join(", ");
  if (location.name) return location.name;
  return "";
};

const extractOperationAmounts = (operations: any[] | undefined) => {
  if (!Array.isArray(operations)) return [];
  return operations
    .map((operation) => {
      if (typeof operation?.amount === "number") return operation.amount;
      if (typeof operation?.amount === "string") {
        const parsed = Number(operation.amount);
        if (!Number.isNaN(parsed)) return parsed;
      }
      if (typeof operation?.formatted_amount === "string") {
        const cleaned = operation.formatted_amount.replace(/[^\d.,]/g, "").replace(/,/g, "");
        const parsed = Number(cleaned);
        if (!Number.isNaN(parsed)) return parsed;
      }
      return null;
    })
    .filter((value): value is number => typeof value === "number" && !Number.isNaN(value));
};

const initialFilterState = {
  type: "",
  location: "",
  minPrice: "",
  maxPrice: "",
};

const ListingSixArea = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputs, setInputs] = useState(initialFilterState);
  const [filters, setFilters] = useState(initialFilterState);

  useEffect(() => {
    const isDev = process.env.NODE_ENV !== "production";
    const url = isDev ? "/api/properties?status=No publicada" : "/api/properties";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors?.length) {
          console.error("EasyBroker API error:", data.errors);
          setError("No se pudieron cargar las propiedades en este momento.");
          setProperties([]);
          setLoading(false);
          return;
        }

        setProperties(data.content || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando propiedades:", err);
        setError("No se pudieron cargar las propiedades en este momento.");
        setLoading(false);
      });
  }, []);

  const typeOptionGroups = useMemo(() => {
    if (!properties.length) return [];

    const propertyTypes = new Map<string, string>();
    properties.forEach((prop) => {
      if (prop?.property_type) {
        const normalized = prop.property_type.toString().trim().toLowerCase();
        if (normalized && !propertyTypes.has(normalized)) {
          propertyTypes.set(normalized, prop.property_type.toString().trim());
        }
      }
    });

    const operationTypes = new Set<string>();
    properties.forEach((prop) => {
      if (Array.isArray(prop?.operations)) {
        prop.operations.forEach((operation: any) => {
          const mapped = mapOperationType(operation?.type);
          if (mapped) operationTypes.add(mapped);
        });
      }
    });

    const groups: { label: string; options: { value: string; label: string }[] }[] = [];

    if (propertyTypes.size) {
      groups.push({
        label: "Tipo de propiedad",
        options: Array.from(propertyTypes.entries()).map(([value, label]) => ({
          value: `property:${value}`,
          label,
        })),
      });
    }

    if (operationTypes.size) {
      const operationOptions = Array.from(operationTypes.values()).map((operation) => ({
        value: `operation:${operation}`,
        label: operation === "venta" ? "Venta" : operation === "renta" ? "Renta" : operation,
      }));

      const hasSale = operationTypes.has("venta");
      if (hasSale) {
        operationOptions.push({ value: "operation:compra", label: "Compra" });
      }

      groups.push({
        label: "Operación",
        options: operationOptions,
      });
    }

    return groups;
  }, [properties]);

  const locationOptions = useMemo(() => {
    if (!properties.length) return [];
    const locations = new Map<string, string>();

    properties.forEach((prop) => {
      const label = getLocationLabel(prop?.location) || formatLocation(prop?.location);
      if (!label || label === "Ubicación no disponible") return;
      const key = normalizeText(label);
      if (!locations.has(key)) {
        locations.set(key, label);
      }
    });

    return Array.from(locations.values()).sort((a, b) =>
      normalizeText(a).localeCompare(normalizeText(b), "es")
    );
  }, [properties]);

  const filteredProperties = useMemo(() => {
    if (!properties.length) return [];

    return properties.filter((prop) => {
      const propertyType = prop?.property_type?.toString().trim().toLowerCase() || "";
      const operationTypes = Array.isArray(prop?.operations)
        ? prop.operations
            .map((operation: any) => mapOperationType(operation?.type))
            .filter(Boolean)
        : [];
      const amounts = extractOperationAmounts(prop?.operations);
      const locationFilter = normalizeText(filters.location);
      const propertyLocation = normalizeText(formatLocation(prop?.location));

      const matchesType =
        !filters.type ||
        (filters.type.startsWith("property:") &&
          filters.type.replace("property:", "") === propertyType) ||
        (filters.type.startsWith("operation:") &&
          (() => {
            const selectedOperation = filters.type.replace("operation:", "");
            if (selectedOperation === "compra") {
              return operationTypes.includes("venta");
            }
            return operationTypes.includes(selectedOperation);
          })());

      if (!matchesType) return false;

      const hasMin = filters.minPrice.trim() !== "";
      const hasMax = filters.maxPrice.trim() !== "";
      const min = hasMin ? Number(filters.minPrice) : null;
      const max = hasMax ? Number(filters.maxPrice) : null;

      if ((hasMin && (min === null || Number.isNaN(min))) || (hasMax && (max === null || Number.isNaN(max)))) {
        return false;
      }

      const matchesAmount =
        !hasMin && !hasMax
          ? true
          : amounts.some((amount) => {
              if (hasMin && min !== null && amount < min) return false;
              if (hasMax && max !== null && amount > max) return false;
              return true;
            });

      if (!matchesAmount) return false;

      const matchesLocation = !locationFilter || propertyLocation.includes(locationFilter);

      return matchesLocation;
    });
  }, [properties, filters]);

  const handleInputChange = (key: keyof typeof initialFilterState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setInputs(initialFilterState);
    setFilters(initialFilterState);
  };

  const hasFiltersApplied =
    Boolean(filters.type) ||
    Boolean(filters.location.trim()) ||
    Boolean(filters.minPrice.trim()) ||
    Boolean(filters.maxPrice.trim());

  const filtersMatchInputs =
    inputs.type === filters.type &&
    inputs.location.trim() === filters.location.trim() &&
    inputs.minPrice.trim() === filters.minPrice.trim() &&
    inputs.maxPrice.trim() === filters.maxPrice.trim();

  const inputsAreClear =
    !inputs.type &&
    !inputs.location.trim() &&
    !inputs.minPrice.trim() &&
    !inputs.maxPrice.trim();

  const isResetDisabled = inputsAreClear && !hasFiltersApplied;

  const handleApplyFilters = () => {
    setFilters({
      type: inputs.type,
      location: inputs.location.trim(),
      minPrice: inputs.minPrice.trim(),
      maxPrice: inputs.maxPrice.trim(),
    });
  };

  return (
    <div className="property-listing-six pt-200 xl-pt-150 pb-200 xl-pb-120">
      <div className="container">
        <h2 className="mb-40 text-center">Propiedades disponibles</h2>

        <div className="listing-filters mb-40">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-4 col-lg-3">
              <label htmlFor="listing-type-filter" className="form-label fw-500">
                Tipo
              </label>
              <select
                id="listing-type-filter"
                className="form-select"
                value={inputs.type}
                onChange={handleInputChange("type")}
              >
                <option value="">Todos</option>
                {typeOptionGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label htmlFor="listing-min-price" className="form-label fw-500">
                Monto mín.
              </label>
              <input
                id="listing-min-price"
                type="number"
                className="form-control"
                placeholder="Ej. 500000"
                value={inputs.minPrice}
                onChange={handleInputChange("minPrice")}
                min={0}
              />
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label htmlFor="listing-max-price" className="form-label fw-500">
                Monto máx.
              </label>
              <input
                id="listing-max-price"
                type="number"
                className="form-control"
                placeholder="Ej. 1500000"
                value={inputs.maxPrice}
                onChange={handleInputChange("maxPrice")}
                min={0}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="listing-location-filter" className="form-label fw-500">
                Ubicación
              </label>
              <input
                id="listing-location-filter"
                className="form-control"
                value={inputs.location}
                onChange={handleInputChange("location")}
                list="listing-location-options"
                placeholder="Teclea la ubicación o deja vacío para todas"
              />
              <datalist id="listing-location-options">
                {locationOptions.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </div>
            <div className="col-12">
              <div className="filter-actions">
                <button
                  type="button"
                  className="btn-one"
                  onClick={handleApplyFilters}
                  disabled={filtersMatchInputs}
                >
                  Buscar
                </button>
                <button
                  type="button"
                  className="btn-reset"
                  onClick={handleResetFilters}
                  disabled={isResetDisabled}
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading && <p className="text-center">Cargando propiedades...</p>}
        {!loading && error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && properties.length === 0 && <p>No se encontraron propiedades.</p>}

        <div className="row">
          {!loading && !error && properties.length > 0 && filteredProperties.length === 0 && (
            <div className="col-12">
              <p className="text-center">No se encontraron propiedades con los filtros seleccionados.</p>
            </div>
          )}
          {filteredProperties.map((prop) => (
            <div key={prop.public_id} className="col-md-4 mb-4">
              <div className="property-card p-3 bg-white shadow-sm rounded">
                <img
                  src={prop.title_image_thumb || "/images/default-property.jpg"}
                  alt={prop.title}
                  className="img-fluid mb-3 rounded"
                />
                <h5>{prop.title}</h5>
                <p>{formatLocation(prop.location)}</p>
                <p>
                  <strong>
                    {prop.operations?.[0]?.formatted_amount || "Precio no disponible"}
                  </strong>
                </p>
                <Link
                  href={`/property/${prop.public_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-one mt-3 d-block text-center"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingSixArea;
