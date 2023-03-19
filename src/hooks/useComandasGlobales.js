import { useState } from "react";
import axios from "axios";

const urlAPI = process.env.API_URL;

export function useComandasGlobales() {
  const [comandasGlobales, setComandasGlobales] = useState(null);

  const obtenerComandasGlobales = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${urlAPI}order`)
        .then((res) => {
          setComandasGlobales(res.data);
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

  return {
    comandasGlobales,
    editarComandaGlobal,
    obtenerComandasGlobales,
  };
}
