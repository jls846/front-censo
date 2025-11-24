"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import { SO_POR_EQUIPO } from "@/data/so_por_equipo";
import { PROCESADORES_POR_EQUIPO } from "@/data/procesadores";
import { useRouter } from "next/navigation";
import "../app/styles/layout/agregarEquipo.scss";
interface FormData {
  inventario: string;
  serie: string;
  lugar: string;
  fechaFactura: Date;
  antiguedad: string;
  modelo: string;
  id_estado: number;
  id_adscripcion: number;
  id_tipo_equipo: number;
  id_sistema_operativo: number;
  id_procesador: number;
  id_uso: number;
  id_marca: number;
  id_periferico: number;
  id_laboratorio: number | null;
  id_proyecto: number | null;
  isImpresora: boolean;
}
export default function Page() {
  const searchParams = useSearchParams();
  const inventario = searchParams.get("equipoId");
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    inventario: "",
    serie: "",
    lugar: "",
    fechaFactura: new Date(),
    antiguedad: "MENORES DE 2",
    modelo: "",
    id_estado: 0,
    id_adscripcion: 0,
    id_tipo_equipo: 0,
    id_sistema_operativo: 0,
    id_procesador: 0,
    id_uso: 0,
    id_marca: 0,
    id_periferico: 0,
    id_laboratorio: null,
    id_proyecto: null,
    isImpresora: false,
  });

  const [adscripcionLabel, setAdscripcionLabel] = useState("");
  const [laboratorioLabel, setLaboratorioLabel] = useState("");
  const [proyectoLabel, setProyectoLabel] = useState("");

  const [suggestions, setSuggestions] = useState({
    adscripcion: [] as string[],
    laboratorio: [] as string[],
    proyecto: [] as string[],
  });

  useEffect(() => {
    if (inventario) {
      setFormData((prev) => ({ ...prev, inventario }));
    }
  }, [inventario]);

  // Interfaces
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
  interface Laboratorio {
    id_laboratorio: number;
    laboratorio: string;
  }
  interface Proyecto {
    id_proyecto: number;
    proyecto: string;
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
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  const mostrarCamposComputadora = Number(formData.id_tipo_equipo) !== 9;
  const esTablet = [7, 8].includes(Number(formData.id_tipo_equipo));
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
          laboratoriosRes,
          proyectosRes,
        ] = await Promise.all([
          axios.get(`${api_url}/equipos/usos`, { headers }),
          axios.get(`${api_url}/equipos/marcas`, { headers }),
          axios.get(`${api_url}/equipos/estados`, { headers }),
          axios.get(`${api_url}/equipos/adscripciones`, { headers }),
          axios.get(`${api_url}/equipos/tipos-equipo`, { headers }),
          axios.get(`${api_url}/equipos/sistemas-operativos`, { headers }),
          axios.get(`${api_url}/equipos/laboratorios`, { headers }),
          axios.get(`${api_url}/equipos/proyectos`, { headers }),
        ]);

        const ordenados = marcasRes.data.sort((a: Marca, b: Marca) =>
          a.marca.localeCompare(b.marca)
        );

        setTiposUso(usosRes.data);
        setMarcas(ordenados);
        setEstados(estadosRes.data);
        setAdscripciones(adscripcionesRes.data);
        setTiposEquipo(tiposEquipoRes.data);
        setSistemasOperativos(sistemasOperativosRes.data);
        setLaboratorios(laboratoriosRes.data);
        setProyectos(proyectosRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar los datos");
      }
    };

    fetchData();
  }, [api_url]);

  useEffect(() => {
    const fetchProcesador = async () => {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await axios.get(
          `${api_url}/equipos/procesador-tipo-equipos`,
          { headers }
        );
        setProcesadores(response.data);
      } catch (err) {
        console.error(err);
        toast.error("No se pudieron cargar los procesadores");
      }
    };
    fetchProcesador();
  }, []);

  useEffect(() => {
    const fetchPerifericos = async () => {
      if (Number(formData.id_tipo_equipo) !== 9) return;

      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await axios.get(`${api_url}/equipos/perifericos`, {
          headers,
        });

        const ordenados = response.data.sort((a: any, b: any) =>
          a.periferico.localeCompare(b.periferico)
        );

        setPerifericos(ordenados);
      } catch (err) {
        console.error(err);
        toast.error("No se pudieron cargar los periféricos");
      }
    };

    fetchPerifericos();
  }, [formData.id_tipo_equipo]);

  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    if (field === "adscripcionLabel") {
      const textValue = value as string;
      setAdscripcionLabel(textValue);
      const matches = adscripciones
        .filter((a) => normalize(a.adscripcion).includes(normalize(textValue)))
        .map((a) => a.adscripcion);
      setSuggestions((prev) => ({
        ...prev,
        adscripcion: matches.slice(0, 5),
      }));
      return;
    }

    if (field === "laboratorioLabel") {
      const textValue = value as string;
      setLaboratorioLabel(textValue);
      const matches = laboratorios
        .filter((l) => normalize(l.laboratorio).includes(normalize(textValue)))
        .map((l) => l.laboratorio);
      setSuggestions((prev) => ({
        ...prev,
        laboratorio: matches.slice(0, 5),
      }));
      return;
    }

    if (field === "proyectoLabel") {
      const textValue = value as string;
      setProyectoLabel(textValue);
      const matches = proyectos
        .filter((p) => normalize(p.proyecto).includes(normalize(textValue)))
        .map((p) => p.proyecto);
      setSuggestions((prev) => ({
        ...prev,
        proyecto: matches.slice(0, 5),
      }));
      return;
    }

    setFormData((prev) => {
      let newValue: string | number | null | boolean = value;

      if (field.startsWith("id_")) {
        if (value === "" || value === 0) {
          // Para campos opcionales, usamos null en lugar de 0
          if (field === "id_laboratorio" || field === "id_proyecto") {
            newValue = null;
          } else {
            newValue = 0;
          }
        } else {
          newValue = Number(value);
        }
      }
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
          id_procesador: 0,
          id_sistema_operativo: 0,
        };
      }

      return { ...prev, [field]: newValue };
    });
  };

  const handleSuggestionSelect = (
    type: "adscripcion" | "laboratorio" | "proyecto",
    label: string
  ) => {
    if (type === "adscripcion") {
      const selected = adscripciones.find((a) => a.adscripcion === label);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          id_adscripcion: selected.id_adscripcion,
        }));
        setAdscripcionLabel(selected.adscripcion);
      }
    } else if (type === "laboratorio") {
      const selected = laboratorios.find((l) => l.laboratorio === label);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          id_laboratorio: selected.id_laboratorio,
        }));
        setLaboratorioLabel(selected.laboratorio);
      }
    } else if (type === "proyecto") {
      const selected = proyectos.find((p) => p.proyecto === label);
      if (selected) {
        setFormData((prev) => ({ ...prev, id_proyecto: selected.id_proyecto }));
        setProyectoLabel(selected.proyecto);
      }
    }

    setSuggestions((prev) => ({ ...prev, [type]: [] }));
  };

  const handleGuardar = async () => {
    const requiredFields = [
      { field: formData.inventario, name: "Inventario" },
      { field: formData.id_marca, name: "Marca" },
      { field: formData.id_tipo_equipo, name: "Tipo de equipo" },
      { field: formData.id_estado, name: "Estado" },
      { field: formData.id_uso, name: "Tipo de uso" },
      { field: formData.id_adscripcion, name: "Adscripción" },
    ];

    for (const { field, name } of requiredFields) {
      if (!field) {
        toast.error(`${name} es obligatorio`);
        return;
      }
    }

    if (formData.id_tipo_equipo === 9 && !formData.id_periferico) {
      toast.error("Periférico es obligatorio");
      return;
    }

    if (
      ![7, 8, 9].includes(formData.id_tipo_equipo) &&
      !formData.id_sistema_operativo
    ) {
      toast.error("Sistema operativo es obligatorio");
      return;
    }

    if (formData.id_tipo_equipo !== 9 && !formData.id_procesador) {
      toast.error("Procesador es obligatorio");
      return;
    }

    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const dataToSend = {
        ...formData,
        fechaFactura: new Date(formData.fechaFactura)
          .toISOString()
          .split("T")[0],
        antiguedad: formData.antiguedad || "0 años",
      };

      await axios.post(`${api_url}/equipos/crear`, dataToSend, { headers });
      toast.success("Equipo guardado correctamente");
      router.push("/escaner");
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        const mensaje = err.response.data?.message || "El equipo ya existe";
        toast.error(mensaje);
        return;
      }

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
              <label>Número de Inventario</label>
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

          {/* Columna Central */}
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
                    disabled={!formData.id_tipo_equipo}
                    value={formData.id_procesador}
                    onChange={(e) =>
                      handleInputChange("id_procesador", e.target.value)
                    }
                  >
                    <option value="">
                      {formData.id_tipo_equipo
                        ? "Selecciona procesador"
                        : "Selecciona primero el tipo de equipo"}
                    </option>
                    {PROCESADORES_POR_EQUIPO[formData.id_tipo_equipo]?.map(
                      (p) => (
                        <option key={p.id_procesador} value={p.id_procesador}>
                          {p.procesador}
                        </option>
                      )
                    )}
                  </select>
                </div>
                {!esTablet && (
                  <div className="formGroup">
                    <label>Sistema operativo</label>
                    <select
                      disabled={!formData.id_tipo_equipo}
                      value={formData.id_sistema_operativo}
                      onChange={(e) =>
                        handleInputChange(
                          "id_sistema_operativo",
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        {formData.id_tipo_equipo
                          ? "Selecciona sistema operativo"
                          : "Selecciona primero el tipo de equipo"}
                      </option>
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
                )}
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

            {/* Adscripción */}
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
              />
              {suggestions.adscripcion.length > 0 && (
                <ul className="suggestions">
                  {suggestions.adscripcion.map((s) => (
                    <li
                      key={s}
                      onClick={() => handleSuggestionSelect("adscripcion", s)}
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
            {/* Laboratorio */}
            <div className="formGroup">
              <label>Laboratorio</label>
              <select
                value={formData.id_laboratorio ?? ""}
                onChange={(e) =>
                  handleInputChange("id_laboratorio", e.target.value)
                }
              >
                <option value="">Selecciona un laboratorio</option>
                {laboratorios.map((lab) => (
                  <option key={lab.id_laboratorio} value={lab.id_laboratorio}>
                    {lab.laboratorio}
                  </option>
                ))}
              </select>
            </div>

            {/* Proyecto */}
            <div className="formGroup">
              <label>Proyecto</label>
              <select
                value={formData.id_proyecto ?? ""}
                onChange={(e) =>
                  handleInputChange("id_proyecto", e.target.value)
                }
              >
                <option value="">Selecciona un proyecto</option>
                {proyectos.map((proy) => (
                  <option key={proy.id_proyecto} value={proy.id_proyecto}>
                    {proy.proyecto}
                  </option>
                ))}
              </select>
            </div>

            {/* Lugar */}
            <div className="formGroup">
              <label>Lugar</label>
              <textarea
                placeholder="Ingresa lugar"
                value={formData.lugar}
                onChange={(e) => handleInputChange("lugar", e.target.value)}
                maxLength={200}
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
