"use client";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "./../components/LoadingAnimation";
import Cookies from "js-cookie";
import axios from "axios";
import ItemCategoria from "./components/ItemCategoria";
import "./../../styles/pedido/pedido.css";

//Obtener variable de entorno
const API_URL = process.env.API_URL;

export default function Page() {
  const [categorias, setCategorias] = useState(null);
  const [productos, setProductos] = useState(null);

  useEffect(() => {
    obtenerProductosCategorias()
      .then(([productos, categorias]) => {
        setProductos(productos);
        setCategorias(categorias);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div
      className="contenedorCategoriasProductos"
      style={{
        alignItems: categorias ? "stretch" : "center",
        justifyContent: categorias ? "flex-start" : "center",
      }}
    >
      {categorias ? (
        categorias.map(
          (category, index) =>
            !category.parent && ( //Si la Categoria tiene padre, no se muestra
              <ItemCategoria
                key={index}
                nombre={category.name}
                descripcion={category.description}
                imagen={category.image}
                id={category._id}
                productos={productos}
                categorias={categorias}
              />
            )
        )
      ) : (
        <LoadingAnimation key="99499" />
      )}
    </div>
  );
}

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
