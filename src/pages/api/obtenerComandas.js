import axios from "axios";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const urlAPI = process.env.API_URL;
var comandasNuevas = {
  comandas: [],
  fecha: 0,
};

export default function handler(req, res) {
  if (req.method === "POST") {
    // insertar  nueva comanda
    comandasNuevas.comandas.push(req.body);
    // guardar fecha de creación de la ultima comanda
    comandasNuevas.fecha = Date.now();
    res.status(200).json({ message: "Comanda creada" });
  } else {
    //Si comandasNuevas.fecha es 10 minutos mas grande entonces hacer petición a la API
    if (Date.now() - comandasNuevas.fecha > 600000) {
      // hacer petición a la API
      axios
        .get(`${urlAPI}order`)
        .then((res) => {
          comandasNuevas.comandas = res.data;
          comandasNuevas.fecha = Date.now();
          res.status(200).json(comandasNuevas.comandas);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      res.status(200).json(comandasNuevas.comandas);
    }
  }
}
