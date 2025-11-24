import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const permisos: Record<number, string[]> = {
  1: ["/crearCuenta", "/equipoComputo", "/perifericos","/escaner", "/agregarEquipo", "/editar"],
  2: ["/escaner", "/agregarEquipo", "/editar"],
};

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decoded: any = jwtDecode(token);
  const tipoUsuario = decoded.tipoUsuario

  if (!tipoUsuario) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const pathname = new URL(request.url).pathname;

  const rutasPermitidas = permisos[tipoUsuario] ?? [];

  if (!rutasPermitidas.includes(pathname)) {
    console.log(`Usuario tipo ${tipoUsuario} NO autorizado para: ${pathname}`);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/escaner",
    "/agregarEquipo",
    "/editar",
    "/crearCuenta",
    "/equipoComputo",
    "/perifericos",
  ],
};
//IO
