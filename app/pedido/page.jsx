"use client";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "./../components/LoadingAnimation";
import Cookies from "js-cookie";
import axios from "axios";
import ItemCategoria from "./components/ItemCategoria";
import "./../../styles/pedido/pedido.css";

export default function Page() {
  //Variable de entorno API_URL
  const API_URL = process.env.API_URL;
  const [categorias, setCategorias] = useState(null);
  const [productos, setProductos] = useState(null);

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

  return (
    <div
      className="contenedorCategoriasProductos"
      style={{
        alignItems: categorias ? "stretch" : "center",
        justifyContent: categorias ? "flex-start" : "center",
      }}
    >
      {categorias ? (
        categorias.map((category) =>
          category.parent ? ( //Si la Categoria tiene padre, no se muestra
            <></>
          ) : (
            <ItemCategoria
              key={category._id}
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
    </div>
  );
}
