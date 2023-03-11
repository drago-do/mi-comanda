"use client";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "./../../components/LoadingAnimation";
import Cookies from "js-cookie";
import axios from "axios";
import ItemCategoria from "./../components/ItemCategoria";
import ItemProducto from "./../components/ItemProducto";
import "./../../../styles/pedido/pedido.css";

import { obtenerProductosCategorias } from "./../../cache/productos";

export default function PageSubcategoria(props) {
  const idCategory = props.params.subcategoria;
  //Variable de entorno API_URL
  const API_URL = process.env.API_URL;
  const [categorias, setCategorias] = useState(null);
  const [productos, setProductos] = useState(null);
  const [categoriaActual, setCategoriaActual] = useState(null);

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

  useEffect(() => {
    if (categorias !== null) {
      let categoriaActual;
      categorias.map((item) => {
        if (item._id === idCategory) {
          categoriaActual = item;
        }
      });
      setCategoriaActual(categoriaActual);
    }
  }, [categorias, idCategory]);

  return (
    <div
      className="contenedorCategoriasProductos"
      style={{
        alignItems: categorias ? "stretch" : "center",
        justifyContent: categorias ? "flex-start" : "center",
      }}
    >
      {categoriaActual && (
        <h1 style={{ marginLeft: "10px", marginBottom: "20px" }}>
          Estas en {categoriaActual.name}
        </h1>
      )}
      {categorias ? (
        categorias.map(
          (category, index) =>
            //Si category.parent es === a categoriaActual._id
            //entonces mostrar el componente ItemCategoria
            category.parent === idCategory && (
              <ItemCategoria
                key={index}
                nombre={category.name}
                descripcion={category.description}
                imagen={category.image}
                id={category._id}
              />
            )
        )
      ) : (
        <LoadingAnimation />
      )}
      {productos ? (
        productos.map(
          (product, index) =>
            //Si productos.category es === a categoriaActual._id
            //entonces mostrar el componente ItemProducto
            product.category === idCategory && (
              <ItemProducto
                key={index}
                nombre={product.name}
                descripcion={product.description}
                imagen={product.image}
                id={product._id}
                objeto={product}
              />
            )
        )
      ) : (
        <LoadingAnimation />
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
