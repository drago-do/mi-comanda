import React from "react";
import { useState, useEffect } from "react";

import { AiFillEdit } from "react-icons/ai";

import { useComandasGlobales } from "./../hooks/useComandasGlobales";

import "./../../styles/index/ListaComandasGlobales.css";

export default function ListaComandasGlobales({ update }) {
  const { comandasGlobales, obtenerComandasGlobales } = useComandasGlobales();

  useEffect(() => {
    obtenerComandasGlobales();
  }, [update]);

  return (
    <div className="mainContainer">
      <div className="itemComandasContainer">
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
      <div className="itemComandasContainer">
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
    <div className="itemContainerMainInfo">
      <div className="locationContainer">{location}</div>
      <div style={{ width: "60%" }}>
        <h2 style={{ marginBottom: "5px" }}>{tableName}</h2>
        <div className="containerEstadoTotal">
          <p
            className={`textEstadoTotal ${
              fullDeliver ? "fullDeliver" : "noFullDeliver"
            }`}
          >
            {paid ? "Pagado" : fullDeliver ? "Entregado" : "Pendiente"}
          </p>
          <p className="textEstadoTotal total">${total}</p>
        </div>
      </div>
      <div
        className="locationContainer"
        onClick={() => editarComandaGlobal(id)}
      >
        {!paid && <AiFillEdit />}
      </div>
    </div>
  );
};
