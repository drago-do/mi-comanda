"use client";
import React, { useState, useEffect, Children, useRef } from "react";
import styles from "./../../styles/index/components.module.css";

function SwipeUpDownMenu(props) {
  const [open, setOpen] = useState(false);
  const [siguienteAccion, setSiguienteAccion] = useState("abrir");
  const [existeMovimientoTouch, setExisteMovimientoTouch] = useState(null);
  //Propiedades CSS
  const [top, setTop] = useState("90%");

  const ComponenteIcono = props.iconoSuperior;

  const elementoMenu = useRef(null);
  elementoMenu.current = document.getElementById("swipeUpDownMenu");

  const handleTouchStart = (event) => {
    // Código para manejar el evento touchstart
    console.log("Touch start");
    setOpen(!open);
  };

  const handleTouchMove = (event) => {
    // Código para manejar el evento touchmove
    const touch = event.touches[0];
    setExisteMovimientoTouch(touch);
    // elementoMenu.style.top = touch.clientY + "px";
    setTop(touch.clientY + "px");
  };

  const handleTouchEnd = (event) => {
    //Comprobar si existió desplazamiento, si existió,entonces invertir el estado "open"
    if (existeMovimientoTouch !== null) {
      // Código para manejar el evento touchend
      //si el elementoMenu.style.top es menor al valor total de pixeles dividido a la mitad
      //entonces se abre el menú
      //si no, se cierra
      //Eliminar los últimos dos caracteres y convertir a numérico el valor elementoMenu.style.top
      let topWithoutPX = Number(top.slice(0, -2));
      if (topWithoutPX < window.innerHeight / 2) {
        setOpen(true);
        setTop("5%");
      } else {
        setTop("90%");
        setOpen(false);
      }
    }
    setExisteMovimientoTouch(null);
  };

  useEffect(() => {
    const elementoIcono = document.getElementById(
      "swipeUpDownMenu__header__icon"
    );
    setSiguienteAccion(open ? "cerrar" : "abrir");
    setTop(open ? "5%" : "90%");
    elementoIcono.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
  }, [open]);

  return (
    <div
      className={styles.swipeUpDownMenu}
      id="swipeUpDownMenu"
      style={{ top: top }}
    >
      <div
        className={styles.swipeUpDownMenu__header}
        onTouchStart={() => handleTouchStart()}
        onTouchMove={(event) => handleTouchMove(event)}
        onTouchEnd={(event) => handleTouchEnd(event)}
      >
        <div
          id="swipeUpDownMenu__header__icon"
          className={styles.swipeUpDownMenu__header__icon}
        >
          <ComponenteIcono />
        </div>
        <div className={styles.swipeUpDownMenu__header__title}>
          <h1>{props.tituloMenu}</h1>
          <h3>Toca o desliza para {siguienteAccion}</h3>
        </div>
      </div>
      <div className={styles.swipeUpDownMenu__content}>{props.children}</div>
    </div>
  );
}

export default SwipeUpDownMenu;
