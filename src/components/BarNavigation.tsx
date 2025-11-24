"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app/styles/layout/BarNavigation.scss";
import Link from "next/link";

function BarNavigation() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu(!openMenu);

  const cerrarSesion = () => {
    if (typeof window !== "undefined") {
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
      router.push("/");
    }
    setOpenMenu(false);
  };

  return (
    <nav className="barNavigation">
      <div className="menuToggle" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={openMenu ? "active" : ""}>
        <li className="subMenu" onClick={toggleMenu}>
          <Link href="/escaner" className="links">
            <span>Escanear</span>
          </Link>
        </li>
        <li className="subMenu" onClick={toggleMenu}>
          <Link href="/agregarEquipo" className="links">
            <span>Agregar equipo</span>
          </Link>
        </li>
        <li className="subMenu">
          <button className="logout-button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default BarNavigation;
//IO
