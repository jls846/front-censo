"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import { AREAS } from "@/data/areas";
import { SO_POR_EQUIPO } from "@/data/so_por_equipo";
import { PROCESADORES_POR_EQUIPO } from "@/data/procesadores";
import { useRouter } from "next/navigation";
import "../app/styles/layout/agregarEquipo.scss";

export default function Page() {
  const searchParams = useSearchParams();
  const inventario = searchParams.get("equipoId");

  const router = useRouter();

  const [formData, setFormData] = useState({
    inventario: "",
    serie: "",
    lugar: "",
    fechaFactura: new Date(),
    antiguedad: "MENORES DE 2",
    modelo: "",
    id_estado: "",
    id_adscripcion: "",
    id_tipo_equipo: "",
    id_sistema_operativo: "",
    id_procesador: "",
    id_uso: "",
    id_marca: "",
    id_periferico: "",
    isImpresora: false,
  });

  useEffect(() => {
    if (inventario) {
      setFormData((prev) => ({ ...prev, inventario }));
    }
  }, [inventario]);

  interface TipoUso {
    id_uso: number;
    tipo_uso: string;
  }

  interface Estado {
    id_estado: number;
    estado: string;
  }

  interface TipoEquipo {
    id_tipo_de_equipo: number;
    tipo_equipo: string;
  }

  interface SistemaOperativo {
    id_sistema_operativo: number;
    sistema_operativo: string;
  }

  interface Procesador {
    id_procesador: number;
    procesador: string;
  }

  interface Marca {
    id_marca: number;
    marca: string;
  }

  interface Adscripcion {
    id_adscripcion: number;
    adscripcion: string;
  }

  interface Perifericos {
    id_periferico: number;
    periferico: string;
  }

  // Estados
  const [tiposUso, setTiposUso] = useState<TipoUso[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [adscripciones, setAdscripciones] = useState<Adscripcion[]>([]);
  const [tiposEquipo, setTiposEquipo] = useState<TipoEquipo[]>([]);
  const [sistemasOperativos, setSistemasOperativos] = useState<
    SistemaOperativo[]
  >([]);
  const [procesadores, setProcesadores] = useState<Procesador[]>([]);
  const [perifericos, setPerifericos] = useState<Perifericos[]>([]);

  const [suggestions, setSuggestions] = useState({
    adscripcion: [] as string[],
  });

  const mostrarCamposComputadora = formData.id_tipo_equipo !== "9";
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
        ] = await Promise.all([
          axios.get(`${api_url}/equipos/usos`, { headers }),
          axios.get(`${api_url}/equipos/marcas`, { headers }),
          axios.get(`${api_url}/equipos/estados`, { headers }),
          axios.get(`${api_url}/equipos/adscripciones`, { headers }),
          axios.get(`${api_url}/equipos/tipos-equipo`, { headers }),
          axios.get(`${api_url}/equipos/sistemas-operativos`, { headers }),
        ]);

        setTiposUso(usosRes.data);
        setMarcas(marcasRes.data);
        setEstados(estadosRes.data);
        setAdscripciones(adscripcionesRes.data);
        setTiposEquipo(tiposEquipoRes.data);
        setSistemasOperativos(sistemasOperativosRes.data);
        console.log(adscripciones);
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
  }, [api_url]);

  useEffect(() => {
    const fetchProcesador = async () => {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        `${api_url}/equipos/procesador-tipo-equipos/${formData.id_tipo_equipo}`,
        {
          headers,
        }
      );

      setProcesadores(response.data);
    };
    fetchProcesador();
  }, [tiposEquipo]);

  useEffect(() => {
    const fetchPerifericos = async () => {
      if (formData.id_tipo_equipo !== "9") return;

      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await axios.get(`${api_url}/equipos/perifericos`, {
          headers,
        });
        setPerifericos(response.data);
      } catch (err) {
        console.error(err);
        toast.error("No se pudieron cargar los periféricos");
      }
    };

    fetchPerifericos();
  }, [formData.id_tipo_equipo]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      let newValue = value;

      if (field.startsWith("id_")) {
        newValue = value ? Number(value) : "";
      }

      if (field === "id_tipo_equipo") {
        const tipoSeleccionado = tiposEquipo.find(
          (t) => t.id_tipo_de_equipo === Number(value)
        );
        const esPeriferico = tipoSeleccionado?.tipo_equipo === "PERIFÉRICO";
        return { ...prev, [field]: newValue, isImpresora: esPeriferico };
      }

      return { ...prev, [field]: newValue };
    });
  };

  const handleSelectSuggestion = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSuggestions((prev) => ({ ...prev, [field]: [] }));
  };

  const handleGuardar = async () => {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const dataToSend = {
        ...formData,
        fechaFactura: new Date(formData.fechaFactura)
          .toISOString()
          .split("T")[0], // "YYYY-MM-DD"
        antiguedad: formData.antiguedad || "0 años",
      };

      await axios.post(`${api_url}/equipos/crear`, dataToSend, { headers });
      toast.success("Equipo guardado correctamente");
    } catch (err) {
      toast.error("Error al guardar el equipo");
    }
  };

  const handleCancelar = () => {
    router.push("/escaner");
  };

  return (
    <div className="agregarEquipoContainer">
      <div className="innerContainer">
        <h2 className="information">Agregar Nuevo Equipo</h2>
        <form className="equipoForm">
          {/* Columna Izquierda */}
          <div className="column">
            <div className="formGroup">
              <label>Numero de Inventario</label>
              <input
                required
                type="text"
                placeholder="Ingresa Inventario"
                value={formData.inventario}
                onChange={(e) =>
                  handleInputChange("inventario", e.target.value)
                }
              />
            </div>
            <div className="formGroup">
              <label>Serie</label>
              <input
                required
                type="text"
                placeholder="Ingresa serie"
                value={formData.serie}
                onChange={(e) => handleInputChange("serie", e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label>Marca</label>
              <select
                required
                value={formData.id_marca}
                onChange={(e) => handleInputChange("id_marca", e.target.value)}
              >
                <option value="">Selecciona una marca</option>
                {marcas.map((m) => (
                  <option key={m.id_marca} value={m.id_marca}>
                    {m.marca}
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
                required
                value={formData.id_tipo_equipo}
                onChange={(e) =>
                  handleInputChange("id_tipo_equipo", e.target.value)
                }
              >
                <option value="">Selecciona tipo de equipo</option>
                {tiposEquipo.map((t) => (
                  <option key={t.id_tipo_de_equipo} value={t.id_tipo_de_equipo}>
                    {t.tipo_equipo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="column">
            <div className="formGroup">
              <label>Estado</label>
              <select
                required
                value={formData.id_estado}
                onChange={(e) => handleInputChange("id_estado", e.target.value)}
              >
                <option value="">Selecciona estado</option>
                {estados.map((e) => (
                  <option key={e.id_estado} value={e.id_estado}>
                    {e.estado}
                  </option>
                ))}
              </select>
            </div>

            <div className="formGroup">
              <label>Tipo de uso</label>
              <select
                required
                value={formData.id_uso}
                onChange={(e) => handleInputChange("id_uso", e.target.value)}
              >
                <option value="">Selecciona tipo de uso</option>
                {tiposUso.map((t) => (
                  <option key={t.id_uso} value={t.id_uso}>
                    {t.tipo_uso}
                  </option>
                ))}
              </select>
            </div>

            {mostrarCamposComputadora && (
              <>
                <div className="formGroup">
                  <label>Procesador</label>
                  <select
                    value={formData.id_procesador}
                    onChange={(e) =>
                      handleInputChange("id_procesador", e.target.value)
                    }
                  >
                    <option value="">Selecciona procesador</option>
                    {PROCESADORES_POR_EQUIPO[formData.id_tipo_equipo]?.map(
                      (p) => (
                        <option key={p.id_procesador} value={p.id_procesador}>
                          {p.procesador}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="formGroup">
                  <label>Sistema operativo</label>
                  <select
                    value={formData.id_sistema_operativo}
                    onChange={(e) =>
                      handleInputChange("id_sistema_operativo", e.target.value)
                    }
                  >
                    <option value="">Selecciona sistema operativo</option>
                    {SO_POR_EQUIPO[formData.id_tipo_equipo]?.map((so) => (
                      <option
                        key={so.id_sistema_operativo}
                        value={so.id_sistema_operativo}
                      >
                        {so.sistema_operativo}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {!mostrarCamposComputadora && (
              <div className="formGroup">
                <label>Tipos de Periféricos</label>
                <select
                  value={formData.id_periferico}
                  onChange={(e) =>
                    handleInputChange("id_periferico", e.target.value)
                  }
                >
                  <option value="">Selecciona periférico</option>
                  {perifericos.map((p) => (
                    <option key={p.id_periferico} value={p.id_periferico}>
                      {p.periferico}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="formGroup" style={{ position: "relative" }}>
              <label>Adscripción</label>
              <input
                required
                type="text"
                placeholder="Ingresa adscripcion"
                value={formData.id_adscripcion}
                onChange={(e) =>
                  handleInputChange("id_adscripcion", e.target.value)
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

            {/* <div className="formGroup">
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
            </div> */}

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
//IO
