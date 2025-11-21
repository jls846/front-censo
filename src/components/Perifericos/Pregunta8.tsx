"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../../app/styles/layout/pregunta7.scss";

interface Dato {
  nombre: string;
  cantidad: number;
}

export default function Pregunta8() {
  const [data, setData] = useState<Dato[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<keyof Dato | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get(`${api_url}/equipos/reporte/contar_proyecto`, { headers })
      .then((res) => {
        const formato: Dato[] = res.data.map((item: any) => ({
          nombre: item.proyecto || "SIN PROYECTO",
          cantidad: Number(item.total) || 0,
        }));

        setData(formato);
      })
      .catch((err) => {
        console.error("Error cargando datos:", err);
      });
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
  const totalLaboratorios = data.reduce(
    (sum, item) => sum + Number(item.cantidad),
    0
  );

  return (
    <div className="container">
      <div className="pregunta-cuadro">Numero de proyectos.</div>
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
              <th
                onClick={() => handleSort("nombre")}
                style={{ textAlign: "center" }}
              >
                Proyecto
                {sortColumn === "nombre" && (
                  <img
                    src={sortAsc ? "/arrow_up.svg" : "/arrow_down.svg"}
                    alt="orden"
                  />
                )}
              </th>

              <th
                onClick={() => handleSort("cantidad")}
                style={{ textAlign: "center" }}
              >
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

      <div className="total-labs">
        Total de proyecto: <strong>{totalLaboratorios}</strong>
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
