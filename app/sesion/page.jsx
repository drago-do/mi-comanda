"use client";
import React, { useState, useEffect, Children, useRef } from "react";

//* Importar componentes de la vista
import Usuario from "./components/Usuario";
import DisplayYTeclado from "./components/DisplayTeclado";

//* Importar estilos
import styles from "./../../styles/sesion/sesion.module.css";

export default function Page() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrarAnimacionError, setMostrarAnimacionError] = useState(false);
  const [mensajeUsuario, setMensajeUsuario] = useState(
    "Selecciona tu usuario y coloca tu contraseña"
  );

  const verificarContraseña = () => {
    //TODO: Petición a api para obtener usuario y contraseña. Si Existen redirigir a pagina correspondiente.
    if (contraseña === "5454" && usuario === "Drago") {
      console.log("yes drago");
      
    } else if (contraseña === "5454" && usuario === "Chape") {
      console.log("yes josh");
    } else if (contraseña === "5454" && usuario === "Kamila") {
      console.log("yes poly");
    } else {
      console.log("Contraseña incorrecta");
      setMostrarAnimacionError(true);
      setMensajeUsuario("Usuario o contraseña incorrectos");
      setContraseña("");
      //espera 2 segundos y setMostrarAnimacion(false)
      setTimeout(() => {
        setMostrarAnimacionError(false);
        setMensajeUsuario("Selecciona tu usuario y coloca tu contraseña");
      }, 1200);
    }
  };

  const seleccionUsuario = (e) => {
    let usuarioSeleccionado = "";
    // console.log(e);
    // console.log(e.target);
    //Si el target es una imagen se muestra la propiedad alt, si es un p, se muestra el texto si no se muestra el valor
    if (e.target.tagName === "IMG") {
      usuarioSeleccionado = e.target.alt;
    }
    if (e.target.tagName === "P") {
      usuarioSeleccionado = e.target.innerText;
    }
    if (e.target.tagName === "DIV") {
      usuarioSeleccionado = e.target.lastChild.id;
    }
    console.log(usuarioSeleccionado);
    setUsuario(usuarioSeleccionado);
  };

  if (contraseña.length >= 4) {
    verificarContraseña();
  }
  const teclaPresionada = (e) => {
    // console.log(e);
    // console.log(e.target.innerText);
    // console.log(e.target.id);
    // console.log(e.target);
    //Si el e.target.id es igual a cont-eliminar-carácter o igual a eliminar-carácter o el parentNode.id es igual a cont-eliminar-caracter o igual a eliminar-caracter se elimina el ultimo caracter de la contraseña
    if (
      e.target.id === "cont-eliminar-caracter" ||
      e.target.id === "eliminar-caracter" ||
      e.target.parentNode.id === "cont-eliminar-caracter" ||
      e.target.parentNode.id === "eliminar-caracter"
    ) {
      let contraseñaActualizada = contraseña.slice(0, -1);
      setContraseña(contraseñaActualizada);
    } else {
      setContraseña(contraseña + e.target.innerText);
    }
  };

  return (
    <>
      <div className={styles.sesionContainer}>
        <div className={styles.usuariosContainer} onClick={seleccionUsuario}>
          <Usuario nombre="Drago" estaActivo={usuario === "Drago"} avatar="1" />
          <Usuario
            nombre="Yolatzin"
            estaActivo={usuario === "Yolatzin"}
            avatar="3"
          />
          <Usuario
            nombre="Arturo"
            estaActivo={usuario === "Arturo"}
            avatar="2"
          />
          <Usuario nombre="Chape" estaActivo={usuario === "Chape"} avatar="4" />
          <Usuario
            nombre="Kamila"
            estaActivo={usuario === "Kamila"}
            avatar="5"
          />
        </div>
        <p>{mensajeUsuario}</p>
        <DisplayYTeclado
          caracteres={contraseña.length}
          mostrarAnimacion={mostrarAnimacionError}
          onClick={teclaPresionada}
        />
      </div>
    </>
  );
}
