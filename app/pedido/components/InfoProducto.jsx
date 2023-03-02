import React from "react";
import "./../../../styles/pedido/pedido.css";

export default function InfoProducto({ mostrar, objeto }) {
  const show = mostrar ? "flex" : "none";
  const ingredients = objeto.ingredients;

  return (
    <div className="contenedorInformacion" style={{ display: show }}>
      <div className="contenedorInformacionIngredientes">
        <h3>Ingredientes:</h3>
        <div>
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((ingrediente, i) => <li key={i}>{ingrediente}</li>)
          ) : (
            <p>No hay ingredientes</p>
          )}
        </div>
      </div>
      <div className="contenedorInformacionAdicionales">
        <h3>Precio: ${objeto.price}</h3>
        <h3>Unidades: {objeto.units}</h3>
      </div>
    </div>
  );
}
