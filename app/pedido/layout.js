"use client";
import { useState } from "react";

import { AiFillCaretUp } from "react-icons/ai";

import NavigationBar from "../components/NavigationBar";
import SwipeUpDownMenu from "../components/SwipeUpDownMenu";
import ItemProductoComanda from "./components/ItemProductoComanda";
import "./../../styles/globals.css";

export default function RootLayout({ children }) {
  const [update, setUpdate] = useState(false);
  return (
    <>
      <NavigationBar tituloActividad="Lista de productos" />
      {children}
      <SwipeUpDownMenu
        tituloMenu="Comanda Actual"
        iconoSuperior={AiFillCaretUp}
        onClick={() => setUpdate(!update)}
      >
        <ItemProductoComanda update={update} />
      </SwipeUpDownMenu>
    </>
  );
}
