"use client";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "./../../components/LoadingAnimation";
import ItemCategoria from "./../components/ItemCategoria";
import ItemProducto from "./../components/ItemProducto";
import "./../../../styles/pedido/pedido.css";

import { useProductos } from "./../hooks/useProductos";
import { useCategorias } from "./../hooks/useCategorias";

export default function PageSubcategoria(props) {
  const idCategory = props.params.subcategoria;
  const [categoriaActual, setCategoriaActual] = useState(null);

  const { categorias, obtenerCategorias } = useCategorias();
  const { productos, obtenerProductos } = useProductos();

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
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
