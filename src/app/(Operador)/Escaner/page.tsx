"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/layout/escaner.scss"; // Importación global
import BarcodeScanner from "@/components/BarcodeScanner";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [equipos, setEquipos] = useState();
  const [search, setSearch] = useState("");
  const [lastScan, setLastScan] = useState<string | null>(null);

  const buscarEquipo = async () => {
    const encontrado = await axios.get("");

    if (encontrado) {
      // Redirige a la vista de edición con el ID del equipo
      router.push(`/Editar?equipoId=${encontrado.id}`);
    } else {
      alert("Equipo no encontrado.");
    }
  };

  const handleScan = async (code: string) => {
    setLastScan(code);
    setIsScanning(false);

    const encontrado = await axios.get("");

    if (encontrado) {
      router.push(`/Editar?equipoId=${encontrado.id}`);
    } else {
<<<<<<< HEAD
      router.push(`/AgregarEquipo?equipoId=${code}`);
=======
      // 🚫 Si no existe, se puede registrar
      router.push(`/AgregarEquipo`);
>>>>>>> 8457542e8b63924894ebfa2f3148c3bc24a14a59
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
