import './editar.css';
export default function Home() {
  return (
    <div>
      


      <div className="recuadro">
        <form className="editar">
          {/* Columna 1 */}
          <div className="columna">
            <p className="titulo-rec">CPU</p>
            <div className="linea"></div>

            <label htmlFor="serie">Serie</label>
            <input type="text" id="serie" />

            <label htmlFor="marca">Marca</label>
            <input type="text" id="marca" />

            <label htmlFor="modelo">Modelo</label>
            <input type="text" id="modelo" />

            <label htmlFor="estado">Estado</label>
            <input type="text" id="estado" />
          </div>

          {/* Columna 2 */}
          <div className="columna">
            <p className="titulo-rec">Inventario:</p>
            <div className="linea"></div>

            <label htmlFor="sistema">Sistema Operativo</label>
            <input type="text" id="sistema" />

            <label htmlFor="procesador">Procesador</label>
            <input type="text" id="procesador" />

            <label htmlFor="uso">Tipo de uso</label>
            <input type="text" id="uso" />

            <label htmlFor="observaciones">Observaciones</label>
            <input type="text" id="observaciones" />
          </div>

          {/* Columna 3 */}
          <div className="columna">
            <p className="titulo-rec">Fecha Censo:</p>
            <div className="linea"></div>
            
            <label htmlFor="adscripcion">Adscripción</label>
            <input type="text" id="adscripcion" />

            <label htmlFor="responsable">Responsable</label>
            <input type="text" id="responsable" />

            <label htmlFor="lugar">Lugar</label>
            <input type="text" id="lugar" />
          </div>
        </form>
        <div className="botones">
          <button className="guardar">Guardar</button>
          <button className="cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
