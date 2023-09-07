import React from "react";
import { useEffect, useState } from "react";

import Link from "next/link";
import Cookies from "js-cookie";

import ListaComandasGlobales from "../components/ListaComandasGlobales";
import NavigationBar from "../components/NavigationBar";
import SwipeUpDownMenu from "../components/SwipeUpDownMenu";

import { useComandaActual } from "../hooks/useComandaActual";

import styles from "./../styles/index/index.module.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Page() {
  const { enviarNuevaComanda } = useComandaActual();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    enviarNuevaComanda();
    document.oncontextmenu = new Function("return false;");
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavigationBar />
        <div className={styles.container}>
          <div className={styles.containerLogo}>
            <Link
              style={{
                filter: "drop-shadow(10px 10px 50px rgba(255, 255, 255, 0.5))",
              }}
              href="./sesion/iniciarSesion"
            >
              <img src="/logo.png" alt="Logo" className={styles.logo} />
            </Link>
          </div>
        </div>
        <div onClick={handleUpdate}>
          <SwipeUpDownMenu>
            <ListaComandasGlobales update={update} />
          </SwipeUpDownMenu>
        </div>
      </ThemeProvider>
    </>
  );
}
