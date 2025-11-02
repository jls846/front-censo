"use client";
import Image from "next/image";
import header from "../app/styles/layout/header.module.scss";
import Link from "next/link";
import BarNavigation from "./BarNavigation";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const rutasConBar = ["/Escaner", "/AgregarEquipo","/reporte"];

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
        {rutasConBar.includes(pathname) && <BarNavigation />}
      </div>
    </header>
  );
}

export default Header;
//IO
