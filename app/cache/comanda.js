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

var comandaActual;

//Función que regresa el valor de "comandaActual"
export function obtenerComandaActual() {
  return new Promise((resolve, reject) => {
    // Verificar si los datos existen en localStorage
    if (localStorage.getItem("comandaActual") !== null) {
      const comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
      resolve(comandaActual);
    } else {
      reject(false);
    }
  });
}

//Función que elimina un producto de la comanda actual
export function eliminarProducto(creationDate, reject = null) {
  return new Promise((resolve, reject) => {
    try {
      comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
      //Si comandaActual.products solo tiene un elemento, entonces eliminar toda la comanda
      if (comandaActual.products.length <= 1) {
        eliminarComanda();
      } else {
        comandaActual.products = comandaActual.products.filter(
          (producto) => producto.creationDate !== creationDate
        );
        localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
        calcularTotal();
      }
      resolve(true);
    } catch (error) {
      if (reject) {
        reject(error);
      } else {
        resolve(false);
      }
    }
  });
}

//Función que verifica si existe una comanda en almacenamiento local. Si no existe,crea una nueva.
function verificarComanda() {
  // crea un nuevo objeto `Date`
  var today = new Date();
  // obtener la hora en la configuración regional de EE. UU.
  var horaActual = today.toLocaleTimeString("es-MX");
  var fechaActual = today.toLocaleString();
  comandaActual = {
    id: Date.now(),
    fullDeliver: false,
    paid: false,
    tableName: horaActual,
    location: ["x", "y"],
    creationDate: fechaActual,
    products: [],
    total: 0,
  };
  if (localStorage.getItem("comandaActual") === null) {
    localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
  }
}

//Función que agrega un producto a la comanda actual
export function agregarProducto(creationDate, id_mongo, price, deliver) {
  verificarComanda();
  let producto = {
    creationDate: creationDate,
    id_mongo: id_mongo,
    price: price,
    deliver: deliver,
  };
  comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
  comandaActual.products.push(producto);
  comandaActual.entregado = false;
  localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
  calcularTotal();
}

//Función que modifica el estado de un producto de la comanda actual
export function modificarEstadoProducto(creationDate) {
  comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
  comandaActual.products = comandaActual.products.map((producto) => {
    if (producto.creationDate === creationDate) {
      producto.deliver = !producto.deliver;
    }
    return producto;
  });
  localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
}

//Función que calcula el total de la comanda actual
function calcularTotal() {
  comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
  comandaActual.total = comandaActual.products.reduce(
    (total, producto) => total + producto.price,
    0
  );
  localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
}

//Función que modifica el estado de la comanda actual
export function comandaPagada() {
  comandaActual = JSON.parse(localStorage.getItem("comandaActual"));
  comandaActual.paid = true;
  localStorage.setItem("comandaActual", JSON.stringify(comandaActual));
}

//Función que elimina la comanda actual
export function eliminarComanda() {
  localStorage.removeItem("comandaActual");
}
