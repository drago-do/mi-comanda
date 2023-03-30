import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const urlAPI = process.env.API_URL;

export function useComandaActual() {
  const [comandaActual, setComandaActual] = useState(null);

  const obtenerComandaActual = async () => {
    try {
      const cachedComanda = JSON.parse(localStorage.getItem("comandaActual"));
      if (cachedComanda) {
        setComandaActual(cachedComanda);
      } else {
        setComandaActual(null);
      }
    } catch (error) {
      console.error(error);
      setComandaActual(null);
    }
  };

  const agregarProducto = (creationDate, id_mongo, price, deliver) => {
    verificarComanda();
    let producto = {
      creationDate: creationDate,
      id_mongo: id_mongo,
      price: price,
      deliver: deliver,
    };
    let comanda = JSON.parse(localStorage.getItem("comandaActual"));
    comanda.products.push(producto);
    comanda.fullDeliver = false;
    localStorage.setItem("comandaActual", JSON.stringify(comanda));
    setComandaActual(comanda);
    calcularTotal();
  };

  const eliminarProducto = (creationDate) => {
    return new Promise((resolve, reject) => {
      let comanda = JSON.parse(localStorage.getItem("comandaActual"));
      if (comanda.products.length <= 1) {
        eliminarComanda();
        setComandaActual(null);
      } else {
        comanda.products = comanda.products.filter(
          (producto) => producto.creationDate !== creationDate
        );
        localStorage.setItem("comandaActual", JSON.stringify(comanda));
        setComandaActual(comanda);
        calcularTotal();
      }
      resolve(comanda);
    });
  };

  // TODO mover esta fracción de código a la aplicación de orden-sync
  const modificarEstadoProducto = (creationDate) => {
    return new Promise((resolve, reject) => {
      let comanda = JSON.parse(localStorage.getItem("comandaActual"));
      comanda.products = comanda.products.map((producto) => {
        if (producto.creationDate === creationDate) {
          producto.deliver = !producto.deliver;
        }
        return producto;
      });
      localStorage.setItem("comandaActual", JSON.stringify(comanda));
      if (comanda) {
        resolve(comanda);
      } else {
        reject("No se pudo actualizar la comanda");
      }
    });
  };

  const comandaPagada = () => {
    return new Promise((resolve, reject) => {
      try {
        let comanda = JSON.parse(localStorage.getItem("comandaActual"));
        comanda.paid = true;
        localStorage.setItem("comandaActual", JSON.stringify(comanda));
        setComandaActual(comanda);
        resolve(comanda);
      } catch (error) {
        reject(error);
      }
    });
  };
  // TODO **********************************************************

  const pagarComanda = () => {
    return new Promise((resolve, reject) => {
      let comanda = JSON.parse(localStorage.getItem("comandaActual"));
      //Cambiar estado de la comanda a pendiente de pago
      comanda.paid = comanda.paid === "wait" ? "pending" : "wait";
      //Guardar comanda
      localStorage.setItem("comandaActual", JSON.stringify(comanda));
      setComandaActual(comanda);
      //Redirigir a "/"
      resolve(comanda);
    });
  };

  const eliminarComanda = () => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem("comandaActual");
        setComandaActual(null);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const calcularTotal = () => {
    let comanda = JSON.parse(localStorage.getItem("comandaActual"));
    comanda.total = comanda.products.reduce(
      (total, producto) => total + producto.price,
      0
    );
    localStorage.setItem("comandaActual", JSON.stringify(comanda));
    setComandaActual(comanda);
  };

  const verificarComanda = () => {
    //Obtener cookies de usuario (id, username)
    let user = Cookies.get("user");
    let idUser = Cookies.get("id");
    let comanda = JSON.parse(localStorage.getItem("comandaActual"));

    if (!comanda) {
      // crea un nuevo objeto `Date`
      var today = new Date();
      // obtener la hora en la configuración regional de EE. UU.
      var horaActual = today.toLocaleTimeString("es-MX");
      var fechaActual = today.toLocaleString();
      comanda = {
        id: Date.now(),
        madeByUser: user,
        userId: idUser,
        fullDeliver: false,
        paid: false,
        tableName: horaActual,
        location: ["x", "y"],
        creationDate: fechaActual,
        products: [],
        total: 0,
      };
      localStorage.setItem("comandaActual", JSON.stringify(comanda));
    }
  };

  const enviarNuevaComanda = () => {
    return new Promise((resolve, reject) => {
      // Verificar si los datos existen en localStorage
      if (localStorage.getItem("comandaActual") !== null) {
        const nuevaComanda = JSON.parse(localStorage.getItem("comandaActual"));
        // Verificar si la comanda tiene productos
        nuevaComanda && reject("No hay comanda");
        if (nuevaComanda.products.length > 0) {
          //Enviar comanda a base de datos
          axios
            .post(`${urlAPI}order`, nuevaComanda)
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
  };

  const cambiarNombreMesa = (nuevoNombreMesa) => {
    return new Promise((resolve, reject) => {
      let comanda = JSON.parse(localStorage.getItem("comandaActual"));
      comanda.tableName = nuevoNombreMesa;
      localStorage.setItem("comandaActual", JSON.stringify(comanda));
      if (comanda) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  };

  return {
    comandaActual,
    obtenerComandaActual,
    agregarProducto,
    eliminarProducto,
    eliminarComanda,
    comandaPagada,
    modificarEstadoProducto,
    enviarNuevaComanda,
    pagarComanda,
    cambiarNombreMesa,
  };
}
