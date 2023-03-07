import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = "http://localhost:3000";

  if (pathname === "/sesion") {
    //Si la cookie "id" existe, entonces redirigir a /pedido
    if (req.cookies.has("id")) {
      return NextResponse.redirect(`${host}/pedido`);
    }
  }
  if (pathname.startsWith("/pedido")) {
    //Si la cookie "id" no existe, entonces redirigir a /sesion
    if (!req.cookies.has("id")) {
      return NextResponse.redirect(`${host}/sesion`);
    }
  }
}
