import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useProductos } from "./../../../hooks/useProductos";
import { useComandaActual } from "./../../../hooks/useComandaActual";
import { BsFillCartCheckFill, BsFillXOctagonFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

export default function ItemProductoComanda({ update }) {
  const {
    comandaActual,
    obtenerComandaActual,
    eliminarProducto,
    cambiarNombreMesa,
    pagarComanda,
  } = useComandaActual();
  const { productos, getProducts } = useProductos();
  const [comandaPendientePago, setComandaPendientePago] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    obtenerComandaActual();
    if (comandaActual) {
      setComandaPendientePago(comandaActual.paid === "wait");
    }
  }, [update]);

  const obtenerProducto = (id) => {
    if (productos != null)
      return productos.find((producto) => producto._id === id);
  };

  const deleteItemHandle = (creationDate) => {
    eliminarProducto(creationDate);
  };

  const handlePagarComanda = () => {
    pagarComanda().then(() => {
      window.location.href = "/";
    });
  };

  return (
    <>
      {comandaActual && productos ? (
        <>
          <div className="contenedorComandaActual">
            <div className="infoPrincipal">
              <div>
                <h3 style={{ fontSize: "var(--font-h4-size)" }}>
                  Nombre de la mesa:
                </h3>
                <input
                  className="inputMesa"
                  defaultValue={comandaActual.tableName}
                  onBlur={(evt) => cambiarNombreMesa(evt.target.value)}
                  onFocus={(evt) => evt.target.select()}
                />
              </div>
            </div>
            {comandaActual.products.map((producto, index) => (
              <Producto
                key={producto.creationDate}
                producto={producto}
                obtenerProducto={obtenerProducto}
                deleteItemHandle={deleteItemHandle}
              />
            ))}
          </div>
          <div className="totalCuenta">
            <p>Total: ${comandaActual.total}</p>
            <button
              className="button-3"
              role="button"
              onClick={handlePagarComanda}
            >
              {comandaPendientePago ? (
                <BsFillXOctagonFill />
              ) : (
                <BsFillCartCheckFill />
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="sinProducto">
          <h2>No hay productos en la comanda</h2>
          <Image
            src={"/uiDefault/productosComanda.png"}
            width={350}
            height={350}
            alt="Ilustración"
          />
          <p>Agrega productos para verlos acá.</p>
        </div>
      )}
    </>
  );
}

const Producto = React.memo(
  ({ producto, obtenerProducto, deleteItemHandle }) => {
    return (
      <div key={producto.creationDate} className="producto">
        <div className="infoProducto">
          <p className="productoIndex">*</p>
          <Image
            width={60}
            height={60}
            src={obtenerProducto(producto.id_mongo).image}
            alt={obtenerProducto(producto.id_mongo).name}
            className="productoImagen"
          />
          <div className="textoProducto">
            <p className="productoTitulo">
              {obtenerProducto(producto.id_mongo).name}
            </p>
            <div className="containerEstado">
              <p className="textPrecioTam precio">
                ${obtenerProducto(producto.id_mongo).price}{" "}
              </p>
              <p className="textPrecioTam tam">
                {obtenerProducto(producto.id_mongo).size}
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => deleteItemHandle(producto.creationDate)}
          className="icono"
        >
          <AiFillDelete style={{ fontSize: "2rem" }} />
        </div>
      </div>
    );
  }
);
