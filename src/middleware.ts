import { NextRequest, NextResponse } from "next/server";

const HOST_ULR = process.env.HOST_ULR;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/sesion/iniciarSesion") {
    //Si la cookie "id" existe, entonces redirigir a /pedido
    if (req.cookies.has("id")) {
      return NextResponse.redirect(`${HOST_ULR}/pedido/iniciarPedido`);
    }
  }
  if (pathname.startsWith("/pedido/iniciarPedido")) {
    //Si la cookie "id" no existe, entonces redirigir a /sesion
    if (!req.cookies.has("id")) {
      return NextResponse.redirect(`${HOST_ULR}/sesion/iniciarSesion`);
    }
  }
}
