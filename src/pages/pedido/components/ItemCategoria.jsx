import React from "react";
import Image from "next/image";
import { AiOutlineApartment } from "react-icons/ai";

export default function ItemCategoria({ nombre, descripcion, imagen, id }) {
  const handleClickItemCategoria = () => {
    window.location.href = `/pedido/${id}`;
  };
  return (
    <div className="itemCategoria" onClick={handleClickItemCategoria}>
      <div className="imagenNombreDescripcion">
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
          <p className="productoDescripcion">{descripcion}</p>
        </div>
      </div>
      <div className="icono" style={{ background: "var(--background)" }}>
        <AiOutlineApartment />
      </div>
    </div>
  );
}
