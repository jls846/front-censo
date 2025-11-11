"use client";
import { useState } from "react";

export default async function Page() {
  return (
    <section>
      <div>
        <h1>Censo Equipos de computo</h1>
        <p className="instructions">
          Desglosa en cada renglon. el numero de equipos de computo dedicado por
          cada categoria enlistada, de acuerdo con el perfil del usuario al que
          se destina su uso primordialmente
        </p>

        <div className="container">
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
                <tr>
                  <th>Windows</th>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <th>10</th>
                </tr>
                <th>Linux</th>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <th>10</th>
                <tr>
                  <th>Mac OS</th>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <th>10</th>
                </tr>{" "}
                <tr>
                  <th>Total</th>
                  <th>10</th> <th>10</th> <th>10</th> <th>10</th> <th>10</th>
                  <th>10</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Computadoras portatiles</th>
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
                  <th>Windows</th>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <th>10</th>
                </tr>
                <th>Chromebook</th>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <th>10</th>
                <tr>
                  <th>Mac OS</th>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <th>10</th>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>10</th> <th>10</th> <th>10</th> <th>10</th> <th>10</th>
                  <th>10</th>
                </tr>
              </tbody>
            </table>
          </div>

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
                <tr>
                  <th>Andriod</th>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <th>10</th>
                </tr>
                <th>IPad IOS</th>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <td>
                  <input type="number" className="numero" />
                </td>
                <th>10</th>

                <tr>
                  <th>Total</th>
                  <th>10</th> <th>10</th> <th>10</th> <th>10</th> <th>10</th>
                  <th>10</th>
                </tr>
              </tbody>
            </table>
          </div>

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
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <td>
                    <input type="number" className="numero" />
                  </td>
                  <th>10</th>
                </tr>

                <tr>
                  <th>Total</th>
                  <th>10</th> <th>10</th> <th>10</th> <th>10</th> <th>10</th>
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
