import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingAnimation from "../../components/LoadingAnimation";
import ItemCategoria from "./components/ItemCategoria";
import ItemProducto from "./components/ItemProducto";
import IniciarPedidoLayout from "./IniciarPedidoLayout";

import { useProductos } from "../../hooks/useProductos";
import { useCategorias } from "../../hooks/useCategorias";

export default function PageSubcategoria(props) {
  const router = useRouter();
  const { subcategoria } = router.query;
  const [categoriaActual, setCategoriaActual] = useState(null);

  const { categorias, obtenerCategorias } = useCategorias();
  const { productos, getProducts } = useProductos();

  useEffect(() => {
    getProducts();
    obtenerCategorias();
  }, []);

  useEffect(() => {
    if (categorias !== null) {
      let categoriaActual;
      categorias.map((item) => {
        if (item._id === subcategoria) {
          categoriaActual = item;
        }
      });
      setCategoriaActual(categoriaActual);
    }
  }, [categorias, subcategoria]);

  return (
    <IniciarPedidoLayout>
      <div
        className="contenedorCategoriasProductos"
        style={{
          alignItems: categorias ? "stretch" : "center",
          justifyContent: categorias ? "flex-start" : "center",
        }}
      >
        {categoriaActual && (
          <h1 className="tituloDeCategoria">Estas en {categoriaActual.name}</h1>
        )}
        {categorias ? (
          categorias.map(
            (category, index) =>
              //Si category.parent es === a categoriaActual._id
              //entonces mostrar el componente ItemCategoria
              category.parent === subcategoria && (
                <ItemCategoria
                  key={index}
                  nombre={category.name}
                  descripcion={category.description}
                  imagen={category.image}
                  id={category._id}
                />
              )
          )
        ) : (
          <LoadingAnimation />
        )}
        {productos ? (
          productos.map(
            (product, index) =>
              //Si productos.category es === a categoriaActual._id
              //entonces mostrar el componente ItemProducto
              product.category === subcategoria && (
                <ItemProducto
                  key={index}
                  nombre={product.name}
                  descripcion={product.description}
                  price={product.price}
                  imagen={product.image}
                  size={product.size}
                  ingredients={product.ingredients}
                  units={product.units}
                  id={product._id}
                />
              )
          )
        ) : (
          <LoadingAnimation />
        )}
      </div>
    </IniciarPedidoLayout>
  );
}
