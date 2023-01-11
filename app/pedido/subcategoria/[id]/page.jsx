"use client";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "./../../../components/LoadingAnimation";
import Cookies from "js-cookie";
import axios from "axios";
import ItemCategoria from "./../../components/ItemCategoria";
import ItemProducto from "../../components/ItemProducto";
import "./../../../../styles/pedido/pedido.css";

export default function PageSubcategoria(props) {
  const idCategory = props.params.id;
  //Variable de entorno API_URL
  const API_URL = process.env.API_URL;
  const [categorias, setCategorias] = useState(null);
  const [productos, setProductos] = useState(null);
  const [categoriaActual, setCategoriaActual] = useState(null);

  useEffect(() => {
    //Consultar API para obtener los productos y categorias
    axios
      .get(`${API_URL}product`)
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${API_URL}category`)
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [API_URL]);

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
      {categoriaActual ? (
        <h1 style={{ marginLeft: "10px", marginBottom: "20px" }}>
          Estas en {categoriaActual.name}
        </h1>
      ) : (
        <></>
      )}
      {categorias ? (
        categorias.map((category) =>
          //Si category.parent es === a categoriaActual._id
          //entonces mostrar el componente ItemCategoria
          category.parent === idCategory ? (
            <ItemCategoria
              key={category._id}
              nombre={category.name}
              descripcion={category.description}
              imagen={category.image}
              id={category._id}
            />
          ) : (
            <></>
          )
        )
      ) : (
        <LoadingAnimation />
      )}
      {productos ? (
        productos.map((product) =>
          //Si productos.category es === a categoriaActual._id
          //entonces mostrar el componente ItemProducto
          product.category === idCategory ? (
            <ItemProducto
              key={product._id}
              nombre={product.name}
              descripcion={product.description}
              imagen={product.image}
              id={product._id}
              objeto={product}
            />
          ) : (
            <></>
          )
        )
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
}
