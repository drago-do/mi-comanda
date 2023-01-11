import React, { useState } from "react";
import Image from "next/image";
import InfoProducto from "./InfoProducto";
import {
  AiFillPlusCircle,
  AiOutlineShoppingCart,
  AiOutlineSubnode,
  AiFillMinusCircle,
} from "react-icons/ai";
import "./../../../styles/pedido/pedido.css";

export default function ItemProducto({
  nombre,
  descripcion,
  imagen,
  id,
  objeto,
}) {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const handleMostrarInfo = () => {
    setMostrarInfo(!mostrarInfo);
  };
  return (
    <>
      <div className="contenedorCategoria">
        <div className="itemCategoria">
          <div className="imagenNombreDescripcion" onClick={handleMostrarInfo}>
            <img
              src={imagen}
              alt={nombre}
              style={{ width: "80px", height: "80px", objectFit: "scale-down" }}
            />
            <div className="nombreDescripcion">
              <h3>{nombre}</h3>
              <p>{descripcion}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "30%",
              justifyContent: "space-around",
            }}
          >
            <AiFillMinusCircle className="icon btn-icon-plus-minus" />
            <AiFillPlusCircle className="icon btn-icon-plus-minus" />
          </div>
        </div>
        <InfoProducto mostrar={mostrarInfo} objeto={objeto} />
      </div>
    </>
  );
}
