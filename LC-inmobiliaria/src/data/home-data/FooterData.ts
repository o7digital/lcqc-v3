interface DataType {
   id: number;
   page: string;
   widget_title: string;
   widget_class?: string;
   widget_class2?: string;
   footer_link: {
      link: string;
      link_title: string;
   }[];
}

const footer_data: DataType[] = [
   // home one
   {
      id: 1,
      page: "home_1",
      widget_class: "xs-mt-50",
      widget_title: "Links",
      footer_link: [{ link: "/", link_title: "Inicio" }]
   },
   {
      id: 2,
      widget_class: "xs-mt-30",
      page: "home_1",
      widget_title: "Propiedades",
      footer_link: [{ link: "/listing_06", link_title: "Ver Propiedades" }]
   },

   // home three
   {
      id: 1,
      page: "home_3",
      widget_title: "Links",
      footer_link: [{ link: "/", link_title: "Inicio" }]
   },
   {
      id: 2,
      page: "home_3",
      widget_title: "Propiedades",
      footer_link: [{ link: "/listing_06", link_title: "Ver Propiedades" }]
   },

   // home four
   {
      id: 1,
      page: "home_4",
      widget_class: "col-lg-2",
      widget_title: "Links",
      footer_link: [{ link: "/", link_title: "Inicio" }]
   },
   {
      id: 2,
      widget_class: "col-xl-2 col-lg-3",
      page: "home_4",
      widget_title: "Propiedades",
      footer_link: [{ link: "/listing_06", link_title: "Ver Propiedades" }]
   },

   // home five
   {
      id: 1,
      page: "home_5",
      widget_class: "col-lg-3 ms-auto",
      widget_class2: "ps-xl-5",
      widget_title: "Links",
      footer_link: [{ link: "/", link_title: "Inicio" }]
   },
   {
      id: 2,
      widget_class: "col-lg-2",
      page: "home_5",
      widget_title: "Propiedades",
      footer_link: [{ link: "/listing_06", link_title: "Ver Propiedades" }]
   },
]

export default footer_data;
