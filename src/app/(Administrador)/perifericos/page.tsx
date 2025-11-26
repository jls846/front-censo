"use client";

import { useState } from "react";
import Pregunta7 from "@/components/Equipo_Computo/Pregunta7";
import Pregunta1EP from "@/components/Perifericos/Pregunta1EP";
import Pregunta2EP from "@/components/Perifericos/Pregunta2EP";
import Pregunta4EP from "@/components/Perifericos/Pregunta4EP";
import Pregunta5EP from "@/components/Perifericos/Pregunta5EP";
import "../../styles/layout/reporte.scss";
import DownloadReporteXLSX from "@/components/Dowload/Reporte";

type PreguntaKey = "pregunta1" | "pregunta4" | "pregunta7";

const LABELS: Record<PreguntaKey, string> = {
  pregunta1: "Impresoras",
  pregunta4: "Digitales",
  pregunta7: "Antiguedad",
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<PreguntaKey>("pregunta1");

  const renderPregunta = () => {
    switch (activeTab) {
      case "pregunta1":
        return (
          <>
            <Pregunta1EP />
            <Pregunta2EP />
          </>
        );
      case "pregunta4":
        return (
          <>
            <Pregunta4EP />
            <Pregunta5EP />
          </>
        );
      case "pregunta7":
        return (
          <>
            <Pregunta7 />
            <DownloadReporteXLSX/>
          </>
        );
      default:
        return (
          <div className="p-6 text-center text-gray-500">
            Contenido no disponible aún.
          </div>
        );
    }
  };

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
          <div className={`data-table_reporte`}>{renderPregunta()}</div>
        </div>
      </div>
    </div>
  );
}
