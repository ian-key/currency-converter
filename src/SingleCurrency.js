import React from "react";

class SingleCurrency extends React.Component {
  render() {
    const allRates = this.props.allRates;
    const currencyOptions = Object.keys(allRates).map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));

    return (
      <div>
        <h2>Single Currency Conversion</h2>
        <form onSubmit={this.props.handleSubmitSingle}>
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
              onChange={this.props.onInitialCurrencyChange}
            >
              <option value="">Choose Currency</option>
              {currencyOptions}
            </select>
          </label>
          <label>
            To:
            <select
              value={this.props.targetCurrency}
              onChange={this.props.onTargetCurrencyChange}
            >
              <option value="">Choose Currency</option>
              {currencyOptions}
            </select>
          </label>
          <input type="submit" value="Convert" />
        </form>
        <p>{this.props.result}</p>
      </div>
    );
  }
}

export default SingleCurrency;
