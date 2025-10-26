"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/layout/escaner.scss"; // Importación global

// Tipos
type Equipo = {
  id: string;
  nombre: string;
  estado: string;
};

const initialEquipos: Equipo[] = [
  { id: "001", nombre: "PC Aula 1", estado: "Disponible" },
  { id: "002", nombre: "PC Aula 2", estado: "En reparación" },
];

export default function Dashboard() {
  const router = useRouter();
  const [equipos, setEquipos] = useState<Equipo[]>(initialEquipos);
  const [search, setSearch] = useState("");
  const [lastScan, setLastScan] = useState("");

  const buscarEquipo = () => {
    const resultado = equipos.filter(
      (e) =>
        e.id.includes(search) ||
        e.nombre.toLowerCase().includes(search.toLowerCase())
    );
    setEquipos(resultado);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("loggedIn");
    router.push("/");
  };

  const handleScan = (code: string) => {
    setLastScan(code);
    const encontrado = equipos.find((e) => e.id === code);
    if (encontrado) {
      alert(`Equipo encontrado: ${encontrado.nombre} (${encontrado.estado})`);
    } else {
      const codigo = prompt("Equipo no registrado. Ingresa el codigo:");
      if (codigo) {
        setEquipos([...equipos, { id: code, nombre: codigo, estado: "Disponible" }]);
        alert("Equipo agregado al inventario");
      }
    }
  };

  return (
    <div className="dashboardContainer">

      {/* VISTA DE ESCANEO */}
      <main className="scanView">
        <h3>Escanear Inventario</h3>

        <div className="scannerFrame">
          <img src="/barcode_scanner.png" alt="Marco de escaneo" />
        </div>

        <p className="instructions">
          Enfoca el código de barras dentro del marco
        </p>

        <button className="scanButton">
          <img src="/photo_camera.png" alt="camara" /> Escanear
        </button>

        <div className="searchBox">
          <input
            type="text"
            placeholder="Buscar por inventario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={buscarEquipo} className="searchButton">
            <img src="/search.png" alt="Buscar" />
          </button>
        </div>
      </main>
    </div>
  );
}