import React from "react";
import { useState, useEffect } from "react";
import Router from "next/router";
import {
  Typography,
  Container,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import NavigationBar from "../../components/NavigationBar";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useComandasGlobales } from "../../hooks/useComandasGlobales";
import { useProductos } from "../../hooks/useProductos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

//Obtener variable de entorno
const API_URL = process.env.API_URL;

export default function corte() {
  const { obtenerComandasGlobales } = useComandasGlobales();
  const { productos, getProducts } = useProductos();

  const [comandasGlobales, setComandasGlobales] = useState([]);
  const [totalComandas, setTotalComandas] = useState(null);
  const [totalVentas, setTotalVentas] = useState(null);
  const [cortePendiente, setCortePendiente] = useState(true);

  useEffect(() => {
    getProducts();
    obtenerComandasGlobales().then((comandas) => setComandasGlobales(comandas));
  }, []);

  useEffect(() => {
    setTotalComandas(comandasGlobales.length);
    //Sumar totales de cada comanda para saber el total de venta
    setTotalVentas(obtenerTotal());
  }, [comandasGlobales]);

  const obtenerTotal = () => {
    let total;
    total = comandasGlobales.map((comanda) => {
      return comanda.total;
    });
    total = total.reduce((a, b) => a + b, 0);
    return total;
  };

  function obtenerDiaDeLaSemana(fecha) {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const fechaDate = new Date(fecha);
    const diaDeLaSemana = fechaDate.getDay();
    return diasSemana[diaDeLaSemana];
  }

  const sendDaySales = () => {
    let data = {
      dateTime: new Date(), // Esto generará un nuevo objeto Date con la fecha y hora actual
      dayName: obtenerDiaDeLaSemana(new Date()),
      daySale: comandasGlobales,
    };

    //Enviar post a API_URL+"/daySale"
    axios({ method: "post", url: `${API_URL}daySales`, data })
      .then((response) => {
        console.log(response);
        setCortePendiente(false);
        setTimeout(() => {
          Router.push("/");
        }, 5000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="h-screen pt-20">
        <NavigationBar />
        {cortePendiente ? (
          <Container maxWidth="md" className="h-full">
            <Typography variant="h4">Corte de venta</Typography>
            <Container
              maxWidth="md"
              style={{ border: "solid 1px rgba(255,255,255,0.2)" }}
              className=" my-7 rounded-md overflow-y-auto flex flex-col justify-between h-5/6 max-h-5/6"
            >
              {comandasGlobales && comandasGlobales.length > 0 ? (
                <>
                  <div
                    style={{
                      height: "80%",
                      maxHeight: "80%",
                      border: "solid 1px rgba(255,255,255,0.2)",
                    }}
                    className="overflow-x-auto pb-5"
                  >
                    {comandasGlobales.map((comanda, index) => {
                      return (
                        <CloseList
                          key={index}
                          number={index}
                          total={comanda.total}
                          tableName={comanda.tableName}
                          detailsOrder={comanda.products}
                        />
                      );
                    })}
                  </div>
                  <section className="flex flex-nowrap justify-between h-12 rounded-md p-2">
                    <div>
                      Total:{" "}
                      <span className="text-green-500 mr-4 font-semibold">
                        $ {totalVentas}
                      </span>
                    </div>
                    <div>
                      Mesas: <span>{totalComandas}</span>
                    </div>
                  </section>
                  <Button variant="contained" onClick={sendDaySales}>
                    Hacer corte
                  </Button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <LoadingAnimation />
                </div>
              )}
            </Container>
          </Container>
        ) : (
          <Typography variant="h3">Corte Realizado</Typography>
        )}
      </div>
    </ThemeProvider>
  );
}

const CloseList = ({ number, total, tableName, detailsOrder }) => {
  const { getProductNameById } = useProductos();
  const [listOfProducts, setListOfProducts] = useState(null);

  useEffect(() => {
    if (detailsOrder) {
      getList().then((response) => {
        setListOfProducts(response);
      });
    }
  }, [detailsOrder]);

  const getList = async () => {
    const promises = detailsOrder.map(async (element) => {
      let pro = {
        name: await getProductNameById(element.id_mongo),
        price: element.price,
      };
      return pro;
    });

    // Esperar a que todas las promesas se resuelvan
    const resolvedProducts = await Promise.all(promises);

    return resolvedProducts;
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <span className="mr-2">{number + 1}.-</span>
          <span className="text-green-500 mr-4 font-semibold">$ {total}</span>
          {tableName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails color="secondary">
        {listOfProducts &&
          listOfProducts.map((element, index) => {
            return (
              <Typography key={index}>
                {element.name}
                <span className="text-green-500 mx-8 font-semibold">
                  $ {element.price}
                </span>
              </Typography>
            );
          })}
      </AccordionDetails>
    </Accordion>
  );
};
