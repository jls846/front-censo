"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { SO_POR_EQUIPO } from "@/data/so_por_equipo";
import { AREAS } from "@/data/areas";
import { PROCESADORES_POR_EQUIPO } from "@/data/procesadores";

import "../app/styles/layout/agregarEquipo.scss";
import "./editar.css";

export default function Editar() {
  const searchParams = useSearchParams();
  const inventario = searchParams.get("equipoId");

  const router = useRouter();

  const [formData, setFormData] = useState({
    inventario: "",
    serie: "",
    modelo: "",
    id_tipo_equipo: 0,
    id_marca: 0,
    id_estado: 0,
    id_uso: 0,
    id_adscripcion: 0,
    id_sistema_operativo: 0,
    id_procesador: 0,
    lugar: "",
    observaciones: "",
    responsable: "",
    periferico: "",
    fechaFactura: "",
  });

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
  const [adscripcionLabel, setAdscripcionLabel] = useState("");

  const [suggestions, setSuggestions] = useState({
    adscripcion: [] as string[],
  });

  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const mostrarCamposComputadora = Number(formData.id_tipo_equipo) !== 9;

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

  useEffect(() => {
    interface UnidadResponsable {
      idUnidadResponsable: number;
      unidadResponsable: string;
      cargo: string;
      titulo: string;
      nombre: string;
      apellidos: string;
      telefono: string;
      correo: string;
      nivel: number;
      idUnidadResponsablePapa: number;
      unidadResponsablePapa: string;
    }

    interface EquipoResponse {
      [key: string]: unknown;
      id_equipo: number;
      inventario: string;
      serie: string;
      lugar: string;
      fechaFactura: string;
      antiguedad: string;
      modelo: string;
      estado: { id_estado: number; estado: string };
      adscripcion: { id_adscripcion: number; adscripcion: string };
      sistemaOperativo: {
        id_sistema_operativo: number;
        sistema_operativo: string;
      } | null;
      tipoEquipo: { id_tipo_de_equipo: number; tipo_equipo: string } | null;
      procesador_tipoequipo: {
        id: number;
        procesador: {
          id_procesador: number;
          procesador: string;
        };
      } | null;
      tipoUso: { id_uso: number; tipo_uso: string };
      marca: { id_marca: number; marca: string };
      periferico: { id_periferico: number; periferico: string };
      observaciones?: string;
    }

    const fetchEquipo = async () => {
      if (!inventario) return;
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await axios.get(
          `${api_url}/equipos/buscar/${inventario}`,
          { headers }
        );

        const equipo = response.data as EquipoResponse;

        const idAdscripcion = equipo.adscripcion?.id_adscripcion;

        const responsables: UnidadResponsable[] = Object.values(equipo).filter(
          (v): v is UnidadResponsable =>
            typeof v === "object" &&
            v !== null &&
            "idUnidadResponsable" in v &&
            "nombre" in v &&
            "apellidos" in v
        );

        const responsableEncontrado = responsables.find(
          (r) => r.idUnidadResponsable === idAdscripcion
        );

        const responsable = responsableEncontrado
          ? `${responsableEncontrado.nombre} ${responsableEncontrado.apellidos}`
          : "";

        setFormData({
          inventario: equipo.inventario || "",
          serie: equipo.serie || "",
          id_marca: equipo.marca?.id_marca || 0,
          modelo: equipo.modelo || "",
          id_tipo_equipo: equipo.tipoEquipo?.id_tipo_de_equipo || 0,
          id_estado: equipo.estado?.id_estado || 0,
          id_sistema_operativo:
            equipo.sistemaOperativo?.id_sistema_operativo || 0,
          id_procesador:
            equipo.procesador_tipoequipo?.procesador?.id_procesador || 0,
          id_uso: equipo.tipoUso?.id_uso || 0,
          observaciones: equipo.observaciones || "",
          id_adscripcion: equipo.adscripcion?.id_adscripcion || 0,
          lugar: equipo.lugar || "",
          periferico: equipo.periferico?.periferico || "",
          fechaFactura: equipo.fechaFactura || "",
          responsable,
        });

        setAdscripcionLabel(equipo.adscripcion?.adscripcion);
      } catch (error) {
        console.error("Error al obtener el equipo:", error);
        toast.error("No se pudo cargar la información del equipo.");
      }
    };

    fetchEquipo();
  }, [inventario]);

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
      if (Number(formData.id_tipo_equipo) != 9) return;

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

  const handleGuardar = async () => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    const data = {
      id_estado: formData.id_estado,
      id_adscripcion: formData.id_adscripcion,
      lugar: formData.lugar,
      id_sistema_operativo: formData.id_sistema_operativo,
      id_uso: formData.id_uso,
      serie: formData.serie,
      modelo: formData.modelo,
      id_marca: formData.id_marca,
      observaciones: formData.observaciones,
    };

    try {
      await axios.patch(
        `${api_url}/equipos/update/${formData.inventario}`,
        data,
        {
          headers,
        }
      );
      toast.success("Equipo actualizado correctamente");
    } catch (error) {
      console.error("Error al guardar:", error);
      toast.error("Hubo un error al guardar el equipo.");
    }
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    if (field === "adscripcionLabel") {
      const textValue = value as string;
      setAdscripcionLabel(textValue);

      const matches = AREAS.filter((a) =>
        a.label.toLowerCase().includes(textValue.toLowerCase())
      ).map((a) => a.label);

      setSuggestions((prev) => ({
        ...prev,
        adscripcion: matches.slice(0, 5),
      }));
      return;
    }

    setFormData((prev) => {
      const newValue =
        field.startsWith("id_") && value !== "" ? Number(value) : value;

      if (field === "id_tipo_equipo") {
        const idTipoEquipo = Number(value);
        const tipoSeleccionado = tiposEquipo.find(
          (t) => t.id_tipo_de_equipo === idTipoEquipo
        );
        const esPeriferico = tipoSeleccionado?.tipo_equipo === "PERIFÉRICO";

        return {
          ...prev,
          id_tipo_equipo: idTipoEquipo,
          isImpresora: esPeriferico,
        };
      }

      // Caso general
      return { ...prev, [field]: newValue };
    });
  };

  useEffect(() => {
    const fetchResponsable = async () => {
      if (!formData.id_adscripcion) return;

      try {
        const response = await axios.post(
          "https://venus.acatlan.unam.mx/funcionarios_test/test",
          {
            tipoBusqueda: "area",
            IdUnidadResponsable: formData.id_adscripcion,
          }
        );

        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          const first = data[0];
          setFormData((prev) => ({
            ...prev,
            responsable: `${first.nombre ?? ""} ${
              first.apellidos ?? ""
            }`.trim(),
          }));
        } else {
          toast.error(
            "No se encontró información de la adscripción seleccionada"
          );
          setFormData((prev) => ({ ...prev, responsable: "" }));
        }
      } catch (err) {
        console.error("Error al obtener responsable:", err);
        toast.error("No se pudo conseguir el responsable");
        setFormData((prev) => ({ ...prev, responsable: "" }));
      }
    };

    fetchResponsable();
  }, [formData.id_adscripcion]);

  const handleCancelar = () => {
    router.push("/escaner");
  };

  return (
    <div className="agregarEquipoContainer">
      <div className="innerContainer">
        <h2 className="information">
          <span>
            {tiposEquipo.find(
              (t) => t.id_tipo_de_equipo === Number(formData.id_tipo_equipo)
            )?.tipo_equipo || "Sin tipo"}
          </span>
          <span>Inventario: {formData.inventario}</span>
          <span>
            Fecha de censo:{" "}
            {new Date(formData.fechaFactura).toLocaleDateString("es-MX")}
          </span>
        </h2>

        <form className="equipoForm">
          {/* Columna 1 */}
          <div className="column">
            <div className="formGroup">
              <label>Serie</label>
              <input
                type="text"
                value={formData.serie}
                placeholder="Ingresa serie"
                onChange={(e) =>
                  setFormData({ ...formData, serie: e.target.value })
                }
              />
            </div>

            <div className="formGroup">
              <label>Marca</label>
              <select
                value={formData.id_marca}
                onChange={(e) =>
                  setFormData({ ...formData, id_marca: Number(e.target.value) })
                }
              >
                <option value="">Selecciona marca</option>
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
                value={formData.modelo}
                placeholder="Ingresa modelo"
                onChange={(e) =>
                  setFormData({ ...formData, modelo: e.target.value })
                }
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

            <div className="formGroup">
              <label>Estado</label>
              <select
                value={formData.id_estado}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    id_estado: Number(e.target.value),
                  })
                }
              >
                <option value="">Selecciona estado</option>
                {estados.map((e) => (
                  <option key={e.id_estado} value={e.id_estado}>
                    {e.estado}
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
                value={formData.id_uso}
                onChange={(e) =>
                  setFormData({ ...formData, id_uso: Number(e.target.value) })
                }
              >
                <option value="">Selecciona uso</option>
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
                  value={formData.periferico || ""}
                  onChange={(e) =>
                    handleInputChange("tipoPeriferico", e.target.value)
                  }
                >
                  <option value="">Selecciona periférico</option>
                  {perifericos.map((p) => (
                    <option key={p.id_periferico} value={p.periferico}>
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
                placeholder="Ingresa adscripción"
                value={adscripcionLabel}
                onChange={(e) =>
                  handleInputChange("adscripcionLabel", e.target.value)
                }
                style={{ fontSize: "13px" }}
              />
              {suggestions.adscripcion.length > 0 && (
                <ul className="suggestions">
                  {suggestions.adscripcion.map((s) => (
                    <li
                      key={s}
                      onClick={() => {
                        const selected = AREAS.find((a) => a.label === s);
                        if (selected) {
                          setFormData((prev) => ({
                            ...prev,
                            id_adscripcion: selected.id,
                          }));
                          setAdscripcionLabel(selected.label);
                          setSuggestions((prev) => ({
                            ...prev,
                            adscripcion: [],
                          }));
                        }
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="formGroup">
              <label>Responsable</label>
              <input
                type="text"
                value={formData.responsable}
                disabled
                placeholder="Selecciona una Adscripcion"
              />
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
//IO
