// var comandaActual = {
//   id: 0,
//   fechaDeCreacion: new Date(),
//   productos: [
//     {
//       fechaDeAdicione: Date.now(),
//       id_db: 2,
//       nombre: "Coca Cola",
//       imagen: "google",
//       precio: 20,
//       entregado: false,
//     },
//   ],
//   total: 0,
// };

var comandaActual = {
  id: Date.now(),
  fechaDeCreacion: new Date(),
  productos: [],
  total: 0,
};

//Función que regresa el valor de "comandaActual"
export function getComandaActual() {
  return JSON.parse(localStorage.getItem("comandaActual"));
}

//Función que verifica si existe una comanda en almacenamiento local. Si no existe,crea una nueva.
function verificarComanda() {
  if (localStorage.getItem("comandaActual") === null) {
    localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
  }
}

//Función que agrega un producto a la comanda actual
export function agregarProducto(
  fechaDeAdicione,
  id_db,
  nombre,
  imagen,
  precio,
  entregado
) {
  verificarComanda();
  let producto = {
    fechaDeAdicione: fechaDeAdicione,
    id_db: id_db,
    nombre: nombre,
    imagen: imagen,
    precio: precio,
    entregado: entregado,
  };
  comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
  comandaActual.productos.push(producto);
  localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
  calcularTotal();
}

//Función que elimina un producto de la comanda actual
export function eliminarProducto(fechaDeAdicione) {
  comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
  comandaActual.productos = comandaActual.productos.filter(
    (producto) => producto.fechaDeAdicione !== fechaDeAdicione
  );
  localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
}

//Función que modifica el estado de un producto de la comanda actual
export function modificarEstadoProducto(fechaDeAdicione) {
  comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
  comandaActual.productos = comandaActual.productos.map((producto) => {
    if (producto.fechaDeAdicione === fechaDeAdicione) {
      producto.entregado = !producto.entregado;
    }
    return producto;
  });
  localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
}

//Función que calcula el total de la comanda actual
function calcularTotal() {
  comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
  comandaActual.total = comandaActual.productos.reduce(
    (total, producto) => total + producto.precio,
    0
  );
  localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
}

//Función que elimina la comanda actual
export function eliminarComanda() {
  localStorage.removeItem("comandaActual");
}
