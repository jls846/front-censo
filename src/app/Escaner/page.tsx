"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BarcodeScanner from "../../components/BarcodeScanner";
import "../styles/layout/dashboard.scss";

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
      const nombre = prompt("Equipo no registrado. Ingresa el nombre:");
      if (nombre) {
        setEquipos([...equipos, { id: code, nombre, estado: "Disponible" }]);
        alert("Equipo agregado al inventario");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Dashboard Inventario Escolar</h2>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <div className="search-section">
        <h3>Buscar equipo</h3>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <input
            type="text"
            placeholder="ID o nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={buscarEquipo}>Buscar</button>
        </div>
      </div>

      <div className="scanner-section">
        <h3>Escanear código de barras</h3>
        <BarcodeScanner onDetected={handleScan} />
        {lastScan && (
          <p>
            Último código escaneado: <strong>{lastScan}</strong>
          </p>
        )}
      </div>

      <div className="equipos-section">
        <h3>Equipos</h3>
        <ul>
          {equipos.map((e) => (
            <li key={e.id}>
              <span>
                {e.id} - {e.nombre}
              </span>
              <span
                className={
                  e.estado === "Disponible"
                    ? "estado-disponible"
                    : "estado-reparacion"
                }
              >
                {e.estado}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
