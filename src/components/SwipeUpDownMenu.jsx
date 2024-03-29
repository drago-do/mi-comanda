import React, { useState, useEffect } from "react";
import styles from "./../styles/index/components.module.css";
import { AiFillCaretUp } from "react-icons/ai";

function SwipeUpDownMenu(props) {
  const [pathName, setPathName] = useState("");
  const [open, setOpen] = useState(false);
  const [siguienteAccion, setSiguienteAccion] = useState("abrir");
  // const [existeMovimientoTouch, setExisteMovimientoTouch] = useState(null);
  //Propiedades CSS
  const [top, setTop] = useState("85%");

  // const handleTouchStart = (event) => {
  //   // Código para manejar el evento touchstart
  //   setOpen(!open);
  // };

  // const handleTouchMove = (event) => {
  //   // Código para manejar el evento touchmove
  //   const touch = event.touches[0];
  //   setExisteMovimientoTouch(touch);
  //   // elementoMenu.style.top = touch.clientY + "px";
  //   setTop(touch.clientY + "px");
  // };

  // const handleTouchEnd = (event) => {
  //   //Comprobar si existió desplazamiento, si existió,entonces invertir el estado "open"
  //   if (existeMovimientoTouch !== null) {
  //     // Código para manejar el evento touchend
  //     //si el elementoMenu.style.top es menor al valor total de pixeles dividido a la mitad
  //     //entonces se abre el menú
  //     //si no, se cierra
  //     //Eliminar los últimos dos caracteres y convertir a numérico el valor elementoMenu.style.top
  //     let topWithoutPX = Number(top.slice(0, -2));
  //     if (topWithoutPX < window.innerHeight / 2) {
  //       setOpen(true);
  //       setTop("5%");
  //     } else {
  //       setTop("85%");
  //       setOpen(false);
  //     }
  //   }
  //   setExisteMovimientoTouch(null);
  // };
  // useEffect(() => {
  //   const elementoIcono = document.getElementById(
  //     "swipeUpDownMenu__header__icon"
  //   );
  //   setSiguienteAccion(open ? "cerrar" : "abrir");
  //   elementoIcono.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
  // }, [open]);

  const handleMenu = () => {
    setOpen(!open);
  };
  useEffect(() => {
    setTop(open ? "5%" : "85%");
  }, [open]);

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  return (
    <div
      className={styles.swipeUpDownMenu}
      id="swipeUpDownMenu"
      style={{ top: top }}
    >
      <div
        onClick={handleMenu}
        className={styles.swipeUpDownMenu__header}
        // onTouchStart={() => handleTouchStart()}
        // onTouchMove={(event) => handleTouchMove(event)}
        // onTouchEnd={(event) => handleTouchEnd(event)}
      >
        <div
          id="swipeUpDownMenu__header__icon"
          className={styles.swipeUpDownMenu__header__icon}
        >
          <AiFillCaretUp />
        </div>
        <div className={styles.swipeUpDownMenu__header__title}>
          <h2>{pathName && pathName === "/" ? "Lista de ordenes" : "Orden"}</h2>
          <h3>Toca o desliza para {siguienteAccion}</h3>
        </div>
      </div>
      <div className={styles.swipeUpDownMenu__content}>{props.children}</div>
    </div>
  );
}

export default SwipeUpDownMenu;
