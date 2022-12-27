import Link from "next/link";
import "./../../styles/globals.css";
import NavigationBar from "./../components/NavigationBar";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <NavigationBar tituloActividad="Inicia Sesión" />
        {children}
      </body>
    </html>
  );
}
