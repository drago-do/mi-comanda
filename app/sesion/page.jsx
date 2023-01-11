"use client";
import React, { useState, useEffect, Children, useRef } from "react";
import axios from "axios";
import LoadingAnimation from "./../components/LoadingAnimation";
import Cookies from "js-cookie";

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

  const [listaUsuarios, setListaUsuarios] = useState(null);

  useEffect(() => {
    const urlAPI = process.env.API_URL;
    //URL para obtener usuarios
    const obtenerUsuariosURL = urlAPI + "user";
    async function fetchData() {
      const response = await axios.get(obtenerUsuariosURL);
      setListaUsuarios(response.data);
    }

    fetchData();
  }, []);

  const verificarContraseña = () => {
    if (contraseña === usuario.password) {
      //Guardar "usuario" en una cookie
      guardarCookies();
      //redirigir a pagina de pedido
      window.location.href = "/pedido";
    } else {
      contraseñaIncorrectaAnimacion();
    }
  };

  const guardarCookies = () => {
    Cookies.set("username", usuario.username);
    Cookies.set("role", usuario.role);
    Cookies.set("id", usuario._id);
    Cookies.set("avatar", usuario.avatar);
  };

  const contraseñaIncorrectaAnimacion = () => {
    setMostrarAnimacionError(true);
    setMensajeUsuario("Usuario o contraseña incorrectos");
    setContraseña("");
    //espera 2 segundos y setMostrarAnimacion(false)
    setTimeout(() => {
      setMostrarAnimacionError(false);
      setMensajeUsuario("Selecciona tu usuario y coloca tu contraseña");
    }, 1200);
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
    //Asignar el objeto en el que listaUsuario.username y usuarioSeleccionado coincida. Guardar objeto en setUsuario.
    let objetoUsuario = listaUsuarios.filter((usuario) => {
      return usuario.username === usuarioSeleccionado;
    });
    objetoUsuario = objetoUsuario[0];
    setUsuario(objetoUsuario);
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
          {listaUsuarios ? (
            listaUsuarios.map((usuarioActual) => (
              <Usuario
                nombre={usuarioActual.username}
                estaActivo={usuario.username === usuarioActual.username}
                avatar={usuarioActual.avatar}
                key={usuarioActual._id}
              />
            ))
          ) : (
            <LoadingAnimation />
          )}
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
