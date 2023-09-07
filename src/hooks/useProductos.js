import { useState } from "react";
import axios from "axios";

//Obtener variable de entorno
const API_URL = process.env.API_URL;

export function useProductos() {
  const [productos, setProductos] = useState(null);

  const getProducts = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const cachedProductos = JSON.parse(localStorage.getItem("productos"));
        if (cachedProductos) {
          setProductos(cachedProductos);
          resolve(cachedProductos);
        } else {
          const response = await axios.get(`${API_URL}product`);
          const nuevosProductos = response.data;
          localStorage.setItem("productos", JSON.stringify(nuevosProductos));
          setProductos(nuevosProductos);
          resolve(nuevosProductos);
        }
      } catch (error) {
        console.error(error);
        setProductos(null);
        reject(error);
      }
    });
  };

  const getProductById = (_id) => {
    return new Promise(async (resolve, reject) => {
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
        // Obtener el producto con el mismo _id
        const productoEncontrado = productos.find(
          (producto) => producto._id === _id
        );
        if (productoEncontrado) {
          resolve(productoEncontrado); // Resolver la promesa con los detalles del producto
        } else {
          reject(false); // Rechazar la promesa si no se encuentra el producto
        }
      } catch (error) {
        console.error(error);
        setProductos(null);
        reject(error);
      }
    });
  };

  const getProductNameById = (_id) => {
    return new Promise(async (resolve, reject) => {
      let listaProductos;
      try {
        const listaProductos = JSON.parse(localStorage.getItem("productos"));
        if (listaProductos) {
          setProductos(listaProductos);
        } else {
          const response = await axios.get(`${API_URL}product`);
          listaProductos = response.data;
          localStorage.setItem("productos", JSON.stringify(listaProductos));
          setProductos(listaProductos);
        }
        // Obtener el producto con el mismo _id
        const productoEncontrado = listaProductos.find(
          (producto) => producto._id === _id
        );
        if (productoEncontrado) {
          resolve(productoEncontrado.name); // Resolver la promesa con los detalles del producto
        } else {
          reject(false); // Rechazar la promesa si no se encuentra el producto
        }
      } catch (error) {
        console.error(error);
        setProductos(null);
        reject(error);
      }
    });
  };

  return { productos, getProducts, getProductNameById, getProductById };
}
