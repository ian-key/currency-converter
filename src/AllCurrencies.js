import React from "react";
import Table from 'react-bootstrap/Table';
class AllCurrencies extends React.Component {
  render() {
    const allRates = this.props.allRates;
    const currencyList = this.props.currencyList
    const tableRows = Object.entries(allRates).map(([currency, rate]) => (
      <tr key={currency}>
        <td>{currency}</td>
        <td>{rate}</td>
        <td>{(this.props.amount * rate).toFixed(2)}</td>
      </tr>
    ));
    const currencyOptions = Object.keys(currencyList).map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));

    return (
      <div>
        <h2>Currency Table</h2>
        <p>Enter an amount using the box below to see the equivalent values of all other currencies.</p>
        <form onSubmit={this.props.handleSubmitAll}>
          <label>
            Amount:
            <input
              type="number"
              value={this.props.amount}
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            From:
            <select
              value={this.props.initialCurrency}
              onChange={this.props.handleInitialCurrencyChange}
            >
              <option value="">Choose Currency</option>
              {currencyOptions}
            </select>
          </label>
          {/*<input type="submit" value="Convert" />*/}
        </form>
        <Table responsive>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </Table>
        {/*<p>{this.props.result}</p>*/}
      </div>
    );
  }
}
export default AllCurrencies;