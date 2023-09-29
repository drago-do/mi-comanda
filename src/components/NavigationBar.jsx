import React from "react";
import { HiArrowLeft, HiHome } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import { AiOutlineDown } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import styles from "./../styles/index/components.module.css";
import Cookies from "js-cookie";

export default function NavigationBar({ ownPathName }) {
  const [pathName, setPathName] = useState(ownPathName || "Mi comanda");

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  return pathName === "/" ? (
    <UserInfoNavigationBar />
  ) : (
    <DefaultNavigationBar pathName={pathName} />
  );
}

function DefaultNavigationBar({ pathName }) {
  //Recupera la ruta actual
  const [titulo, setTitulo] = useState();
  //Recupera el titulo de la actividad

  useEffect(() => {
    setTitulo(obtenerTitulo(pathName && pathName.split("/")[2]));
  }, [pathName]);

  const handleClick = () => {
    window.history.back();
  };

  //Función recibe un string, si el String contiene mas de 2 números regresa "Lista de productos", si no regresa el string
  const obtenerTitulo = (titulo) => {
    if (titulo) {
      console.log("hey");
      const numbers = titulo.match(/\d/g);
      if (numbers && numbers.length > 2) {
        return "Lista de productos";
      } else {
        return titulo;
      }
    } else {
      return pathName.substring(1);
    }
  };

  return (
    <div className={styles.NavigationBarContainer}>
      <div onClick={handleClick}>
        <HiArrowLeft className={styles.NavigationBar__icon} />
      </div>
      <Link
        href={"/pedido/iniciarPedido"}
        style={{ textTransform: "capitalize" }}
        className="text-xl"
      >
        {titulo}
      </Link>
      <Link href="/">
        <HiHome className={styles.NavigationBar__icon} />
      </Link>
    </div>
  );
}

function UserInfoNavigationBar() {
  const { closeUserSesion } = useUsers();
  const [showCloseSesion, setShowCloseSesion] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(Cookies.get("username"));
  }, []);

  const handleUserCloseSesion = () => {
    setShowCloseSesion(!showCloseSesion);
  };

  const handleCloseSesion = () => {
    //Eliminar cookies username, id, avatar, role
    closeUserSesion().then((_) => (window.location.href = "/"));
  };

  return (
    <div
      className={styles.contenedorUsuarioBanner}
      style={{ display: userName ? "block" : "none" }}
    >
      <div className={styles.banner}>
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={handleUserCloseSesion}
        >
          <Image
            src={"https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000"}
            alt={userName}
            width={100}
            height={100}
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
                display: showCloseSesion ? "none" : "flex",
                alignItems: "center",
              }}
            >
              <p>{userName}</p>
              <AiOutlineDown style={{ padding: "3px" }} />
            </div>
            <span
              className={styles.menuUsuarioOpciones}
              style={{ display: showCloseSesion ? "block" : "none" }}
              onClick={handleCloseSesion}
            >
              Cerrar Sesión
            </span>
          </div>
        </div>
        <IconButton aria-label="delete">
          <Link href={"/#"}>
            <SettingsApplicationsIcon style={{ fontSize: "3rem" }} />
          </Link>
        </IconButton>
      </div>
    </div>
  );
}
