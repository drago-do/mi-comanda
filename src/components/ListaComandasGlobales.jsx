import React from "react";
import { useEffect } from "react";

import { HiArchive, HiPencilAlt, HiLocationMarker } from "react-icons/hi";

import { useComandasGlobales } from "./../hooks/useComandasGlobales";

import styles from "./../styles/index/ListaComandasGlobales.module.css";

export default function ListaComandasGlobales({ update }) {
  const { comandasGlobales, obtenerComandasGlobales } = useComandasGlobales();

  useEffect(() => {
    obtenerComandasGlobales();
  }, [update]);

  return (
    <div className={styles.mainContainer}>
      {/* comandas activas( pendiente, entregado) */}
      {comandasGlobales &&
        comandasGlobales.map((comanda) => {
          //Verificar si la comanda esta activa (comanda.paid == false)
          if (comanda.paid !== "true" || !comanda.fullDeliver) {
            return (
              <ItemComandaGlobal
                key={comanda._id}
                id={comanda.id}
                tableName={comanda.tableName}
                location={comanda.location}
                fullDeliver={comanda.fullDeliver}
                total={comanda.total}
                paid={comanda.paid}
                fullObjet={comanda}
              />
            );
          }
        })}
      {/* comandas finalizadas - pagadas*/}
      <div className={styles.separator}>
        <hr className={styles.line} />
        <p className={styles.textoSeparador}>Comandas finalizadas</p>
        <hr className={styles.line} />
      </div>
      {comandasGlobales &&
        comandasGlobales
          .filter((comanda) => comanda.paid === "true" && comanda.fullDeliver)
          .reverse()
          .slice(0, 5)
          .map((comanda) => (
            <ItemComandaGlobal
              key={comanda._id}
              id={comanda.id}
              tableName={comanda.tableName}
              location={comanda.location}
              fullDeliver={comanda.fullDeliver}
              paid={comanda.paid}
              total={comanda.total}
            />
          ))}
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
      <div className={styles.locationContainer}>
        <HiLocationMarker />
      </div>
      <div style={{ width: "60%" }}>
        <h2 style={{ marginBottom: "5px" }}>{tableName}</h2>
        <div className={styles.containerEstadoTotal}>
          <p
            className={`${styles.textEstadoTotal} ${
              fullDeliver ? styles.full : styles.noFull
            }`}
          >
            {fullDeliver ? "Entregado" : "Pendiente"}
          </p>

          <p
            className={`${styles.textEstadoTotal} ${
              paid === "true"
                ? styles.full
                : paid === "wait"
                ? styles.wait
                : styles.noFull
            }`}
          >
            {paid === "true"
              ? "Pagado"
              : paid === "wait"
              ? "Espera"
              : "Falta pagar"}
          </p>
          <p
            className={`${styles.textEstadoTotal} ${styles.total}`}
          >{`$ ${total}`}</p>
        </div>
      </div>
      <div
        className={styles.locationContainer}
        onClick={() => paid !== "true" && editarComandaGlobal(id)}
      >
        {paid === "true" ? <HiArchive /> : <HiPencilAlt />}
      </div>
    </div>
  );
};
