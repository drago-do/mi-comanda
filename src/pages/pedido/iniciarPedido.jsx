import React, { useEffect } from "react";
import LoadingAnimation from "./../../components/LoadingAnimation";
import ItemCategoria from "./components/ItemCategoria";
import IniciarPedidoLayout from "./IniciarPedidoLayout";

import { useProductos } from "./../../hooks/useProductos";
import { useCategorias } from "./../../hooks/useCategorias";

export default function IniciarPedido() {
  const { categorias, obtenerCategorias } = useCategorias();
  const { productos, obtenerProductos } = useProductos();

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  return (
    <IniciarPedidoLayout>
      <div
        className="contenedorCategoriasProductos"
        style={{
          alignItems: categorias ? "stretch" : "center",
          justifyContent: categorias ? "flex-start" : "center",
        }}
      >
        {categorias ? (
          categorias.map(
            (category, index) =>
              !category.parent && ( //Si la Categoria tiene padre, no se muestra
                <ItemCategoria
                  key={index}
                  nombre={category.name}
                  descripcion={category.description}
                  imagen={category.image}
                  id={category._id}
                  productos={productos}
                  categorias={categorias}
                />
              )
          )
        ) : (
          <LoadingAnimation />
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </IniciarPedidoLayout>
  );
}