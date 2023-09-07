import React from "react";
import NavigationBar from "../../components/NavigationBar";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Container, Avatar, ListItemAvatar } from "@mui/material";
import Link from "next/link";

export default function index() {
  return (
    <div className="h-screen pt-20">
      <NavigationBar ownPathName="Configuraciones" />
      <Container>
        <ListItem
          icon={<AccountCircleIcon />}
          mainText={"Configuración de tu perfil"}
          secondaryText={"Cambio de contraseña, foto..."}
          link={"/configuracion/perfil"}
        />
        <ListItem
          icon={<ShoppingBagIcon />}
          mainText={"Configuración de productos"}
          secondaryText={"Añadir categorias, productos, modificar..."}
          link={"/configuracion/productos"}
        />
        <ListItem
          icon={<DeleteSweepIcon />}
          mainText={"Eliminar datos"}
          secondaryText={"Elimina datos temporales, cache..."}
          link={"/configuracion/eliminar"}
        />
      </Container>
    </div>
  );
}

const ListItem = ({ icon, mainText, secondaryText, link }) => {
  return (
    <Link href={link}>
      <div class="flex items-center space-x-4 my-5">
        <div class="flex-shrink-0">
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "#fff", color: "#000" }}>
              {icon}
            </Avatar>
          </ListItemAvatar>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xl font-medium text-gray-900 truncate dark:text-white">
            {mainText}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            {secondaryText}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <ArrowForwardIosIcon />
        </div>
      </div>
    </Link>
  );
};
