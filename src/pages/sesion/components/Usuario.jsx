"use client";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";

import styles from "./../../../styles/sesion/components.module.css";

export default function Usuario({ nombre, img, estaActivo }) {
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
        width={100}
        height={100}
        className={styles.imagenAvatar}
        src={img}
        alt={nombre}
        priority={true}
      />
      <p id={nombre} className="nombre-usuario">
        {nombre}
      </p>
    </div>
  );
}
