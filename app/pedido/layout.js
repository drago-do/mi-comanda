"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./../../styles/globals.css";
import NavigationBar from "../components/NavigationBar";
import SwipeUpDownMenu from "../components/SwipeUpDownMenu";
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { getComandaActual } from "./../cache/comanda";

import { obtenerProductosCategorias } from "./../cache/productos";
import { obtenerComandaActual } from "./../cache/comanda";

import "./../../styles/pedido/comandaActual.css";

export default function RootLayout({ children }) {
  const [comanda, setComanda] = useState(null);
  const [productos, setProductos] = useState(null);

  useEffect(() => {
    actualizarComanda();
    actualizarProductos();
  }, []);

  const actualizarComanda = () => {
    obtenerComandaActual()
      .then((comandaJSON) => {
        setComanda(comandaJSON);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const actualizarProductos = () => {
    obtenerProductosCategorias()
      .then(([productos, categorias]) => {
        setProductos(productos);
        console.log(productos);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //Método que retorna el producto con el id solicitado
  const obtenerProducto = (id) => {
    return productos.find((producto) => producto._id === id);
  };

  return (
    <>
      <NavigationBar tituloActividad="Lista de productos" />
      {children}
      <SwipeUpDownMenu
        tituloMenu="Comanda Actual"
        iconoSuperior={AiFillCaretUp}
        onClick={actualizarComanda}
      >
        {comanda !== null ? (
          <div className="contenedorComandaActual">
            <h2>Nombre: {comanda.nombreDeMesa}</h2>
            <h4>Ubicación: {comanda.ubicacion}</h4>
            {comanda.products.map((producto) => (
              <div key={producto.id_mongo} className="producto">
                <div style={{ display: "flex" }}>
                  <Image
                    width={80}
                    height={80}
                    src={obtenerProducto(producto.id_mongo).image}
                    alt={obtenerProducto(producto.id_mongo).name}
                    style={{ objectFit: "scale-down" }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p style={{ fontWeight: "bold" }}>
                      {obtenerProducto(producto.id_mongo).name}
                    </p>
                    <p>${obtenerProducto(producto.id_mongo).price}</p>
                  </div>
                </div>
                <AiFillDelete style={{ fontSize: "2rem" }} />
              </div>
            ))}
            <div className="totalCuenta">
              <p>Total: ${comanda.total}</p>
              <button className="button-3" role="button">
                Pagar <BsFillCartCheckFill />
              </button>
            </div>
          </div>
        ) : (
          <p>No hay productos en la comanda</p>
        )}
      </SwipeUpDownMenu>
    </>
  );
}
