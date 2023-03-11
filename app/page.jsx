"use client";
import React from "react";
import Link from "next/link";
import styles from "./../styles/index/index.module.css";
import SwipeUpDownMenu from "./components/SwipeUpDownMenu";
import { AiFillCaretUp } from "react-icons/ai";
import UserBanner from "./components/UserBanner";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

const urlAPI = process.env.API_URL;

export default function Page() {
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    //Recuperar las cookies username y avatar
    setAvatar(Cookies.get("avatar"));
    setUserName(Cookies.get("username"));
    setId(Cookies.get("id"));
    //Comprobar si existe nueva comanda
    console.log(comprobarSiExisteComandaNueva());
  }, []);

  return (
    <>
      {id ? <UserBanner avatar={avatar} username={userName} /> : ""}

      <div className={styles.container}>
        <Link href="./sesion">
          <img src="/next.svg" alt="Logo" className={styles.logo} />
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

function comprobarSiExisteComandaNueva() {
  return new Promise((resolve, reject) => {
    // Verificar si los datos existen en localStorage
    if (localStorage.getItem("comandaActual") !== null) {
      const nuevaComanda = JSON.parse(localStorage.getItem("comandaActual"));
      // Verificar si la comanda tiene productos
      if (nuevaComanda.productos.length > 0) {
        //Enviar comanda a base de datos
        axios
          .post(`${urlAPI}/comandas`, nuevaComanda)
          .then((res) => {
            // Eliminar la comanda del localStorage
            localStorage.removeItem("comandaActual");
            resolve(true);
          })
          .catch((error) => {
            console.error(error);
            reject("Error al enviar la comanda.");
          });
      } else {
        reject("La nueva comanda no tiene productos.");
      }
    } else {
      reject("No hay nueva comanda.");
    }
  });
}
