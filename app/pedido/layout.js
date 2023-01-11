import Link from "next/link";
import "./../../styles/globals.css";
import NavigationBar from "../components/NavigationBar";

export default function RootLayout({ children }) {
  return (
    <>
      <NavigationBar tituloActividad="Lista de productos" />
      {children}
    </>
  );
}
