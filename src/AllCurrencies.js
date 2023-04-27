import React from "react";
class AllCurrencies extends React.Component {
  render() {
    const allRates = this.props.allRates;
    const tableRows = Object.entries(allRates).map(([currency, rate]) => (
      <tr key={currency}>
        <td>{currency}</td>
        <td>{rate}</td>
        <td>{(this.props.amount * rate).toFixed(2)}</td>
      </tr>
    ));

    return (
      <div>
        <h2>All Currencies</h2>
        <form onSubmit={this.props.handleSubmitAll}>
          <label>
            Amount:
            <input
              type="number"
              value={this.props.amount}
              onChange={this.props.handleChange}
            />
          </label>
          <input type="submit" value="Convert" />
        </form>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        <p>{this.props.result}</p>
      </div>
    );
  }
}
export default AllCurrencies;