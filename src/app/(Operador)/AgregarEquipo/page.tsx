"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Para leer cookies en el cliente
import "../../styles/layout/agregarEquipo.scss";
import toast from "react-hot-toast";

export default function page() {
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
    marca: [] as string[],
    modelo: [] as string[],
    estado: [] as string[],
    adscripcion: [] as string[],
    tipoEquipo: [] as string[],
    sistemaOperativo: [] as string[],
    procesador: [] as string[],
    tipoUso: [] as string[],
  });

  const mostrarCamposComputadora = formData.tipoEquipo !== "Impresora";

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token"); // Token desde cookies
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
      }  catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast.error(err.response.data?.message || "Usuario o contraseña incorrectos")
        } else if (err.request) {
          toast.error("No se pudo conectar con el servidor")
        } else {
          toast.error("Ocurrió un error inesperado")
        }
      } else {
          toast.error("Ocurrió un error inesperado")
      }
    }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: string, value: string, options: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (value.length >= 3) {
      const filtered = options.filter((opt) =>
        opt.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions((prev) => ({ ...prev, [field]: filtered }));
    } else {
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
    }
  };

  const handleSelectSuggestion = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSuggestions((prev) => ({ ...prev, [field]: [] }));
  };

  const handleGuardar = () => {
    console.log("Formulario enviado:", formData);
    alert("Equipo guardado (vista solo)");
  };

  const handleCancelar = () => {
    alert("Acción cancelada");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let updated = { ...prev, [name]: value };
      if (value === "Impresora") {
        updated.sistemaOperativo = "";
        updated.procesador = "";
      }
      return updated;
    });
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
                onChange={(e) => setFormData({ ...formData, serie: e.target.value })}
              />
            </div>

            <div className="formGroup">
              <label>Marca</label>
              <input
                type="text"
                placeholder="Ingresa marca"
                value={formData.marca}
                onChange={(e) => handleInputChange("marca", e.target.value, marcas)}
              />
              {suggestions.marca.length > 0 && (
                <ul className="suggestions">
                  {suggestions.marca.map((s) => (
                    <li key={s} onClick={() => handleSelectSuggestion("marca", s)}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="formGroup">
              <label>Modelo</label>
              <input
                type="text"
                placeholder="Ingresa modelo"
                value={formData.modelo}
                onChange={(e) => handleInputChange("modelo", e.target.value, [])} 
              />
            </div>

            <div className="formGroup">
              <label>Tipo de equipo</label>
              <input
                type="text"
                placeholder="Selecciona tipo"
                value={formData.tipoEquipo}
                onChange={(e) =>
                  handleInputChange("tipoEquipo", e.target.value, tiposEquipo)
                }
              />
              {suggestions.tipoEquipo.length > 0 && (
                <ul className="suggestions">
                  {suggestions.tipoEquipo.map((s) => (
                    <li key={s} onClick={() => handleSelectSuggestion("tipoEquipo", s)}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="formGroup">
              <label>Estado</label>
              <input
                type="text"
                placeholder="Selecciona estado"
                value={formData.estado}
                onChange={(e) => handleInputChange("estado", e.target.value, estados)}
              />
              {suggestions.estado.length > 0 && (
                <ul className="suggestions">
                  {suggestions.estado.map((s) => (
                    <li key={s} onClick={() => handleSelectSuggestion("estado", s)}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Columna Centro */}
          <div className="column">
            <div className="formGroup">
              <label>Tipo uso</label>
              <input
                type="text"
                placeholder="Ingresa tipo de uso"
                value={formData.tipoUso}
                onChange={(e) => handleInputChange("tipoUso", e.target.value, tiposUso)}
              />
              {suggestions.tipoUso.length > 0 && (
                <ul className="suggestions">
                  {suggestions.tipoUso.map((s) => (
                    <li key={s} onClick={() => handleSelectSuggestion("tipoUso", s)}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {mostrarCamposComputadora && (
              <>
                <div className="formGroup">
                  <label>Procesador</label>
                  <input
                    type="text"
                    placeholder="Selecciona procesador"
                    value={formData.procesador}
                    onChange={(e) =>
                      handleInputChange("procesador", e.target.value, procesadores)
                    }
                  />
                  {suggestions.procesador.length > 0 && (
                    <ul className="suggestions">
                      {suggestions.procesador.map((s) => (
                        <li
                          key={s}
                          onClick={() => handleSelectSuggestion("procesador", s)}
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="formGroup">
                  <label>Sistema operativo</label>
                  <input
                    type="text"
                    placeholder="Selecciona sistema operativo"
                    value={formData.sistemaOperativo}
                    onChange={(e) =>
                      handleInputChange("sistemaOperativo", e.target.value, sistemasOperativos)
                    }
                  />
                  {suggestions.sistemaOperativo.length > 0 && (
                    <ul className="suggestions">
                      {suggestions.sistemaOperativo.map((s) => (
                        <li
                          key={s}
                          onClick={() =>
                            handleSelectSuggestion("sistemaOperativo", s)
                          }
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
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
                  handleInputChange("adscripcion", e.target.value, adscripciones)
                }
              />
              {suggestions.adscripcion.length > 0 && (
                <ul className="suggestions">
                  {suggestions.adscripcion.map((s) => (
                    <li key={s} onClick={() => handleSelectSuggestion("adscripcion", s)}>
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
                placeholder="Selecciona responsable"
                value={formData.responsable}
                onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
              />
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="column">
            <div className="formGroup">
              <label>Lugar</label>
              <textarea
                placeholder="Ingresa lugar"
                value={formData.lugar}
                onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                rows={5}
                className="textAreaLarge"
              />
            </div>
            <div className="formGroup">
              <label>Observaciones</label>
              <textarea
                placeholder="Ingresa observaciones"
                value={formData.observaciones}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                rows={5}
                className="textAreaLarge"
              />
            </div>
            <div className="formActions">
              <button type="button" className="btnGuardar" onClick={handleGuardar}>
                Guardar
              </button>
              <button type="button" className="btnCancelar" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
