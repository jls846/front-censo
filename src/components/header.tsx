"use client";
import Image from "next/image";
import header from "../app/styles/layout/header.module.scss";
import Link from "next/link";
import BarNavigation from "./BarNavigation";
import BarNavigationAdmin from "./BarNavigationAdmin";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const publicNav = ["/escaner", "/agregarEquipo", "/editar", "/cambiarPass"];
  const privateNav = ["/equipoComputo", "/crearCuenta","/perifericos"];

  return (
    <header className={header.header}>
      <Link
        href="https://www.unam.mx/"
        target="_blank"
        className={header.center}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          className={header.logo}
          src="/logo-blanco.png"
          alt="Logo FES"
          width={250}
          height={70}
        />
      </Link>
      <div className={header.yellowPart}></div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          paddingLeft: "40px",
          maxHeight: "50%",
          alignItems: "end",
        }}
      >
        {publicNav.includes(pathname) && <BarNavigation />}
        {privateNav.includes(pathname) && <BarNavigationAdmin />}
      </div>
    </header>
  );
}

export default Header;
//IO
