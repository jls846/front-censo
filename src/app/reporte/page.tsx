import "./reporte.css";

export default function Reporte() {
  return (
    <div className="reporte-layout">
      {/* Panel izquierdo: título, buscador y tabla */}
      <div className="panel-izquierdo">
        <div className="titulo-reporte">
          <p>REPORTE</p>
        </div>

        <form action="/buscar" method="get">
          <input type="text" name="q" placeholder="Buscar equipo" />
          <button type="submit">Buscar</button>
        </form>

        <div className="tabla-rec">
          {/* Aquí irá tu tabla real */}
          <p>Tabla de equipos...</p>
        </div>
      </div>

      {/* Panel derecho: filtros + botón descargar */}
      <div className="panel-derecho">
        <div className="filtro-rec">
          <form className="editar">
            <p className="titulo-rec">Filtro</p>
            <div className="linea"></div>

            <label htmlFor="adscripcion">Adscripción</label>
            <select id="adscripcion">
              <option value="">Seleccione la adscripción</option>
              <option value="informatica">CEDETEC</option>
              <option value="administracion">Administración</option>
              <option value="biblioteca">Biblioteca</option>
              <option value="direccion">Dirección</option>
            </select>

            <label htmlFor="estado">Estado</label>
            <select id="estado">
              <option value="">Seleccione el estado del equipo</option>
              <option value="activo">Activo</option>
              <option value="mantenimiento">En Mantenimiento</option>
              <option value="baja">Dado de Baja</option>
              <option value="reparacion">En Reparación</option>
            </select>

            <label htmlFor="tipo">Tipo de Equipo</label>
            <select id="tipo">
              <option value="">Seleccione el tipo de equipo</option>
              <option value="cpu">CPU</option>
              <option value="laptop">Laptop</option>
              <option value="monitor">Monitor</option>
              <option value="impresora">Impresora</option>
              <option value="servidor">Servidor</option>
            </select>

            <label htmlFor="antiguedad">Antigüedad</label>
            <select id="antiguedad">
              <option value="">Seleccione la antigüedad del equipo</option>
              <option value="menos1">Menos de 1 año</option>
              <option value="1-3">1 a 3 años</option>
              <option value="3-5">3 a 5 años</option>
              <option value="mas5">Más de 5 años</option>
            </select>

            <div className="botones-filtro">
              <button type="reset" className="limpiar">
                Limpiar filtros
              </button>
              <button type="submit" className="aplicar">
                Aplicar filtros
              </button>
            </div>
          </form>
        </div>

        <button className="boton-descargar">Descargar</button>
      </div>
    </div>
  );
}