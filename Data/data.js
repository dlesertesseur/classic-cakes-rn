export const PRODUCTS = [
    {
      id: "1",
      title: "Cheescake Nueva York",
      description: "Torta de queso Philadelphia con frutos rojos",
      price: 2500.00,
      pictureUrl: "./../../assets/images/products/cheescake.png",
      category_id: 2
    },
    {
      id: "2",
      title: "Brownie",
      description: "Torta de chocolate semiamargo con dulce de leche y merengue italiano",
      price: 1900.00,
      pictureUrl: "./../../assets/images/products/brownie.png",
      category_id: 2
    },
    {
      id: "3",
      title: "Charlotte",
      description: "Postre de frutilla y frutos rojos",
      price: 2000,
      pictureUrl: "./../../assets/images/products/charlotte.png",
      category_id: 2
    },
    {
      id: "4",
      title: "Lemon Pie",
      description: "Tarta con base de masa frolla, rellena con crema de limón y merengue italiano",
      price: 1700,
      pictureUrl: "./../../assets/images/products/lemon_pie.png",
      category_id: 1
    },
    {
      id: "5",
      title: "Tiramisu",
      description: "Torta de queso mascarpone con café",
      price: 2100,
      pictureUrl: "./../../assets/images/products/tiramisu.png",
      category_id: 2
    },
    {
      id: "9",
      title: "Masas secas",
      description: "Masitas de manteca y vainilla, venta por Kg",
      price: 900.00,
      pictureUrl: "./../../assets/images/products/masas_secas.png",
      category_id: 4
    },
    {
      id: "10",
      title: "Donas",
      description: "Bollo de masa horneado/frito, con o sin relleno",
      price: 110,
      pictureUrl: "./../../assets/images/products/donas.png",
      category_id: 5
    },
  ];

  export const CATEGORIES = [
    {
        id:1,
        text: "Tartas",
        path:"/category/tarta"
    },
    {
        id:2,
        text: "Postres",
        path:"/category/postre"
    },
    {
        id:3,
        text: "Galletitas",
        path:"/category/galletita"
    },
    {
        id:4,
        text: "Masas secas",
        path:"/category/masaSeca"
    },
    {
        id:5,
        text: "Festivos",
        path:"/category/festivo"
    },
];
