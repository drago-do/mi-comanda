import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";

import { useProductos } from "./../../../hooks/useProductos";
import { useComandaActual } from "./../../../hooks/useComandaActual";

export default function ItemProductoComanda({ update }) {
  //Custom hook.
  var {
    comandaActual,
    obtenerComandaActual,
    eliminarProducto,
    cambiarNombreMesa,
  } = useComandaActual();
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
    eliminarProducto(creationDate).then(obtenerComandaActual());
  };

  return (
    <>
      {comandaActual && productos ? (
        <>
          <div className="contenedorComandaActual">
            <div className="infoPrincipal">
              <div>
                <h3 style={{ fontSize: "var(--font-h4-size)" }}>
                  Nombre de la mesa:
                </h3>
                <input
                  className="inputMesa"
                  defaultValue={comandaActual.tableName}
                  onBlur={(evt) => cambiarNombreMesa(evt.target.value)}
                />
              </div>
              <div className="icono">
                <HiLocationMarker />
              </div>
            </div>
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
              <BsFillCartCheckFill />
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
      <div className="infoProducto">
        <p className="productoIndex">{index + 1}</p>
        <Image
          width={60}
          height={60}
          src={obtenerProducto(producto.id_mongo).image}
          alt={obtenerProducto(producto.id_mongo).name}
          className="productoImagen"
        />
        <div className="textoProducto">
          <p className="productoTitulo">
            {obtenerProducto(producto.id_mongo).name}
          </p>
          <div className="containerEstado">
            <p className="textPrecioTam precio">
              ${obtenerProducto(producto.id_mongo).price}{" "}
            </p>
            <p className="textPrecioTam tam">
              {obtenerProducto(producto.id_mongo).size}
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => deleteItemHandle(producto.creationDate)}
        className="icono"
      >
        <AiFillDelete style={{ fontSize: "2rem" }} />
      </div>
    </div>
  );
};
