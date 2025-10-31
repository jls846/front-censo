"use client";

import { useSearchParams } from "next/navigation";
import "../app/styles/layout/agregarEquipo.scss";
import "./editar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Editar() {
  const searchParams = useSearchParams();
  const inventario = searchParams.get("equipoId");

  const [formData, setFormData] = useState({
    inventario: "",
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

  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const mostrarCamposComputadora = formData.tipoEquipo !== "Impresora";

  // 🔹 Cargar catálogos
  useEffect(() => {
    const fetchCatalogos = async () => {
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
      } catch (error) {
        console.error("Error cargando catálogos:", error);
        toast.error("No se pudieron cargar los catálogos de datos");
      }
    };

    fetchCatalogos();
  }, []);

  // 🔹 Obtener equipo por inventario
  useEffect(() => {
    const fetchEquipo = async () => {
      if (!inventario) return;
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await axios.get(
          `${api_url}/equipos/buscar/${inventario}`,
          {
            headers,
          }
        );

        const equipo = response.data;

        setFormData({
          inventario: equipo.inventario || "",
          serie: equipo.serie || "",
          marca: equipo.marca?.marca || "", // <- relación
          modelo: equipo.modelo || "",
          tipoEquipo: equipo.tipoEquipo?.tipo || "",
          estado: equipo.estado?.estado || "",
          sistemaOperativo: equipo.sistemaOperativo?.nombre || "",
          procesador: equipo.procesador?.nombre || "",
          tipoUso: equipo.tipoUso?.tipo || "",
          observaciones: equipo.observaciones || "",
          adscripcion: equipo.adscripcion?.adscripcion || "",
          lugar: equipo.lugar || "",
          responsable: equipo.responsable || "", // <- devuelto por searchResponsable
        });
      } catch (error) {
        console.error("Error al obtener el equipo:", error);
        toast.error("No se pudo cargar la información del equipo.");
      }
    };

    fetchEquipo();
  }, [inventario]);

  // 🔹 Guardar cambios
  const handleGuardar = async () => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.patch(
        `${api_url}/equipos/update/${formData.inventario}`,
        formData,
        { headers }
      );
      toast.success("Equipo actualizado correctamente");
    } catch (error) {
      console.error("Error al guardar:", error);
      toast.error("Hubo un error al guardar el equipo.");
    }
  };

  const handleCancelar = () => {
    toast("Acción cancelada");
  };

  return (
    <div className="agregarEquipoContainer">
      <div className="innerContainer">
        <h2 className="information">
          {inventario ? `Editar Equipo (${inventario})` : "Agregar Equipo"}
        </h2>

        <form className="equipoForm">
          {/* Columna 1 */}
          <div className="column">
            <div className="formGroup">
              <label>Inventario</label>
              <input type="text" value={formData.inventario} disabled />
            </div>

            <div className="formGroup">
              <label>Serie</label>
              <input
                type="text"
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
                <option value="">Selecciona marca</option>
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
                value={formData.modelo}
                onChange={(e) =>
                  setFormData({ ...formData, modelo: e.target.value })
                }
              />
            </div>

            <div className="formGroup">
              <label>Tipo de equipo</label>
              <select
                value={formData.tipoEquipo}
                onChange={(e) =>
                  setFormData({ ...formData, tipoEquipo: e.target.value })
                }
              >
                <option value="">Selecciona tipo</option>
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
                onChange={(e) =>
                  setFormData({ ...formData, estado: e.target.value })
                }
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

          {/* Columna 2 */}
          <div className="column">
            <div className="formGroup">
              <label>Tipo de uso</label>
              <select
                value={formData.tipoUso}
                onChange={(e) =>
                  setFormData({ ...formData, tipoUso: e.target.value })
                }
              >
                <option value="">Selecciona uso</option>
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
                      setFormData({ ...formData, procesador: e.target.value })
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
                      setFormData({
                        ...formData,
                        sistemaOperativo: e.target.value,
                      })
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
              <select
                value={formData.adscripcion}
                onChange={(e) =>
                  setFormData({ ...formData, adscripcion: e.target.value })
                }
              >
                <option value="">Selecciona adscripción</option>
                {adscripciones.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="formGroup">
              <label>Responsable</label>
              <input type="text" value={formData.responsable} disabled />
            </div>
          </div>

          {/* Columna 3 */}
          <div className="column">
            <div className="formGroup">
              <label>Lugar</label>
              <textarea
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
