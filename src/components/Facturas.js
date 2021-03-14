import { DateTime } from "luxon";
import PropTypes from "prop-types";

const Facturas = (props) => {
  const {
    datosApiFiltrados,
    cambiarFormatoFecha,
    calcularIva,
    calcularTotal,
    calcularVencimiento
  } = props;
  return (
    <tbody>
      {
        datosApiFiltrados.map(factura => (
          <tr key={factura.id}>
            <td>{factura.numero}</td>
            <td>{cambiarFormatoFecha(factura.fecha)}</td>
            <td>{factura.concepto}</td>
            <td>{factura.base + "€"}</td>
            <td>{calcularIva(factura.base, factura.tipoIva)}</td>
            <td>{calcularTotal(factura.base, factura.tipoIva)}</td>
            <td className=
              {factura.abonada ? " verdadero" : " falso"}>
              {factura.abonada ? "Abonada" : "Pendiente"}</td>
            <td className=
              {factura.vencimiento < DateTime.now() ? " verdadero" : " falso"}>
              {factura.abonada ?
                "-" :
                calcularVencimiento(factura.vencimiento)}</td>
          </tr>
        ))
      }
    </tbody>
  );
};

Facturas.propTypes = {
  datosApiFiltrados: PropTypes.array.isRequired,
  cambiarFormatoFecha: PropTypes.func.isRequired,
  calcularIva: PropTypes.func.isRequired,
  calcularTotal: PropTypes.func.isRequired,
  calcularVencimiento: PropTypes.func.isRequired
};

export default Facturas;
