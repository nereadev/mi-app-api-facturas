
import { DateTime } from "luxon";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <>
      <Container as="section" className="principal" fluid={true}>
        <Row as="header" className="cabecera">
          <Col as="h2">Listado de ingresos</Col>
        </Row>
        <main>
          <Row >
            <Col className="info-listado info-listado-top text-right">
              <label>Buscar:
              <input type="text" className="form-control form-control-sm" />
              </label>
            </Col>
          </Row>
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
            <tbody>
              <tr className="factura factura-dummy">
                <td className="numero"></td>
                <td className="fecha"></td>
                <td className="concepto"></td>
                <td><span className="base"></span>€</td>
                <td><span className="cantidad-iva"></span>€ (<span className="tipo-iva"></span>%)</td>
                <td><span className="total"></span>€</td>
                <td className="estado"></td>
                <td className="vencimiento"></td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="totales">
                <th className="text-right" colSpan="3">Totales:</th>
                <td><span className="total-bases"></span>€</td>
                <td><span className="total-ivas"></span>€</td>
                <td><span className="total-totales"></span>€</td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </main>
      </Container>
      <div className="loading off">
        <img src="img/loading.svg" alt="cargando" />
      </div>
    </>
  );
}

export default App;
