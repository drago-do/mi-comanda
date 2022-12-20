"use client";

import React from "react";
import Link from "next/link";
import styles from "./../styles/index/index.module.css";
import SwipeUpDownMenu from "./components/SwipeUpDownMenu";
import { AiFillCaretUp } from "react-icons/ai";

export default function page() {
  return (
    <>
      <div className={styles.container}>
        <Link href="./identificate">
          <img src="/next.svg" alt="Logdo" className={styles.logo} />
        </Link>
      </div>
      <SwipeUpDownMenu tituloMenu="hola" iconoSuperior={AiFillCaretUp}>
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
