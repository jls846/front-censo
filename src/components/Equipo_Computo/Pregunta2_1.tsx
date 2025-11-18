"use client";

import React from "react";
import Link from "next/link";
import "./pregunta2_1.module.scss"; // 👈 Importamos los estilos

export default function Pregunta2() {
  return (
    <main className="pregunta-page pregunta2">
      <div className="pregunta-container">
        <h1 className="pregunta-titulo">PREGUNTA 2</h1>

        <section className="pregunta-seccion">
          <p className="pregunta-texto">
            Indique el número de equipos de impresión de acuerdo con la
            población universitaria al que se destina su uso primordialmente.
          </p>

          <div className="pregunta-grid">
            <div>
              <label>Alumnos</label>
              <input value="35" readOnly />
            </div>
            <div>
              <label>Profesores</label>
              <input value="43" readOnly />
            </div>
            <div>
              <label>Técnicos Académicos</label>
              <input value="" readOnly />
            </div>
            <div>
              <label>Investigadores</label>
              <input value="" readOnly />
            </div>
            <div>
              <label>Administrativos</label>
              <input value="302" readOnly />
            </div>
            <div>
              <label>Total</label>
              <input value="380" readOnly />
            </div>
          </div>
        </section>

        <div className="boton-grupo">
          <Link href="/pregunta1" className="boton anterior">
            ← Volver a Pregunta 1
          </Link>

          <Link href="#" className="boton siguiente">
            Ir a Pregunta 3 →
          </Link>
        </div>
      </div>
    </main>
  );
}
