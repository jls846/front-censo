"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/layout/escaner.scss"; // Importación global
import BarcodeScanner from "@/components/BarcodeScanner";

type Equipo = {
  id: string;
  marca: string;
  estado: string;
};

const initialEquipos: Equipo[] = [
  { id: "E0030463", marca: "Dell", estado: "Activo" },
  { id: "E0030464", marca: "HP", estado: "Desactivado" },
];

export default function Dashboard() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [equipos, setEquipos] = useState(initialEquipos);
  const [search, setSearch] = useState("");
  const [lastScan, setLastScan] = useState<string | null>(null);

  // 🔍 Buscar equipo manualmente
  const buscarEquipo = () => {
    const encontrado = equipos.find(
      (e) =>
        e.id === search.trim() ||
        e.marca.toLowerCase() === search.trim().toLowerCase()
    );

    if (encontrado) {
      // Redirige a la vista de edición con el ID del equipo
      router.push(`/Editar?equipoId=${encontrado.id}`);
    } else {
      alert("Equipo no encontrado.");
    }
  };

  // 📷 Cuando se escanea un código de barras
  const handleScan = (code: string) => {
    setLastScan(code);
    setIsScanning(false);

    const encontrado = equipos.find((e) => e.id === code);

    if (encontrado) {
      router.push(`/Editar?equipoId=${encontrado.id}`);
    } else {
      // 🚫 Si no existe, se puede registrar
<<<<<<< HEAD:src/app/Escaner/page.tsx
      const marca = prompt("Equipo no registrado. Ingresa la marca:");
      if (marca) {
        const nuevoEquipo = { id: code, marca, estado: "Desactivado" };
        setEquipos([...equipos, nuevoEquipo]);
        alert("Equipo agregado al inventario");
      }
=======
      router.push(`/AgregarEquipo`);
>>>>>>> 374ce02350db05430bc40286bdff9fe767e82eae:src/app/(Operador)/Escaner/page.tsx
    }
  };

  // 🔒 Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("loggedIn");
    router.push("/");
  };

  return (
    <div className="dashboardContainer">
      <main className="scanView">
        <h3>Escanear Inventario</h3>

        {isScanning ? (
          <BarcodeScanner onScan={handleScan} />
        ) : (
          <div className="scannerFrame">
            <img src="/barcode_scanner.png" alt="Marco de escaneo" />
          </div>
        )}

        <p className="instructions">
          {isScanning
            ? "Enfoca el código de barras dentro del marco"
            : "Presiona el botón para escanear"}
        </p>

        <button
          className="scanButton"
          onClick={() => setIsScanning(!isScanning)}
        >
          <img src="/photo_camera.png" alt="cámara" />
          {isScanning ? "Cancelar" : "Escanear"}
        </button>

        {/* 🔍 Búsqueda manual */}
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
