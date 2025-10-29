"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import "../../styles/layout/agregarEquipo.scss";

export default function Page() {
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

  const [tiposUso, setTiposUso] = useState<string[]>([]);
  const [marcas, setMarcas] = useState<string[]>([]);
  const [estados, setEstados] = useState<string[]>([]);
  const [adscripciones, setAdscripciones] = useState<string[]>([]);
  const [tiposEquipo, setTiposEquipo] = useState<string[]>([]);
  const [sistemasOperativos, setSistemasOperativos] = useState<string[]>([]);
  const [procesadores, setProcesadores] = useState<string[]>([]);

  const [suggestions, setSuggestions] = useState({
    adscripcion: [] as string[],
  });

  const mostrarCamposComputadora = formData.tipoEquipo !== "Impresora";
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [
          usosRes,
          marcasRes,
          estadosRes,
          adscripcionesRes,
          tiposEquipoRes,
          sistemasOperativosRes,
          procesadoresRes,
        ] = await Promise.all([
          axios.get(`${api_url}/equipos/usos`, { headers }),
          axios.get(`${api_url}/equipos/marcas`, { headers }),
          axios.get(`${api_url}/equipos/estados`, { headers }),
          axios.get(`${api_url}/equipos/adscripciones`, { headers }),
          axios.get(`${api_url}/equipos/tipos-equipo`, { headers }),
          axios.get(`${api_url}/equipos/sistemas-operativos`, { headers }),
          axios.get(`${api_url}/equipos/procesadores`, { headers }),
        ]);

        setTiposUso(usosRes.data);
        setMarcas(marcasRes.data);
        setEstados(estadosRes.data);
        setAdscripciones(adscripcionesRes.data);
        setTiposEquipo(tiposEquipoRes.data);
        setSistemasOperativos(sistemasOperativosRes.data);
        setProcesadores(procesadoresRes.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            toast.error(
              err.response.data?.message || "No se pudo conectar con el API"
            );
          } else if (err.request) {
            toast.error("No se pudo conectar con el servidor");
          } else {
            toast.error("Ocurrió un error inesperado");
          }
        } else {
          toast.error("Ocurrió un error inesperado");
        }
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectSuggestion = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSuggestions((prev) => ({ ...prev, [field]: [] }));
  };

  const handleGuardar = async () => {
    await axios.post(`${api_url}/equipos/crear`, formData);
    toast.success("Equipo guardado");
  };

  const handleCancelar = () => {
    toast.success("Acción cancelada");
  };

  return (
    <div className="agregarEquipoContainer">
      <div className="innerContainer">
        <h2 className="information">Agregar Nuevo Equipo</h2>
        <form className="equipoForm">
          {/* Columna Izquierda */}
          <div className="column">
            <div className="formGroup">
              <label>Serie</label>
              <input
                type="text"
                placeholder="Ingresa serie"
                value={formData.serie}
                onChange={(e) => handleInputChange("serie", e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label>Marca</label>
              <select
                value={formData.marca}
                onChange={(e) => handleInputChange("marca", e.target.value)}
              >
                <option value="">Selecciona una marca</option>
                {marcas.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="formGroup">
              <label>Modelo</label>
              <input
                type="text"
                placeholder="Ingresa modelo"
                value={formData.modelo}
                onChange={(e) => handleInputChange("modelo", e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label>Tipo de equipo</label>
              <select
                value={formData.tipoEquipo}
                onChange={(e) =>
                  handleInputChange("tipoEquipo", e.target.value)
                }
              >
                <option value="">Selecciona tipo de equipo</option>
                {tiposEquipo.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="formGroup">
              <label>Estado</label>
              <select
                value={formData.estado}
                onChange={(e) => handleInputChange("estado", e.target.value)}
              >
                <option value="">Selecciona estado</option>
                {estados.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Columna Centro */}
          <div className="column">
            <div className="formGroup">
              <label>Tipo uso</label>
              <select
                value={formData.tipoUso}
                onChange={(e) => handleInputChange("tipoUso", e.target.value)}
              >
                <option value="">Selecciona tipo de uso</option>
                {tiposUso.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {mostrarCamposComputadora && (
              <>
                <div className="formGroup">
                  <label>Procesador</label>
                  <select
                    value={formData.procesador}
                    onChange={(e) =>
                      handleInputChange("procesador", e.target.value)
                    }
                  >
                    <option value="">Selecciona procesador</option>
                    {procesadores.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="formGroup">
                  <label>Sistema operativo</label>
                  <select
                    value={formData.sistemaOperativo}
                    onChange={(e) =>
                      handleInputChange("sistemaOperativo", e.target.value)
                    }
                  >
                    <option value="">Selecciona sistema operativo</option>
                    {sistemasOperativos.map((so) => (
                      <option key={so} value={so}>
                        {so}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="formGroup">
              <label>Adscripción</label>
              <input
                type="text"
                placeholder="Selecciona adscripción"
                value={formData.adscripcion}
                onChange={(e) =>
                  handleInputChange("adscripcion", e.target.value)
                }
              />
              {suggestions.adscripcion.length > 0 && (
                <ul className="suggestions">
                  {suggestions.adscripcion.map((s) => (
                    <li
                      key={s}
                      onClick={() => handleSelectSuggestion("adscripcion", s)}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="column">
            <div className="formGroup">
              <label>Lugar</label>
              <textarea
                placeholder="Ingresa lugar"
                value={formData.lugar}
                onChange={(e) => handleInputChange("lugar", e.target.value)}
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
                  handleInputChange("observaciones", e.target.value)
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
