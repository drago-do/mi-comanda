import { useState } from "react";
import axios from "axios";

//Obtener variable de entorno
const API_URL = process.env.API_URL;

export function useProductos() {
  const [productos, setProductos] = useState(null);

  const obtenerProductos = async () => {
    try {
      const cachedProductos = JSON.parse(localStorage.getItem("productos"));
      if (cachedProductos) {
        setProductos(cachedProductos);
      } else {
        const response = await axios.get(`${API_URL}product`);
        const nuevosProductos = response.data;
        localStorage.setItem("productos", JSON.stringify(nuevosProductos));
        setProductos(nuevosProductos);
      }
    } catch (error) {
      console.error(error);
      setProductos(null);
    }
  };

  return { productos, obtenerProductos };
}
