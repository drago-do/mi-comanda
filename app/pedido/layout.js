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

import "./../../styles/pedido/comandaActual.css";

export default function RootLayout({ children }) {
  const [comanda, setComanda] = useState(null);

  useEffect(() => {
    obtenerComandaActual()
      .then((comandaJSON) => {
        setComanda(comandaJSON);
        console.log(comandaJSON);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const actualizarComanda = () => {
    console.log("Actualizando comanda");
    setComanda(getComandaActual());
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
            {comanda.productos.map((producto) => (
              <div key={producto.id} className="producto">
                <div style={{ display: "flex" }}>
                  <Image
                    width={80}
                    height={80}
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ objectFit: "scale-down" }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p style={{ fontWeight: "bold" }}>{producto.nombre}</p>
                    <p>${producto.precio}</p>
                  </div>
                </div>
                <AiFillDelete style={{ fontSize: "2rem" }} />
              </div>
            ))}
            <div className="totalCuenta">
              <p>Total: ${comanda.total}</p>
              <button class="button-3" role="button">
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

export function obtenerComandaActual() {
  return new Promise((resolve, reject) => {
    // Verificar si los datos existen en localStorage
    if (localStorage.getItem("comandaActual") !== null) {
      const comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
      resolve(comandaActual);
    } else {
      reject(
        "No hay comanda actual. Inicia tu pedido o selecciona una comanda anterior"
      );
    }
  });
}
