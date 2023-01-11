"use client";
import Link from "next/link";
import "./../styles/globals.css";
import React from "react";


export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
