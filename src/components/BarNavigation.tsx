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
      <div className={`menuToggle ${openMenu ? "" : ""}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={openMenu ? "active" : ""}>
        <li className="subMenu" onClick={toggleMenu}>
          <Link href="/QuitarSancion" className="links">
            <span>Quitar sanción</span>
          </Link>
        </li>
        <li className="subMenu" onClick={toggleMenu}>
          <Link href="/CambiarPass" className="links">
            <span> Cambiar contraseña</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default BarNavigation;
//IO
