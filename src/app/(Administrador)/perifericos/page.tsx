"use client";

import { useState } from "react";
import Pregunta1 from "@/components/Equipo_Computo/Pregunta1";
import Pregunta1_1 from "@/components/Equipo_Computo/Pregunta1_1";
import Pregunta2_1 from "@/components/Equipo_Computo/Pregunta2_1";
import Pregunta3 from "@/components/Equipo_Computo/Pregunta3";
import Pregunta3_1 from "@/components/Equipo_Computo/Pregunta3_1";
import Pregunta3_2 from "@/components/Equipo_Computo/Pregunta3_2";
import Pregunta3_3 from "@/components/Equipo_Computo/Pregunta3_3";
import Pregunta3_4 from "@/components/Equipo_Computo/Pregunta3_4";
import Pregunta3_5 from "@/components/Equipo_Computo/Pregunta3_5";
import Pregunta7 from "@/components/Equipo_Computo/Pregunta7";
import Pregunta1EP from "@/components/Perifericos/Pregunta1EP";
import Pregunta2EP from "@/components/Perifericos/Pregunta2EP";
import Pregunta4EP from "@/components/Perifericos/Pregunta4EP";
import Pregunta7EP from "@/components/Perifericos/Pregunta7EP";
import Pregunta9 from "@/components/Equipo_Computo/Pregunta9";
import "../../styles/layout/reporte.scss";

type PreguntaKey =
  | "pregunta1EP"
  | "pregunta2EP"
  | "pregunta4EP"
  | "pregunta7"

const LABELS: Record<PreguntaKey, string> = {
  pregunta1EP: "Pregunta 1 EP",
  pregunta2EP: "Pregunta 2 EP",
  pregunta4EP: "Pregunta 4 EP",
  pregunta7: "Pregunta 7",
};

// Mapeo de fondo por pregunta (puedes personalizarlo)
const TAB_BACKGROUNDS: Record<PreguntaKey, string> = {
  pregunta1EP: "bg-gray",
  pregunta2EP: "bg-gray",
  pregunta4EP: "bg-gray",
  pregunta7: "bg-gray",
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<PreguntaKey>("pregunta1EP");

  const renderPregunta = () => {
    switch (activeTab) {
      case "pregunta1EP":
        return <Pregunta1EP />;
      case "pregunta2EP":
        return <Pregunta2EP />;  
      case "pregunta4EP":
        return <Pregunta4EP />;
      case "pregunta7":
        return <Pregunta7 />;
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