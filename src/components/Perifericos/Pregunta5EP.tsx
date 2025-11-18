"use client";
import React from "react";
import "./pregunta5EP.scss";

export default function Pregunta5EP() {
  return (
    <div className="container">
      <div className="header">
        Indique el número de equipos de digitalización de acuerdo con la
        población universitaria al que se destina su uso primordialmente.
        <span>*</span>
        <small> (Requerido en el caso de contar con Equipo de digitalización)</small>
      </div>

      <div className="row">
        <div className="item">
          <label htmlFor="alumnos-digital">Alumnos</label>
          <input type="text" id="alumnos-digital" defaultValue="11" />
        </div>

        <div className="item">
          <label htmlFor="profesores-digital">
            Profesores <span className="help-icon">?</span>
          </label>
          <input type="text" id="profesores-digital" defaultValue="24" />
        </div>

        <div className="item">
          <label htmlFor="tecnicos-academicos-digital">
            Técnicos Académicos
          </label>
          <input type="text" id="tecnicos-academicos-digital" defaultValue="" />
        </div>

        <div className="item">
          <label htmlFor="investigadores-digital">
            Investigadores <span className="help-icon">?</span>
          </label>
          <input type="text" id="investigadores-digital" defaultValue="" />
        </div>

        <div className="item">
          <label htmlFor="administrativos-digital">
            Administrativos <span className="help-icon">?</span>
          </label>
          <input type="text" id="administrativos-digital" defaultValue="101" />
        </div>

        <div className="item">
          <label htmlFor="total-digital">Total</label>
          <input type="text" id="total-digital" defaultValue="136" />
        </div>
      </div>
    </div>
  );
}
