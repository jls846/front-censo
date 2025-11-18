"use client";

import React, { useState, useEffect } from "react";
import "../../app/styles/layout/pregunta7.scss";

interface Dato {
  nombre: string;
  cantidad: number;
}

const datosSimulados: Dato[] = [
  { nombre: "AULA DE ROBÓTICA 101", cantidad: 18 },
  { nombre: "LAB DE QUÍMICA 201", cantidad: 25 },
  { nombre: "LAB DE FÍSICA 202", cantidad: 30 },
  { nombre: "LAB DE PROGRAMACIÓN 301", cantidad: 40 },
  { nombre: "AULA DE DISEÑO 102", cantidad: 22 },
  { nombre: "LAB ELECTRÓNICA 204", cantidad: 35 },
  { nombre: "LAB COMPUTACIÓN 305", cantidad: 28 },
  { nombre: "AULA INTERACTIVA 106", cantidad: 15 },
  { nombre: "LAB DE INNOVACIÓN 307", cantidad: 33 },
  { nombre: "SALA DE CONFERENCIAS A", cantidad: 12 },
  { nombre: "LAB DE MECATRÓNICA 308", cantidad: 45 },
  { nombre: "LAB DE INTELIGENCIA ARTIFICIAL 309", cantidad: 38 },
  { nombre: "LAB DE REDES 310", cantidad: 27 },
  { nombre: "SALA MULTIMEDIA B", cantidad: 20 },
  { nombre: "LAB DE BIOLOGÍA 205", cantidad: 26 },
  { nombre: "LAB DE MECÁNICA 210", cantidad: 32 },
  { nombre: "AULA DE INGLÉS 110", cantidad: 19 },
  { nombre: "SALA DE DOCENTES", cantidad: 14 },
  { nombre: "LAB DE BIG DATA 311", cantidad: 36 },
  { nombre: "LAB DE CIBERSEGURIDAD 312", cantidad: 29 },
];

export default function Pregunta7EP() {
  const [data, setData] = useState<Dato[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<keyof Dato | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  useEffect(() => {
    setData(datosSimulados);
  }, []);

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortAsc ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortAsc]);

  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * recordsPerPage;
    return sortedData.slice(start, start + recordsPerPage);
  }, [sortedData, currentPage, recordsPerPage]);

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);

  const handleSort = (column: keyof Dato) => {
    if (sortColumn === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
    setCurrentPage(1);
  };

  const handleRecordsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const startItem = (currentPage - 1) * recordsPerPage + 1;
  const endItem = Math.min(startItem + recordsPerPage - 1, sortedData.length);

  return (
    <div className="container">
      <div className="controls">
        <div className="show-records">
          Mostrar
          <select value={recordsPerPage} onChange={handleRecordsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          registros
        </div>
        <div className="results-info">
          Mostrando {startItem} al {endItem} de {sortedData.length} resultados
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("nombre")}>
                Nombre del laboratorio o aula
                {sortColumn === "nombre" && (
                  <img
                    src={sortAsc ? "/arrow_up.svg" : "/arrow_down.svg"}
                    alt="orden"
                  />
                )}
              </th>

              <th onClick={() => handleSort("cantidad")}>
                Cantidad
                {sortColumn === "cantidad" && (
                  <img
                    src={sortAsc ? "/arrow_up.svg" : "/arrow_down.svg"}
                    alt="orden"
                  />
                )}
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
