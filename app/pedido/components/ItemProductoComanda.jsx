import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

import { useProductos } from "./../../hooks/useProductos";
import { useComandaActual } from "./../../hooks/useComandaActual";

import "./../../../styles/pedido/comandaActual.css";

export default function ItemProductoComanda({ update }) {
  //Custom hook.
  var { comandaActual, obtenerComandaActual, eliminarProducto } =
    useComandaActual();
  const { productos, obtenerProductos } = useProductos();

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    obtenerComandaActual();
  }, [update]);

  //Método que retorna el producto con el id solicitado
  const obtenerProducto = (id) => {
    if (productos != null)
      return productos.find((producto) => producto._id === id);
  };

  //Eliminar producto de la comanda
  const deleteItemHandle = (creationDate) => {
    eliminarProducto(creationDate).then(
      (comanda) => setComanda(comanda) && console.log(comanda)
    );
  };
  return (
    <>
      {comandaActual && productos ? (
        <>
          <div className="contenedorComandaActual">
            <h2>Nombre: {comandaActual.tableName}</h2>
            <h4>Ubicación: {comandaActual.location}</h4>
            {comandaActual.products.map((producto, index) => (
              <Producto
                index={index}
                key={producto.creationDate}
                producto={producto}
                obtenerProducto={obtenerProducto}
                deleteItemHandle={deleteItemHandle}
              />
            ))}
          </div>
          <div className="totalCuenta">
            <p>Total: ${comandaActual.total}</p>
            <button className="button-3" role="button">
              Pagar <BsFillCartCheckFill />
            </button>
          </div>
        </>
      ) : (
        <div className="sinProducto">
          <h2>No hay productos en la comanda</h2>
          <Image
            src={"/uiDefault/productosComanda.png"}
            width={350}
            height={350}
            alt="Ilustración"
          />
          <p>Agrega productos para verlos acá.</p>
        </div>
      )}
    </>
  );
}

// Nuevo componente Producto
const Producto = ({ index, producto, obtenerProducto, deleteItemHandle }) => {
  return (
    <div key={producto.creationDate} className="producto">
      <div
        style={{ display: "flex", alignItems: "center", overflow: "hidden" }}
      >
        <p style={{ fontSize: "1rem", marginRight: ".5rem" }}>{index + 1}</p>
        <Image
          width={50}
          height={50}
          src={obtenerProducto(producto.id_mongo).image}
          alt={obtenerProducto(producto.id_mongo).name}
          style={{ objectFit: "scale-down", marginRight: "10px" }}
        />
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginBottom: "1rem",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {obtenerProducto(producto.id_mongo).name}
          </p>
          <p>
            ${obtenerProducto(producto.id_mongo).price}{" "}
            <span style={{ color: "blue" }}>
              {obtenerProducto(producto.id_mongo).size}
            </span>{" "}
          </p>
        </div>
      </div>
      <div onClick={() => deleteItemHandle(producto.creationDate)}>
        <AiFillDelete style={{ fontSize: "2rem" }} />
      </div>
    </div>
  );
};
