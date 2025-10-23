"use client";
import Image from "next/image";
import header from "../app/styles/components/header.module.scss";
import Link from "next/link";
import BarNavigation from "./BarNavigation";

function Header() {
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
          src="/logo_fes.png"
          alt="Logo FES"
          width={200}
          height={50}
        />
      </Link>
      <div className={header.yellowPart}></div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginLeft: "40px",
          marginTop: "45px",
          maxHeight: "50%",
          alignItems: "end",
        }}
        className=""
      >
        <BarNavigation />
      </div>
    </header>
  );
}

export default Header;
//IO