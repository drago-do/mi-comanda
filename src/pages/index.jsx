import React from "react";
import { useEffect, useState } from "react";

import Link from "next/link";
import Cookies from "js-cookie";

import ListaComandasGlobales from "../components/ListaComandasGlobales";
import UserBanner from "../components/UserBanner";
import SwipeUpDownMenu from "../components/SwipeUpDownMenu";

import { useComandaActual } from "../hooks/useComandaActual";

import { AiFillCaretUp } from "react-icons/ai";
import styles from "./../../styles/index/index.module.css";

export default function Page() {
  const { enviarNuevaComanda } = useComandaActual();

  const [update, setUpdate] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    obtenerDatosUsuario();
    enviarNuevaComanda();
  }, []);

  const obtenerDatosUsuario = () => {
    setAvatar(Cookies.get("avatar"));
    setUserName(Cookies.get("username"));
    setId(Cookies.get("id"));
  };

  return (
    <>
      {id ? <UserBanner avatar={avatar} username={userName} /> : ""}

      <div className={styles.container}>
        <div className={styles.containerLogo}>
          <Link href="./sesion/iniciarSesion">
            <img src="/logoC.png" alt="Logo" className={styles.logo} />
          </Link>
        </div>
      </div>
      <SwipeUpDownMenu
        tituloMenu="Historial de pedidos"
        iconoSuperior={AiFillCaretUp}
        onClick={() => setUpdate(!update)}
      >
        <ListaComandasGlobales update={update} />
      </SwipeUpDownMenu>
    </>
  );
}
