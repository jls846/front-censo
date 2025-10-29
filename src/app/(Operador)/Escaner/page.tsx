"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/layout/escaner.scss"; // Importación global
import BarcodeScanner from "@/components/BarcodeScanner";
import axios from "axios";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [search, setSearch] = useState("");

  interface equipo {
    id: number;
  }

  const buscarEquipo = async () => {
    const encontrado: equipo = await axios.get("");

    if (encontrado) {
      // Redirige a la vista de edición con el ID del equipo
      router.push(`/Editar?equipoId=${encontrado.id}`);
    } else {
      alert("Equipo no encontrado.");
    }
  };

  const handleScan = async (code: string) => {
    setIsScanning(false);

    const encontrado: equipo = await axios.get("");

    if (encontrado) {
      router.push(`/Editar?equipoId=${encontrado.id}`);
    } else {
      router.push(`/AgregarEquipo?equipoId=${code}`);
    }
  };

  return (
    <div className="dashboardContainer">
      <main className="scanView">
        <h3>Escanear Inventario</h3>

        {isScanning ? (
          <BarcodeScanner onScan={handleScan} />
        ) : (
          <div className="scannerFrame">
            <Image
              src="/barcode_scanner.png"
              alt="Marco de escaneo"
              width={200}
              height={200}
            />
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
