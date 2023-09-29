import React, { useState } from "react";
import Image from "next/image";
import InfoProducto from "./InfoProducto";
import { AiFillPlusCircle } from "react-icons/ai";

import { useComandaActual } from "./../../../hooks/useComandaActual";

export default function ItemProducto({
  nombre,
  descripcion,
  price,
  imagen,
  size,
  id,
  ingredients,
  units,
}) {
  //hooks personalizados
  const { agregarProducto } = useComandaActual();

  const [mostrarInfo, setMostrarInfo] = useState(false);
  const handleMostrarInfo = () => {
    setMostrarInfo(!mostrarInfo);
  };

  const addItemHandle = () => {
    let creationDate = Date.now();
    agregarProducto(creationDate, id, price, false);
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
              className="imagenProductoCategoria"
            />
            <div className="nombreDescripcion">
              <h3 className="productoTitulo">{nombre}</h3>
              <span>{size}</span>
              <p>{descripcion}</p>
            </div>
          </div>
          <div className="icono" style={{ background: "var(--background)" }}>
            <AiFillPlusCircle
              size={50}
              className="icon btn-icon-plus-minus"
              onClick={addItemHandle}
            />
          </div>
        </div>
        <InfoProducto
          mostrar={mostrarInfo}
          ingredients={ingredients}
          price={price}
          units={units}
        />
      </div>
    </>
  );
}
