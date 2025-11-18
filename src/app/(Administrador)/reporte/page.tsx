"use client";

import { useState } from "react";
import Pregunta1 from "@/components/Equipo_Computo/Pregunta1";
import Pregunta1_1 from "@/components/Equipo_Computo/Pregunta1_1";
import Pregunta2 from "@/components/Equipo_Computo/Pregunta2";
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
  | "pregunta1_1"
  | "pregunta1"
  | "pregunta1EP"
  | "pregunta2"
  | "pregunta2_1"
  | "pregunta2EP"
  | "pregunta3"
  | "pregunta3_1"
  | "pregunta3_2"
  | "pregunta3_3"
  | "pregunta3_4"
  | "pregunta3_5"
  | "pregunta4EP"
  | "pregunta7"
  | "pregunta7EP"
  | "pregunta9";

const LABELS: Record<PreguntaKey, string> = {
  pregunta1_1: "Pregunta 1.1 ",
  pregunta1: "Pregunta 1",
  pregunta1EP: "Pregunta 1 EP",
  pregunta2: "Pregunta 2",
  pregunta2_1: "Pregunta 2.1",
  pregunta2EP: "Pregunta 2 EP",
  pregunta3: "Pregunta 3",
  pregunta3_1: "Pregunta 3.1",
  pregunta3_2: "Pregunta 3.2",
  pregunta3_3: "Pregunta 3.3",
  pregunta3_4: "Pregunta 3.4",
  pregunta3_5: "Pregunta 3.5",
  pregunta4EP: "Pregunta 4 EP",
  pregunta7: "Pregunta 7",
  pregunta7EP: "Pregunta 7 EP",
  pregunta9: "Pregunta 9",
};

// Mapeo de fondo por pregunta (puedes personalizarlo)
const TAB_BACKGROUNDS: Record<PreguntaKey, string> = {
  pregunta1: "bg-blue",
  pregunta1_1: "bg-gray",
  pregunta1EP: "bg-gray",
  pregunta2: "bg-gray",
  pregunta2_1: "bg-gray",
  pregunta2EP: "bg-gray",
  pregunta3: "bg-gray",
  pregunta3_1: "bg-gray",
  pregunta3_2: "bg-gray",
  pregunta3_3: "bg-gray", 
  pregunta3_4: "bg-gray",
  pregunta3_5: "bg-gray",
  pregunta4EP: "bg-gray",
  pregunta7: "bg-gray",
  pregunta7EP: "bg-gray",
  pregunta9: "bg-blue",
};

export default function Reporte() {
  const [activeTab, setActiveTab] = useState<PreguntaKey>("pregunta1");

  const renderPregunta = () => {
    switch (activeTab) {
      case "pregunta1_1":
        return <Pregunta1_1 />;
      case "pregunta1":
        return <Pregunta1 />;
      case "pregunta1EP":
        return <Pregunta1EP />;
      case "pregunta2":
        return <Pregunta2 />;
      case "pregunta2_1":
        return <Pregunta2_1 />;
      case "pregunta2EP":
        return <Pregunta2EP />;  
      case "pregunta3":
        return <Pregunta3 />;
      case "pregunta3_1":
        return <Pregunta3_1 />;
      case "pregunta3_2":
        return <Pregunta3_2 />;
      case "pregunta3_3":
        return <Pregunta3_3 />;
      case "pregunta3_4":
        return <Pregunta3_4 />;
      case "pregunta3_5":
        return <Pregunta3_5 />;
      case "pregunta4EP":
        return <Pregunta4EP />;
      case "pregunta7":
        return <Pregunta7 />;
      case "pregunta7EP":
        return <Pregunta7EP />;
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