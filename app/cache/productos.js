import axios from "axios";

//Obtener variable de entorno
const API_URL = process.env.API_URL;

export function obtenerProductosCategorias() {
  return new Promise((resolve, reject) => {
    // Verificar si los datos existen en localStorage
    if (
      localStorage.getItem("productos") !== null &&
      localStorage.getItem("categorias") !== null
    ) {
      const productos = JSON.parse(localStorage.getItem("productos"));
      const categorias = JSON.parse(localStorage.getItem("categorias"));
      resolve([productos, categorias]);
    } else {
      let productos;
      let categorias;
      // Hacer petición con axios
      axios
        .get(`${API_URL}product`)
        .then((res) => {
          productos = res.data;
          axios
            .get(`${API_URL}category`)
            .then((res) => {
              categorias = res.data;
              localStorage.setItem("productos", JSON.stringify(productos));
              localStorage.setItem("categorias", JSON.stringify(categorias));
              resolve([productos, categorias]);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
