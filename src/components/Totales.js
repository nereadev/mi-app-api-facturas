const Totales = (props) => {

  return (<tfoot>
    <tr className="totales">
      <th className="text-right" colSpan="3">Totales:</th>
      <td><span className="total-bases"></span>€</td>
      <td><span className="total-ivas"></span>€</td>
      <td><span className="total-totales"></span>€</td>
      <td colSpan="2"></td>
    </tr>
  </tfoot>);
};
export default Totales;
