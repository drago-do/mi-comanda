"use client";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "./../components/LoadingAnimation";
import Cookies from "js-cookie";
import axios from "axios";
import ItemCategoria from "./components/ItemCategoria";
import "./../../styles/pedido/pedido.css";

import { obtenerProductosCategorias } from "./../cache/productos";



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
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
