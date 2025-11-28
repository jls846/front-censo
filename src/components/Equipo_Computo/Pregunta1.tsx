"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import style from "./pregunta1_1.module.scss";
import ToggleButton from "../Toggle/ToggleButton";

type RawEntry = {
  uso: string;
  categoria: string;
  total: string;
};

const USO_INDEX: Record<string, number> = {
  ALUMNO: 0,
  PROFESOR: 1,
  "TÉCNICO ACADEMICO": 2,
  INVESTIGADOR: 3,
  ADMINISTRATIVO: 4,
};

const CATEGORIA_MAP: Record<string, { tabla: number; so: string }> = {
  "ESCRITORIO PC": { tabla: 0, so: "Windows" },
  "ESCRITORIO MAC OS": { tabla: 0, so: "Mac OS" },
  "ESCRITORIO LINUX": { tabla: 0, so: "Linux" },
  "PORTÁTILES WINDOWS": { tabla: 2, so: "Windows" },
  "PORTÁTILES MAC OS": { tabla: 2, so: "Mac OS" },
  "TABLETA iPAD OS": { tabla: 1, so: "Mac OS" },
  SERVIDOR: { tabla: 3, so: "Linux" },
};

const TITULOS_TABLAS = [
  "Computadoras de escritorio",
  "Tabletas",
  "Computadoras portátiles",
  "Alto rendimiento",
];

const SISTEMAS_OPERATIVOS = ["Windows", "Linux", "Mac OS"];

export default function Pregunta1() {
  const [tablas, setTablas] = useState<number[][][]>(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 3 }, () => Array(5).fill(0))
    )
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token no encontrado");
      setLoading(false);
      return;
    }

    axios
      .post<RawEntry[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/equipos/reporte/tipoEquipos_tipoUso`,
        ["EN DESUSO", "EN USO"],
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const nuevaTablas = Array.from({ length: 4 }, () =>
          Array.from({ length: 3 }, () => Array(5).fill(0))
        );

        for (const item of res.data) {
          const categoria = item.categoria.trim();
          const mapping = CATEGORIA_MAP[categoria];
          if (!mapping) continue;

          const { tabla, so } = mapping;
          const soIndex = SISTEMAS_OPERATIVOS.indexOf(so);
          if (soIndex === -1) continue;

          const usoIndex = USO_INDEX[item.uso];
          if (usoIndex === undefined) continue;

          const total = parseInt(item.total) || 0;
          nuevaTablas[tabla][soIndex][usoIndex] = total;
        }

        setTablas(nuevaTablas);
      })
      .catch((err) => console.error("Error al cargar datos", err))
      .finally(() => setLoading(false));
  }, []);

  const renderTabla = (tablaIndex: number) => {
    const datosSO = tablas[tablaIndex];

    const totalesColumnas = Array(5).fill(0);
    for (let soIndex = 0; soIndex < 3; soIndex++) {
      for (let col = 0; col < 5; col++) {
        totalesColumnas[col] += datosSO[soIndex][col];
      }
    }

    const totalGeneral = totalesColumnas.reduce((a, b) => a + b, 0);

    return (
      <div className={style["tabla-contenedor"]} key={tablaIndex}>
        <table className={style.tabla}>
          <thead>
            <tr>
              <th className={style["azul-marino"]}>
                {TITULOS_TABLAS[tablaIndex]}
              </th>
              <th className={style["rosa-fuerte"]}>Alumnos</th>
              <th className={style["rosa-fuerte"]}>Profesores</th>
              <th className={style["rosa-fuerte"]}>Técnicos Académicos</th>
              <th className={style["rosa-fuerte"]}>Investigadores</th>
              <th className={style["rosa-fuerte"]}>Administrativos</th>
              <th className={style["azul-marino"]}>Total</th>
            </tr>
          </thead>

          <tbody>
            {SISTEMAS_OPERATIVOS.map((so, soIndex) => {
              const valores = datosSO[soIndex];
              const totalFila = valores.reduce((a, b) => a + b, 0);

              return (
                <tr key={so}>
                  <td>{so}</td>
                  {valores.map((valor, colIndex) => (
                    <td key={colIndex}>
                      <div className={style["input-contenedor"]}>
                        <input type="number" value={valor} readOnly />
                      </div>
                    </td>
                  ))}
                  <td className={style["total-celda"]}>{totalFila}</td>
                </tr>
              );
            })}

            <tr className={style["fila-total"]}>
              <td>Total</td>
              {totalesColumnas.map((t, i) => (
                <td key={i}>{t}</td>
              ))}
              <td className={style["total-celda"]}>{totalGeneral}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={style["contenedor-pregunta"]}>
        <div className={style["contenedor-censo"]}>Censo de equipos</div>
        <div className={style["pregunta-cuadro"]}>Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className={style["contenedor-pregunta"]}>
      <div className={style["contenedor-censo"]}>
        Censo de equipos de cómputo
      </div>

      <div className={style["pregunta-cuadro"]}>
        Número de equipos de cómputo por cada categoría y perfil de usuario.
        <ToggleButton />
      </div>

      <div className={style["contenedor-tablas"]}>
        {renderTabla(0)}
        {renderTabla(1)}
      </div>

      <div className={style["contenedor-tablas"]}>
        {renderTabla(2)}
        {renderTabla(3)}
      </div>
    </div>
  );
}
