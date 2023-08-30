import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavigationBar from "./../../components/NavigationBar";
import { useComandasGlobales } from "./../../hooks/useComandasGlobales";
import { useUsers } from "./../../hooks/useUsers";
import { useProductos } from "./../../hooks/useProductos";

export default function Bebidas() {
  const { obtenerComandasGlobales } = useComandasGlobales();

  const [comandasTerminadas, setComandasTerminadas] = useState();
  const [comandasPendientes, setComandasPendientes] = useState();

  useEffect(() => {
    obtenerComandasGlobales().then((data) => {
      let comandas = data.reverse();
      separarComandas(comandas);
    });
  }, []);

  const separarComandas = (comandas) => {
    const { pendientes, terminadas } = comandas.reduce(
      (result, comanda) => {
        if (
          comanda.fullDeliver &&
          comanda.paid === "true" &&
          result.terminadas.length < 3
        ) {
          result.terminadas.push(comanda);
        } else {
          result.pendientes.push(comanda);
        }
        return result;
      },
      { pendientes: [], terminadas: [] }
    );

    setComandasPendientes(pendientes);
    setComandasTerminadas(terminadas);
  };

  return (
    <div className="container mx-auto pt-20 h-full">
      <NavigationBar tituloActividad="Bebidas a Preparar" />
      <ContenedorBebidas
        bebidasPendientes={true}
        comandas={comandasPendientes}
      />
      <ContenedorBebidas
        bebidasPendientes={false}
        comandas={comandasTerminadas}
      />
    </div>
  );
}

const ContenedorBebidas = ({ bebidasPendientes, comandas }) => {
  return (
    <div className={`flex flex-col items-start justify-start mx-3`}>
      <h2 className="font-medium">
        {bebidasPendientes ? "Bebidas Pendientes" : "Bebidas despachadas"}
      </h2>
      <div
        className="flex flex-col items-start justify-start w-full h-3/4 py-3 px-2 mb-4"
        style={{
          border: "1px var(--foreground) solid",
          borderRadius: "var(--border-radius)",
          background: "var(--background-secondary",
        }}
      >
        <div className="flex flex-col items-center justify-between w-full overflow-x-auto">
          {comandas &&
            comandas.map((comanda, index) => {
              return (
                <ItemBebida
                  key={index}
                  contenedorPendientes={bebidasPendientes}
                  {...comanda}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const ItemBebida = ({ tableName, userId, products }) => {
  const [nombreMesero, setNombreMesero] = useState();
  const [usuarios, setUsuarios] = useState();
  const [productos, setProductos] = useState();
  const { users, getUsers } = useUsers();
  const { getProducts } = useProductos();

  useEffect(() => {
    getUsers().then((data) => setUsuarios(data));
    getProducts().then((data) => setProductos(data));
  }, []);

  useEffect(() => {
    if (usuarios !== undefined) {
      obtenerNombreMesero();
    }
  }, [usuarios]);

  const obtenerNombreMesero = () => {
    let nombreMesero = "";
    usuarios &&
      usuarios.map((user) => {
        if (user._id === userId) {
          nombreMesero = user.username;
        }
      });
    setNombreMesero(nombreMesero);
  };

  const objetoProducto = (id) => {
    let producto = {};
    productos &&
      productos.map((product) => {
        if (product._id === id) {
          producto = product;
        }
      });
    return producto;
  };

  return (
    <div
      className="flex flex-col items-start justify-start w-full p-2 rounded-md my-1"
      style={{
        background: "var(--background)",
        border: "1px solid var(--foreground)",
      }}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex">
          <input type="checkbox" />
          <h3 className="font-medium">{tableName}</h3>
        </div>
        <h4 className="font-medium" style={{}}>
          {nombreMesero}
        </h4>
      </div>
      <div className="flex flex-col items-start justify-start pl-7  w-full">
        {products &&
          products.map((product, index) => {
            return (
              <>
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex">
                    <input type="checkbox" />

                    <Image
                      src={objetoProducto(product.id_mongo).image}
                      alt="Producto"
                      width={100}
                      height={100}
                      className="productoImagen"
                    />
                    <h4 className="font-medium">
                      {objetoProducto(product.id_mongo).name}
                    </h4>
                  </div>
                  <h4 className="font-medium">
                    {objetoProducto(product.id_mongo).size}
                  </h4>
                </div>
                <p className="pl-5">{product.comments}</p>
              </>
            );
          })}
      </div>
    </div>
  );
};
