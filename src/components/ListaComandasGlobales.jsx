import React from "react";
import { useEffect } from "react";

import { AiFillEdit } from "react-icons/ai";

import { useComandasGlobales } from "./../hooks/useComandasGlobales";

import styles from "./../../styles/index/ListaComandasGlobales.module.css";

export default function ListaComandasGlobales({ update }) {
  const { comandasGlobales, obtenerComandasGlobales } = useComandasGlobales();

  useEffect(() => {
    obtenerComandasGlobales();
  }, [update]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.itemComandasContainer}>
        {/* comandas activas( pendiente, entregado) */}
        {comandasGlobales &&
          comandasGlobales.map((comanda) => {
            //Verificar si la comanda esta activa (comanda.paid == false)
            if (!comanda.paid) {
              return (
                <ItemComandaGlobal
                  key={comanda._id}
                  id={comanda.id}
                  tableName={comanda.tableName}
                  location={comanda.location}
                  fullDeliver={comanda.fullDeliver}
                  total={comanda.total}
                  fullObjet={comanda}
                />
              );
            }
          })}
      </div>
      <div className={styles.itemComandasContainer}>
        {/* comandas finalizadas - pagadas*/}
        {comandasGlobales &&
          comandasGlobales.map((comanda) => {
            //Verificar si la comanda esta activa (comanda.paid == false)
            if (comanda.paid) {
              return (
                <ItemComandaGlobal
                  key={comanda._id}
                  id={comanda.id}
                  tableName={comanda.tableName}
                  location={comanda.location}
                  fullDeliver={comanda.fullDeliver}
                  paid={comanda.paid}
                  total={comanda.total}
                />
              );
            }
          })}
      </div>
    </div>
  );
}

const ItemComandaGlobal = ({
  id,
  tableName,
  location,
  fullDeliver,
  paid,
  total,
}) => {
  const { editarComandaGlobal } = useComandasGlobales();
  return (
    <div className={styles.itemContainerMainInfo}>
      <div className={styles.locationContainer}>{location}</div>
      <div style={{ width: "60%" }}>
        <h2 style={{ marginBottom: "5px" }}>{tableName}</h2>
        <div className={styles.containerEstadoTotal}>
          <p
            className={`${styles.textEstadoTotal} ${
              fullDeliver ? styles.fullDeliver : styles.noFullDeliver
            }`}
          >
            {paid ? "Pagado" : fullDeliver ? "Entregado" : "Pendiente"}
          </p>
          <p className={(styles.textEstadoTotal, styles.total)}>${total}</p>
        </div>
      </div>
      <div
        className={styles.locationContainer}
        onClick={() => !paid && editarComandaGlobal(id)}
      >
        {!paid && <AiFillEdit />}
      </div>
    </div>
  );
};
