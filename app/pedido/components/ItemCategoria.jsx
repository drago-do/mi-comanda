import React from "react";
import Image from "next/image";
import { AiOutlineApartment } from "react-icons/ai";
import "./../../../styles/pedido/pedido.css";

export default function ItemCategoria({ nombre, descripcion, imagen, id }) {
  const handleClickItemCategoria = () => {
    window.location.href = `/pedido/subcategoria/${id}`;
  };
  return (
    <div className="itemCategoria" onClick={handleClickItemCategoria}>
      <div className="imagenNombreDescripcion">
        <img
          src={imagen}
          alt={nombre}
          style={{ width: "80px", height: "80px" }}
        />
        <div className="nombreDescripcion">
          <h3>{nombre}</h3>
          <p>{descripcion}</p>
        </div>
      </div>
      <AiOutlineApartment className="icon" style={{ marginRight: "10px" }} />
    </div>
  );
}
