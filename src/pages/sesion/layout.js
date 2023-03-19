import Link from "next/link";
import NavigationBar from "../../components/NavigationBar";

export default function RootLayout({ children }) {
  return (
    <>
      <NavigationBar tituloActividad="Inicia Sesión" />
      {children}
    </>
  );
}
