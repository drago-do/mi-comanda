import React from "react";
import "./../../../styles/pedido/pedido.css";

export default function InfoProducto({ mostrar, objeto }) {
  console.log(objeto);
  return (
    <div
      class="contenedorInformacion"
      style={{ display: mostrar ? "flex" : "none" }}
    >
      <div class="contenedorInformacionIngredientes">
        <h3>Ingredientes:</h3>
        <div>
          {objeto.ingredients ? (
            // Verificar que el array tenga al menos un elemento
            objeto.ingredients.length > 0 ? (
              objeto.ingredients.map((ingrediente) => (
                <li style={{ paddingLeft: "10px" }} key={ingrediente + 1}>
                  {ingrediente}
                </li>
              ))
            ) : (
              <p>No hay ingredientes</p>
            )
          ) : (
            <p>No hay ingredientes</p>
          )}
        </div>
      </div>
      <div class="contenedorInformacionAdicionales">
        <h3>Precio: ${objeto.price}</h3>
        <h3>Unidades:{objeto.units}</h3>
      </div>
    </div>
  );
}
