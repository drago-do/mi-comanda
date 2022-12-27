"use client";
import React from "react";
import { AiOutlineRollback, AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

import styles from "./../../styles/index/components.module.css";

export default function NavigationBar({ tituloActividad }) {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <div className={styles.NavigationBarContainer}>
      <div onClick={handleClick}>
        <AiOutlineRollback className={styles.NavigationBar__icon} />
      </div>
      <h3>{tituloActividad}</h3>
      <Link href="/">
        <AiOutlineHome className={styles.NavigationBar__icon} />
      </Link>
    </div>
  );
}
