"use client";
import "./pregunta5EP.scss";
import styles from "./pregunta2EP.module.scss";
import { useEffect, useState } from "react";

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
      alumnos: "35",
      profesores: "43",
      tecnicosAcademicos: "",
      investigadores: "",
      administrativos: "302",
      total: "380",
    });
  
    // Listo para conectar al backend
    useEffect(() => {
      /*
      fetch("https://tu-api-backend.com/api/equipos-poblacion")
        .then((res) => res.json())
        .then((data) => setEquipos(data))
        .catch((err) => console.error("Error al obtener datos:", err));
      */
    }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEquipos((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  return (
    <div className="container">

      <div className="pregunta-cuadro">
        Número de equipos de digitalización de acuerdo con la
        población universitaria.
      </div>

            <div className={styles.row_P2}>
        <div className={styles.item_P2}>
          <label htmlFor="alumnos">Alumnos</label>
          <input
            type="text"
            id="alumnos"
            name="alumnos"
            value={equipos.alumnos}
            onChange={handleChange}
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="profesores">
            Profesores
          </label>
          <input
            type="text"
            id="profesores"
            name="profesores"
            value={equipos.profesores}
            onChange={handleChange}
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="tecnicosAcademicos">Técnicos Académicos</label>
          <input
            type="text"
            id="tecnicosAcademicos"
            name="tecnicosAcademicos"
            value={equipos.tecnicosAcademicos}
            onChange={handleChange}
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="investigadores">
            Investigadores
          </label>
          <input
            type="text"
            id="investigadores"
            name="investigadores"
            value={equipos.investigadores}
            onChange={handleChange}
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="administrativos">
            Administrativos 
          </label>
          <input
            type="text"
            id="administrativos"
            name="administrativos"
            value={equipos.administrativos}
            onChange={handleChange}
          />
        </div>

        <div className={styles.item_P2}>
          <label htmlFor="total">Total</label>
          <input
            type="text"
            id="total"
            name="total"
            value={equipos.total}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
