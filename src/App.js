
function App() {
  return (
    <>
      <section class="principal container-fluid">
        <header className="cabecera row">
          <h2 className="col">Listado de ingresos</h2>
        </header>
        <main>
          <div className="row">
            <div className="info-listado info-listado-top col text-right">
              <label>
                Buscar
            <input type="text" className="form-control form-control-sm">
          </label>
        </div>
            </div>
            <table className="listado table table-striped table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th className="col-min">Num.</th>
                  <th className="col-med">Fecha</th>
                  <th className="col-concepto">Concepto</th>
                  <th className="col-med">Base</th>
                  <th className="col-max">IVA</th>
                  <th className="col-med">Total</th>
                  <th className="col-max">Estado</th>
                  <th className="col-max">Vence</th>
                </tr>
              </thead>
              <tbody className="lista-facturas">
                <tr className="lista-dummy">
                  <td className="numero">1000</td>
                  <td className="fecha">13/06/2018</td>
                  <td className="concepto">App Angular</td>
                  <td className="base">3000€</td>
                  <td className="iva">630€ (21%)</td>
                  <td className="total">3630€</td>
                  <td className="estado table-success">Abonada</td>
                  <td className="vence table-success">-</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="text-right" colspan="3">Totales:</th>
                  <td className="base-total">5000€</td>
                  <td className="iva-total">5000€</td>
                  <td className="resultado-total">5000€</td>
                  <td colspan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </main>
      </section>
      <div className="loading off">
        <img src="img/loading.svg" alt="cargando" />
      </div>
    </>
  );
}

export default App;
