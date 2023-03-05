import React from "react";
import Image from "next/image";
import { AiOutlineApartment } from "react-icons/ai";
import "./../../../styles/pedido/pedido.css";



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
          style={{ width: "80px", height: "80px", objectFit: "scale-down" }}
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
