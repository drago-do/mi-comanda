"use client";

import React from "react";
import Link from "next/link";
import styles from "./../styles/index/index.module.css";
import SwipeUpDownMenu from "./components/SwipeUpDownMenu";
import { AiFillCaretUp } from "react-icons/ai";
import UserBanner from "./components/UserBanner";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


export default function Page() {
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    //Recuperar las cookies username y avatar
    setAvatar(Cookies.get("avatar"));
    setUserName(Cookies.get("username"));
    setId(Cookies.get("id"));
  }, []);
  return (
    <>
      {id ? <UserBanner avatar={avatar} username={userName} /> : ""}

      <div className={styles.container}>
        <Link href="./sesion">
          <img src="/next.svg" alt="Logdo" className={styles.logo} />
        </Link>
      </div>
      <SwipeUpDownMenu
        tituloMenu="Historial de pedidos"
        iconoSuperior={AiFillCaretUp}
      >
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
        <h1>Hola</h1>
      </SwipeUpDownMenu>
    </>
  );
}
