import React from "react";

export default function InfoProducto({ mostrar, ingredients, price, units }) {
  const show = mostrar ? "flex" : "none";

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
        <h3>Precio: ${price}</h3>
        <h3>Unidades: {units}</h3>
      </div>
    </div>
  );
}
