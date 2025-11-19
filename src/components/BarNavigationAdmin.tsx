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
      localStorage.removeItem("loggedIn");
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
          <Link href="/crearCuenta" className="links">
            <span>Crear Cuenta</span>
          </Link>
        </li>
        {/* <li className="subMenu" onClick={toggleMenu}>
          <Link href="/cambiarPass" className="links">
            <span>Cambiar Contraseña</span>
          </Link>
        </li> */}
        <li className="subMenu" onClick={toggleMenu}>
          <Link href="/reporte" className="links">
            <span>Reporte</span>
          </Link>
        </li>
                <li className="subMenu" onClick={toggleMenu}>
          <Link href="/perifericos" className="links">
            <span>Perifericos</span>
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
