"use client";
import { useState } from "react";
import "../app/styles/layout/BarNavigation.scss";
import Link from "next/link";

function BarNavigation() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const toggleSubMenu = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth <= 800) {
      setOpenSubMenu(openSubMenu === index ? null : index);
    }
  };

  return (
    <nav className="barNavigation">
      <div className="menuToggle" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={openMenu ? "active" : ""}>
        <li className={`subMenu ${openSubMenu === 0 ? "open" : ""}`}>
          <span onClick={() => toggleSubMenu(0)}>Equipo</span>
          <ul onClick={toggleMenu}>
            <Link href="/CrearGrupo" className="links">
              <li>Crear Grupo</li>
            </Link>
            <Link href="/Scanner" className="links">
              <li>Scanner</li>
            </Link>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default BarNavigation;
