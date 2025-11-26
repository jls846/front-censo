"use client";

import { useState } from "react";
import Pregunta1 from "@/components/Equipo_Computo/Pregunta1";
import Pregutna2 from "@/components/Equipo_Computo/Pregunta2";
import Pregunta3 from "@/components/Equipo_Computo/Pregunta3";
import Pregunta7EP from "@/components/Perifericos/Pregunta7EP";
import Pregunta9 from "@/components/Equipo_Computo/Pregunta9";
import "../../styles/layout/reporte.scss";
import Pregunta8 from "@/components/Perifericos/Pregunta8";

type PreguntaKey =
  | "pregunta1"
  | "pregunta2"
  | "pregunta3"
  | "pregunta7EP"
  | "pregunta8"
  | "pregunta9";

const LABELS: Record<PreguntaKey, string> = {
  pregunta1: "Perfil de Usuario",
  pregunta2: "Sistema Operativo",
  pregunta3: "Plataforma y tipo procesador",
  pregunta7EP: "Laboratorios",
  pregunta8:"Proyectos",
  pregunta9: "Generales",
};

// Mapeo de fondo por pregunta (puedes personalizarlo)
const TAB_BACKGROUNDS: Record<PreguntaKey, string> = {
  pregunta1: "bg-gray",
  pregunta2: "bg-gray",
  pregunta3: "bg-gray",
  pregunta7EP: "bg-gray",
  pregunta8:"bg-gray",
  pregunta9: "bg-blue",
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<PreguntaKey>("pregunta1");

  const renderPregunta = () => {
    switch (activeTab) {
      case "pregunta1":
        return <Pregunta1 />;
      case "pregunta2":
        return <Pregutna2 />;
      case "pregunta3":
        return <Pregunta3 />;
      case "pregunta7EP":
        return <Pregunta7EP />
      case "pregunta8":
        return <Pregunta8 />;
      case "pregunta9":
        return <Pregunta9 />;
      default:
        return (
          <div className="p-6 text-center text-gray-500">
            Contenido no disponible aún.
          </div>
        );
    }
  };

  const currentBgClass = TAB_BACKGROUNDS[activeTab] || "bg-gray";

  return (
    <div className="scanView_reporte">
      <div className="container_reporte">
        <div className="main-content_reporte">
          <div className="tabs_reporte">
            {Object.entries(LABELS).map(([key, label]) => (
              <button
                key={key}
                className={`tab_reporte ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key as PreguntaKey)}
                aria-selected={activeTab === key}
                role="tab"
              >
                {label}
              </button>
            ))}
          </div>
          <div className={`data-table_reporte ${currentBgClass}`}>
            {renderPregunta()}
          </div>
        </div>
      </div>
    </div>
  );
}
