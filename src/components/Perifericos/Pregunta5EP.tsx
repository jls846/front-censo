"use client";
import "./pregunta5EP.scss";
import styles from "./pregunta2EP.module.scss";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ToggleButton from "../Toggle/ToggleButton";

interface EquiposPoblacion {
  alumnos: string;
  profesores: string;
  tecnicosAcademicos: string;
  investigadores: string;
  administrativos: string;
  total: string;
}

export default function Pregunta5EP() {
  const [equipos, setEquipos] = useState<EquiposPoblacion>({
    alumnos: "0",
    profesores: "0",
    tecnicosAcademicos: "0",
    investigadores: "0",
    administrativos: "0",
    total: "0",
  });

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post(
        `${api_url}/equipos/reporte/contar_periferico_tipoUso/dijtales`,
        ["EN DESUSO", "EN USO"],
        {
          headers,
        }
      )
      .then((res) => {
        const data = res.data;

        const valores = {
          alumnos: "0",
          profesores: "0",
          tecnicosAcademicos: "0",
          investigadores: "0",
          administrativos: "0",
          total: "0",
        };

        data.forEach((item: any) => {
          const uso = item.uso.toUpperCase().trim();
          const total = item.total ?? "0";

          switch (uso) {
            case "ALUMNO":
            case "ALUMNOS":
              valores.alumnos = total;
              break;

            case "PROFESOR":
            case "PROFESORES":
              valores.profesores = total;
              break;

            case "TÉCNICO ACADEMICO":
            case "TÉCNICO ACADÉMICO":
              valores.tecnicosAcademicos = total;
              break;

            case "INVESTIGADOR":
            case "INVESTIGADORES":
              valores.investigadores = total;
              break;

            case "ADMINISTRATIVO":
            case "ADMINISTRATIVOS":
              valores.administrativos = total;
              break;
          }
        });

        // Calcular total general
        valores.total = String(
          Number(valores.alumnos) +
            Number(valores.profesores) +
            Number(valores.tecnicosAcademicos) +
            Number(valores.investigadores) +
            Number(valores.administrativos)
        );

        setEquipos(valores);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div className="container">
      <div className="pregunta-cuadro">
        Número de equipos de digitalización de acuerdo con la población
        universitaria.
        <ToggleButton />
      </div>

      <div className={styles.row_P2}>
        <div className={styles.item_P2}>
          <label htmlFor="alumnos">Alumnos</label>
          <input
            type="text"
            id="alumnos"
            name="alumnos"
            value={equipos.alumnos}
            disabled
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="profesores">Profesores</label>
          <input
            type="text"
            id="profesores"
            name="profesores"
            value={equipos.profesores}
            disabled
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="tecnicosAcademicos">Técnicos Académicos</label>
          <input
            type="text"
            id="tecnicosAcademicos"
            name="tecnicosAcademicos"
            value={equipos.tecnicosAcademicos}
            disabled
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="investigadores">Investigadores</label>
          <input
            type="text"
            id="investigadores"
            name="investigadores"
            value={equipos.investigadores}
            disabled
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="administrativos">Administrativos</label>
          <input
            type="text"
            id="administrativos"
            name="administrativos"
            value={equipos.administrativos}
            disabled
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="total">Total</label>
          <input
            type="text"
            id="total"
            name="total"
            value={equipos.total}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
