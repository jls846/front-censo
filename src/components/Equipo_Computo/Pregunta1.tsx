"use client";
import "./pregunta1.module.scss"

export default function Pregunta1_1() {
  return (
    <section>
      <div>
        <h1>Censo Equipos de computo</h1>
        <p className="instructions">
          Desglosa en cada renglon el número de equipos de cómputo dedicado por
          cada categoría enlistada, de acuerdo con el perfil del usuario al que
          se destina su uso primordialmente.
        </p>

        <div className="container">

          {/* ===================== */}
          {/* 1. COMPUTADORAS DE ESCRITORIO */}
          {/* ===================== */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Computadoras de escritorio</th>
                  <th>Alumnos</th>
                  <th>Profesores</th>
                  <th>Tecnicos Academicos</th>
                  <th>Investigadores</th>
                  <th>Administrativos</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>

                {/* Windows */}
                <tr>
                  <th>Windows</th>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <th>10</th>
                </tr>

                {/* Linux */}
                <tr>
                  <th>Linux</th>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <th>10</th>
                </tr>

                {/* Mac OS */}
                <tr>
                  <th>Mac OS</th>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <th>10</th>
                </tr>

                {/* Totales */}
                <tr>
                  <th>Total</th>
                  <th>10</th>
                  <th>10</th>
                  <th>10</th>
                  <th>10</th>
                  <th>10</th>
                  <th>10</th>
                </tr>

              </tbody>
            </table>
          </div>

          {/* ===================== */}
          {/* 2. COMPUTADORAS PORTÁTILES */}
          {/* ===================== */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Computadoras portátiles</th>
                  <th>Alumnos</th>
                  <th>Profesores</th>
                  <th>Tecnicos Academicos</th>
                  <th>Investigadores</th>
                  <th>Administrativos</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>

                {/* Windows */}
                <tr>
                  <th>Windows</th>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <th>10</th>
                </tr>

                {/* Chromebook */}
                <tr>
                  <th>Chromebook</th>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <th>10</th>
                </tr>

                {/* Mac OS */}
                <tr>
                  <th>Mac OS</th>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <th>10</th>
                </tr>

                {/* Totales */}
                <tr>
                  <th>Total</th>
                  <th>10</th><th>10</th><th>10</th><th>10</th><th>10</th>
                  <th>10</th>
                </tr>

              </tbody>
            </table>
          </div>

          {/* ===================== */}
          {/* 3. TABLETAS */}
          {/* ===================== */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Tabletas</th>
                  <th>Alumnos</th>
                  <th>Profesores</th>
                  <th>Tecnicos Academicos</th>
                  <th>Investigadores</th>
                  <th>Administrativos</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>

                {/* Android */}
                <tr>
                  <th>Android</th>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <th>10</th>
                </tr>

                {/* iPad IOS */}
                <tr>
                  <th>iPad iOS</th>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <th>10</th>
                </tr>

                {/* Totales */}
                <tr>
                  <th>Total</th>
                  <th>10</th><th>10</th><th>10</th><th>10</th><th>10</th>
                  <th>10</th>
                </tr>

              </tbody>
            </table>
          </div>

          {/* ===================== */}
          {/* 4. ALTO RENDIMIENTO */}
          {/* ===================== */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Alto Rendimiento</th>
                  <th>Alumnos</th>
                  <th>Profesores</th>
                  <th>Tecnicos Academicos</th>
                  <th>Investigadores</th>
                  <th>Administrativos</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <th>Servidores</th>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <td><input type="number" className="numero" /></td>
                  <th>10</th>
                </tr>

                <tr>
                  <th>Total</th>
                  <th>10</th><th>10</th><th>10</th><th>10</th><th>10</th>
                  <th>10</th>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
}
