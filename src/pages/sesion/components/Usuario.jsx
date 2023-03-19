"use client";
import React from "react";
import Image from "next/image";
//* Importar imágenes avatars Default
import avatar1 from "./../../../../public/avatarDefault/avatar1.png";
import avatar2 from "./../../../../public/avatarDefault/avatar2.png";
import avatar3 from "./../../../../public/avatarDefault/avatar3.png";
import avatar4 from "./../../../../public/avatarDefault/avatar4.png";
import avatar5 from "./../../../../public/avatarDefault/avatar5.png";
import avatar6 from "./../../../../public/avatarDefault/avatar6.png";

import styles from "./../../../../styles/sesion/components.module.css";

const avatarDefault = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export default function Usuario({ nombre, estaActivo, avatar }) {
  const imgAvatar = avatarDefault[avatar];

  const usuarioActivo = () => {
    var estiloAvatar = styles.usuarioAvatar;
    var estiloActivo = styles.usuarioActivo;
    var usuarioActivo = {
      estiloAvatar,
      estiloActivo,
    };
    return estaActivo ? estiloAvatar + " " + estiloActivo : estiloAvatar;
  };
  return (
    <div className={usuarioActivo()}>
      <Image
        className={styles.imagenAvatar}
        src={imgAvatar}
        alt={nombre}
        priority={true}
      />
      <p id={nombre} className="nombre-usuario">
        {nombre}
      </p>
    </div>
  );
}
