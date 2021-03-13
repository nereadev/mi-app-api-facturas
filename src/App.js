
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Totales from "./components/Totales";
import useFetch from "./components/useFetch";



function App() {

  const { datosApi } = useFetch(`${process.env.REACT_APP_API_URL}`);
  const datosApiFiltrados = datosApi.filter(facturas => facturas.tipo === "ingreso");
  console.log(datosApiFiltrados);

  const cambiarFormatoFecha = (fecha) => {
    const nuevaFecha = DateTime.fromMillis(Number(fecha)).toLocaleString();
    return nuevaFecha;
  };

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
              {
                datosApiFiltrados.map(facturas => (
                  <tr key={facturas.id}>
                    <td>{facturas.numero}</td>
                    <td>{cambiarFormatoFecha(facturas.fecha)}</td>
                    <td>{facturas.concepto}</td>
                    <td>{facturas.base}</td>
                    <td>{facturas.tipoIva}</td>
                    <td>{facturas.total}</td>
                    <td>{facturas.abonada}</td>
                    <td>{cambiarFormatoFecha(facturas.vencimiento)}</td>
                  </tr>
                ))
              }
            </tbody>
            <Totales />
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
