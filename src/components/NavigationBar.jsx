import React from "react";
import { HiArrowLeft, HiHome } from "react-icons/hi";
import Link from "next/link";

import styles from "./../styles/index/components.module.css";

export default function NavigationBar({ tituloActividad }) {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <div className={styles.NavigationBarContainer}>
      <div onClick={handleClick}>
        <HiArrowLeft className={styles.NavigationBar__icon} />
      </div>
      <Link href={"/pedido/iniciarPedido"}>{tituloActividad}</Link>
      <Link href="/">
        <HiHome className={styles.NavigationBar__icon} />
      </Link>
    </div>
  );
}
