"use client";
import React, { useState } from "react";
import styles from "./../styles/index/components.module.css";
import Cookies from "js-cookie";

//* Importar imágenes avatars Default
import avatar1 from "./../../public/avatarDefault/avatar1.png";
import avatar2 from "./../../public/avatarDefault/avatar2.png";
import avatar3 from "./../../public/avatarDefault/avatar3.png";
import avatar4 from "./../../public/avatarDefault/avatar4.png";
import avatar5 from "./../../public/avatarDefault/avatar5.png";
import avatar6 from "./../../public/avatarDefault/avatar6.png";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineDown, AiOutlineSetting } from "react-icons/ai";

const avatarDefault = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export default function UserBanner({ avatar, username }) {
  const imgAvatar = avatarDefault[avatar];
  const [usuarioOpciones, setUsuarioOpciones] = useState(false);

  const handleUsuarioOpciones = () => {
    setUsuarioOpciones(!usuarioOpciones);
  };

  const handleCerrarSesion = () => {
    //Eliminar cookies username, id, avatar, role
    Cookies.remove("username");
    Cookies.remove("id");
    Cookies.remove("avatar");
    Cookies.remove("role");
    //Redireccionar a la página de inicio
    window.location.href = "/";
  };

  return (
    <div className={styles.contenedorUsuarioBanner}>
      <div className={styles.banner}>
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={handleUsuarioOpciones}
        >
          <Image
            src={imgAvatar}
            alt={username}
            style={{
              width: "50px",
              height: "100%",
              objectFit: "cover",
              marginRight: "20px",
            }}
            priority={true}
          />
          <div>
            <div
              style={{
                display: usuarioOpciones ? "none" : "flex",
                alignItems: "center",
              }}
            >
              <p>{username}</p>
              <AiOutlineDown style={{ padding: "3px" }} />
            </div>
            <span
              className={styles.menuUsuarioOpciones}
              style={{ display: usuarioOpciones ? "block" : "none" }}
              onClick={handleCerrarSesion}
            >
              Cerrar Sesión
            </span>
          </div>
        </div>

        <div>
          <AiOutlineSetting />
        </div>
      </div>
    </div>
  );
}
