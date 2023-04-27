import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './NavigationBar'
import AllCurrencies from "./AllCurrencies";
import SingleCurrency from "./SingleCurrency";


class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allRates: {},
      initialCurrency: "",
      targetCurrency: "",
      amount: 0,
      result: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAll = this.handleSubmitAll.bind(this);
    this.handleInitialCurrencyChange = this.handleInitialCurrencyChange.bind(
      this
    );
    this.handleTargetCurrencyChange = this.handleTargetCurrencyChange.bind(
      this
    );
    this.handleSubmitSingle = this.handleSubmitSingle.bind(this);
  }

  componentDidMount() {
    fetch("https://api.frankfurter.app/latest")
      .then((response) => response.json())
      .then((data) => this.setState({ allRates: data.rates }));
  }

  handleChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleSubmitAll(event) {
    event.preventDefault();
    const initialCurrency = this.state.initialCurrency;
    const amount = this.state.amount;
    const allRates = this.state.allRates;
    const result = amount * allRates[initialCurrency];

    this.setState({ result: result.toFixed(2) });
  }

  handleInitialCurrencyChange(event) {
    this.setState({ initialCurrency: event.target.value });
  }

  handleTargetCurrencyChange(event) {
    this.setState({ targetCurrency: event.target.value });
  }

  handleSubmitSingle(event) {
    event.preventDefault();
    const initialCurrency = this.state.initialCurrency;
    const targetCurrency = this.state.targetCurrency;
    const amount = this.state.amount;
    const allRates = this.state.allRates;

    const initialRate = allRates[initialCurrency];
    const targetRate = allRates[targetCurrency];

    const result = ((amount / initialRate) * targetRate).toFixed(2);

    this.setState({ result: result });
  }

  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path="/">
              <AllCurrencies
                allRates={this.state.allRates}
                initialCurrency={this.state.initialCurrency}
                amount={this.state.amount}
                result={this.state.result}
                handleChange={this.handleChange}
                handleSubmitAll={this.handleSubmitAll}
                handleInitialCurrencyChange={this.handleInitialCurrencyChange}
              />
            </Route>
            <Route path="/single-currency">
              <SingleCurrency
                allRates={this.state.allRates}
                amount={this.state.amount}
                initialCurrency={this.state.initialCurrency}
                targetCurrency={this.state.targetCurrency}
                result={this.state.result}
                handleChange={this.handleChange}
                handleSubmitSingle={this.handleSubmitSingle}
                onInitialCurrencyChange={this.handleInitialCurrencyChange}
                onTargetCurrencyChange={this.handleTargetCurrencyChange}
              />
            </Route>
          </Switch>
        </div>
        <footer>
          <p>Created by Ian Key - Altcademy Student</p>
          <a href="https://github.com/ian-key">
            <img src="https://github.com/favicon.ico" alt="GitHub logo" />
          </a>
        </footer>
      </Router>
    );
  }
}

export default CurrencyConverter;
