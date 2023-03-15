import React, { useState } from "react";
import Image from "next/image";
import InfoProducto from "./InfoProducto";
import { AiFillPlusCircle } from "react-icons/ai";
import "./../../../styles/pedido/pedido.css";

import { useComandaActual } from "./../../hooks/useComandaActual";

export default function ItemProducto({
  nombre,
  descripcion,
  imagen,
  id,
  objeto,
}) {
  //hooks personalizados
  const { agregarProducto } = useComandaActual();

  const [mostrarInfo, setMostrarInfo] = useState(false);
  const handleMostrarInfo = () => {
    setMostrarInfo(!mostrarInfo);
  };

  const addItemHandle = () => {
    let creationDate = Date.now();
    agregarProducto(creationDate, objeto._id, objeto.price, false);
  };

  return (
    <>
      <div className="contenedorCategoria">
        <div className="itemCategoria">
          <div className="imagenNombreDescripcion" onClick={handleMostrarInfo}>
            <Image
              src={imagen}
              alt={nombre}
              width={80}
              height={80}
              priority
              style={{ width: "80px", height: "80px", objectFit: "scale-down" }}
            />
            <div className="nombreDescripcion">
              <h3>{nombre}</h3>
              <span style={{ color: "blue" }}>{objeto.size}</span>
              <p>{descripcion}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "30%",
              justifyContent: "space-around",
              fontSize: "3rem",
            }}
          >
            <AiFillPlusCircle
              size={50}
              className="icon btn-icon-plus-minus"
              onClick={addItemHandle}
            />
          </div>
        </div>
        <InfoProducto mostrar={mostrarInfo} objeto={objeto} />
      </div>
    </>
  );
}
