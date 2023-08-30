import { useState } from "react";
import axios from "axios";

const urlAPI = process.env.API_URL;

export function useComandasGlobales() {
  const obtenerComandasGlobales = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${urlAPI}order`)
        .then((res) => {
          //Guardar las comandas globales en el almacenamiento local
          localStorage.setItem("comandasGlobales", JSON.stringify(res.data));
          //Guardar la fecha de guardado de las comandas globales en el almacenamiento local
          resolve(res.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };


  const editarComandaGlobal = (id) => {
    obtenerComandasGlobales().then((comandas) => {
      const comandaActual = comandas.find((comanda) => comanda.id === id);
      //Guardar comanda actual el almacenamiento local
      localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
      //Redirigir a "/pedido"
      window.location.href = "/pedido/iniciarPedido";
    });
  };

  const marcarComandaComoCompleta = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${urlAPI}order/complete/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const marcarComandaComoPagada = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${urlAPI}order/pay/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const terminarDiaDeTrabajo = () => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${urlAPI}order/endDay/`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  return {
    editarComandaGlobal,
    obtenerComandasGlobales,
    marcarComandaComoCompleta,
    marcarComandaComoPagada,
  };
}
