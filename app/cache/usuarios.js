//Importar axios para consultar una api
import axios from "axios";
//Importar la url de la api
const urlAPI = process.env.API_URL;
//URL para obtener usuarios
const obtenerUsuariosURL = urlAPI + "user";

//Función que obtiene los usuarios de la base de datos con axios
async function obtenerUsuariosBaseDeDatos() {
  const response = await axios.get(obtenerUsuariosURL);
  return response.data;
}

//Función que guarda en localStorage la respuesta de la base de datos
function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

//Función que retorna los usuarios
export async function obtenerUsuarios() {
  //Verificar si hay usuarios en la localStorage
  if (localStorage.getItem("usuarios") === null) {
    //Si no hay usuarios, obtenerlos de la base de datos
    obtenerUsuariosBaseDeDatos().then((usuarios) => {
      //Guardarlos en la localStorage
      guardarUsuarios(usuarios);
      return JSON.parse(localStorage.getItem("usuarios"));
    });
  } else {
    //Retornar los usuarios
    return JSON.parse(localStorage.getItem("usuarios"));
  }
}
