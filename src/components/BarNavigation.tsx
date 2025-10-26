"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Importa useRouter
import "../app/styles/layout/BarNavigation.scss";
import Link from "next/link";

function BarNavigation() {
  const router = useRouter(); // ✅ Para redirigir
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const toggleSubMenu = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth <= 800) {
      setOpenSubMenu(openSubMenu === index ? null : index);
    }
  };

  const cerrarSesion = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("loggedIn");
      router.push("/"); // ✅ Redirige al inicio
    }
    setOpenMenu(false); // Cierra menú móvil
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
          <Link href="/Escaner" className="links">
            <span>Escanear</span>
          </Link>
        </li>
        <li className="subMenu" onClick={toggleMenu}>
          <Link href="/AgregarEquipo" className="links">
            <span>Agregar equipo</span>
          </Link>
        </li>
        {/* ✅ Botón directo, sin onClick en el <li> */}
        <li>
          <button className="logout-button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default BarNavigation;