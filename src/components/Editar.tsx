"use client";
import { useSearchParams } from "next/navigation";
import "../app/styles/layout/agregarEquipo.scss";
import "./editar.css";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Editar() {
  const searchParams = useSearchParams();
  const equipoId = searchParams.get("equipoId");

  const [formData, setFormData] = useState({
    serie: "",
    marca: "",
    modelo: "",
    tipoEquipo: "",
    estado: "",
    sistemaOperativo: "",
    procesador: "",
    tipoUso: "",
    observaciones: "",
    adscripcion: "",
    lugar: "",
    responsable: "",
  });

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/equipos/${equipoId}`
        );

        setFormData(response.data);
      } catch (error) {
        console.error("Error al obtener el equipo:", error);
        alert("No se pudo cargar la información del equipo.");
      }
    };

    if (equipoId) {
      fetchEquipo();
    }
  }, [equipoId]);

  const mostrarCamposComputadora = formData.tipoEquipo !== "Impresora";

  const handleGuardar = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/equipos/update/${equipoId}`,
        formData
      );
      alert("Equipo actualizado correctamente");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al guardar el equipo.");
    }
  };

  const handleCancelar = () => {
    alert("Acción cancelada");
  };

  return (
    <div className="agregarEquipoContainer">
      <div className="innerContainer">
        <h2 className="information">
          {equipoId ? `Editar Equipo (${equipoId})` : "Agregar Equipo"}
          <span>Inventario:</span>
          <span>Fecha de censo:</span>
        </h2>

        <form className="equipoForm">
          {/* Columna 1 */}
          <div className="column">
            <div className="formGroup">
              <label>Serie</label>
              <input
                type="text"
                placeholder="Ingresa serie"
                value={formData.serie}
                onChange={(e) =>
                  setFormData({ ...formData, serie: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label>Marca</label>
              <select
                value={formData.marca}
                onChange={(e) =>
                  setFormData({ ...formData, marca: e.target.value })
                }
              >
                <option value="">Ingresa marca</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Lenovo">Lenovo</option>
              </select>
            </div>
            <div className="formGroup">
              <label>Modelo</label>
              <select
                value={formData.modelo}
                onChange={(e) =>
                  setFormData({ ...formData, modelo: e.target.value })
                }
              >
                <option value="">Ingresa modelo</option>
                <option value="XPS 15">XPS 15</option>
                <option value="EliteBook">EliteBook</option>
                <option value="ThinkPad">ThinkPad</option>
              </select>
            </div>
            <div className="formGroup">
              <label>Estado</label>
              <select
                value={formData.estado}
                onChange={(e) =>
                  setFormData({ ...formData, estado: e.target.value })
                }
              >
                <option value="">Selecciona estado</option>
                <option value="Activado">Activado</option>
                <option value="Desactivado">Desactivado</option>
                <option value="En reparación">En reparación</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Tipo uso</label>
              <select
                value={formData.tipoUso}
                onChange={(e) =>
                  setFormData({ ...formData, tipoUso: e.target.value })
                }
              >
                <option value="">Ingresa tipo de uso</option>
                <option value="administrativo">administrativo</option>
                <option value="educacional">educacional</option>
                <option value="laboratorio">laboratorio</option>
              </select>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="column">
            {mostrarCamposComputadora && (
              <>
                <div className="formGroup">
                  <label>Procesador</label>
                  <select
                    value={formData.procesador}
                    onChange={(e) =>
                      setFormData({ ...formData, procesador: e.target.value })
                    }
                  >
                    <option value="">Selecciona procesador</option>
                    <option value="Ryzen 3">Ryzen 3</option>
                    <option value="Intel i5">Intel i5</option>
                    <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                  </select>
                </div>

                <div className="formGroup">
                  <label>Sistema operativo</label>
                  <select
                    value={formData.sistemaOperativo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sistemaOperativo: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecciona sistema operativo</option>
                    <option value="Windows 10">Windows 10</option>
                    <option value="Windows 11">Windows 11</option>
                    <option value="Linux">Linux</option>
                    <option value="macOS">macOS</option>
                  </select>
                </div>
              </>
            )}

            <div className="formGroup">
              <label>Adscripción</label>
              <select
                value={formData.adscripcion}
                onChange={(e) =>
                  setFormData({ ...formData, adscripcion: e.target.value })
                }
              >
                <option value="">Selecciona adscripción</option>
                <option value="Cedetec">Cedetec</option>
                <option value="Laboratorio">Laboratorio</option>
                <option value="Administración">Administración</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Responsable</label>
              <select value={formData.responsable} disabled={true}>
                <option value="">Responsable</option>
              </select>
            </div>
          </div>

          {/* Columna 3 */}
          <div className="column">
            <div className="formGroup">
              <label>Lugar</label>
              <textarea
                placeholder="Ingresa lugar"
                value={formData.lugar}
                onChange={(e) =>
                  setFormData({ ...formData, lugar: e.target.value })
                }
                rows={5}
                className="textAreaLarge"
              />
            </div>

            <div className="formGroup">
              <label>Observaciones</label>
              <textarea
                placeholder="Ingresa observaciones"
                value={formData.observaciones}
                onChange={(e) =>
                  setFormData({ ...formData, observaciones: e.target.value })
                }
                rows={5}
                className="textAreaLarge"
              />
            </div>

            <div className="formActions">
              <button
                type="button"
                className="btnGuardar"
                onClick={handleGuardar}
              >
                Guardar
              </button>
              <button
                type="button"
                className="btnCancelar"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
