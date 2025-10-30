"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/layout/escaner.scss";
import BarcodeScanner from "@/components/BarcodeScanner";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [search, setSearch] = useState("");

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const buscarEquipo = async () => {
    if (!search) return toast.error("Ingresa un número de inventario");

    try {
      const { data } = await axios.get(`${api_url}/equipos/${search}`);

      if (data) {
        router.push(`/Editar?equipoId=${data.id}`);
      } else {
        toast.error("Equipo no encontrado");
      }
    } catch (error) {
      toast.error("Equipo no encontrado");
    }
  };

  const handleScan = async (code: string) => {
    setIsScanning(false);

    if (!code) return;

    try {
      const { data } = await axios.get(`${api_url}/equipos/${code}`);

      if (data) {
        router.push(`/Editar?equipoId=${data.id}`);
      } else {
        router.push(`/AgregarEquipo?equipoId=${code}`);
      }
    } catch (error) {
      router.push(`/AgregarEquipo?equipoId=${code}`);
    }
  };

<<<<<<< HEAD
  //  Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("loggedIn");
    router.push("/");
  };

=======
>>>>>>> c46e561af1c3cf0aa2835fee6eec718099d403cd
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
