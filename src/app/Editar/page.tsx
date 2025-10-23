import "../styles/layout/editar.scss";
export default function Page() {
  return (
    <form className="editar">
      <div className="columna">
        <label htmlFor="serie">Serie</label>
        <input type="text" id="serie" />
        <label htmlFor="marca">Marca</label>
        <input type="text" id="marca" />
        <label htmlFor="modelo">Modelo</label>
        <input type="text" id="modelo" />
        <label htmlFor="estado">Estado</label>
        <input type="text" id="estado" />
      </div>

      <div className="columna">
        <label htmlFor="so">Sistema Operativo</label>
        <input type="text" id="so" />
        <label htmlFor="procesador">Procesador</label>
        <input type="text" id="procesador" />
        <label htmlFor="tipoUso">Tipo de uso</label>
        <input type="text" id="tipoUso" />
        <label htmlFor="observaciones">Observaciones</label>
        <input type="text" id="observaciones" />
      </div>

      <div className="columna">
        <label htmlFor="adscripcion">Adscripción</label>
        <input type="text" id="adscripcion" />
        <label htmlFor="responsable">Responsable</label>
        <input type="text" id="responsable" />
        <label htmlFor="lugar">Lugar</label>
        <input type="text" id="lugar" />
      </div>
    </form>
  );
}
