import { useState } from "react";
import axios from "axios";

//Obtener variable de entorno
const API_URL = process.env.API_URL;

export function useCategorias() {
  const [categorias, setCategorias] = useState(null);

  const obtenerCategorias = async () => {
    try {
      const cachedCategorias = JSON.parse(localStorage.getItem("categorias"));
      if (cachedCategorias) {
        setCategorias(cachedCategorias);
      } else {
        const response = await axios.get(`${API_URL}category`);
        const nuevasCategorias = response.data;
        localStorage.setItem("categorias", JSON.stringify(nuevasCategorias));
        setProductos(nuevasCategorias);
      }
    } catch (error) {
      console.error(error);
      setCategorias(null);
    }
  };

  return { categorias, obtenerCategorias };
}
