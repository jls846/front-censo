"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BarcodeScanner from "@/components/BarcodeScanner";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import "../../styles/layout/escaner.scss";

export default function Page() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [search, setSearch] = useState("");

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const buscarEquipo = async () => {
    if (!search) return toast.error("Ingresa un número de inventario");
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const { data } = await axios.get(`${api_url}/equipos/buscar/${search}`, {
        headers,
      });

      if (data) {
        router.push(`/editar?equipoId=${data.inventario}`);
      } else {
        router.push(`/agregarEquipo?equipoId=${data.inventario}`);
      }
    } catch (error) {
      toast.error("Error No se encontro el equipo");
      router.push(`/agregarEquipo?equipoId=${search}`);
    }
  };

  const handleScan = async (code: string) => {
    setIsScanning(false);

    if (!code) return;
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const { data } = await axios.get(`${api_url}/equipos/buscar/${code}`, {
        headers,
      });

      if (data) {
        router.push(`/editar?equipoId=${data.inventario}`);
      } else {
        router.push(`/agregarEquipo?equipoId=${data.inventario}`);
      }
    } catch (error) {
      toast.error("Error No se encontro el equipo");
      router.push(`/agregarEquipo?equipoId=${code}`);
    }
    toast(`${code}`);
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
          <Image src="/photo_camera.png" alt="cámara" width={20} height={20} />
          {isScanning ? "Cancelar" : "Escanear"}
        </button>

        <div className="searchBox">
          <input
            type="text"
            placeholder="Buscar por inventario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={buscarEquipo} className="searchButton">
            <Image src="/search.png" alt="Buscar" width={50} height={50} />
          </button>
        </div>
      </main>
    </div>
  );
}
