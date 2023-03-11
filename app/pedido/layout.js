"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./../../styles/globals.css";
import NavigationBar from "../components/NavigationBar";
import SwipeUpDownMenu from "../components/SwipeUpDownMenu";
import LoadingAnimation from "./../components/LoadingAnimation";
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { obtenerProductosCategorias } from "./../cache/productos";
import { obtenerComandaActual, eliminarProducto } from "./../cache/comanda";

import "./../../styles/pedido/comandaActual.css";

export default function RootLayout({ children }) {
  const [comanda, setComanda] = useState(null);
  const [productos, setProductos] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    actualizarComanda();
    actualizarProductos();
  }, []);

  const actualizarComanda = () => {
    setLoader(true);
    obtenerComandaActual()
      .then((comandaJSON) => {
        setComanda(comandaJSON);
        setLoader(false);
      })
      .catch((error) => {
        setComanda(null);
        setLoader(false);
      });
  };

  const actualizarProductos = () => {
    obtenerProductosCategorias()
      .then(([productos, categorias]) => {
        setProductos(productos);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //Método que retorna el producto con el id solicitado
  const obtenerProducto = (id) => {
    return productos.find((producto) => producto._id === id);
  };

  //Eliminar producto de la comanda
  const deleteItemHandle = (creationDate) => {
    setLoader(true);
    eliminarProducto(creationDate)
      .then((result) => {
        console.log(result);
        actualizarComanda();
        setLoader(false); 
      })
      .catch((error) => {
        console.error(error);
      });
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
          <>
            <div className="contenedorComandaActual">
              <h2>Nombre: {comanda.tableName}</h2>
              <h4>Ubicación: {comanda.location}</h4>
              {comanda.products.map((producto) => (
                <div key={producto.creationDate} className="producto">
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
                  <div onClick={() => deleteItemHandle(producto.creationDate)}>
                    <AiFillDelete style={{ fontSize: "2rem" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="totalCuenta">
              <p>Total: ${comanda.total}</p>
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
      </SwipeUpDownMenu>
    </>
  );
}
