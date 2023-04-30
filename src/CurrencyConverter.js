import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './NavigationBar';
import AllCurrencies from "./AllCurrencies";
import SingleCurrency from "./SingleCurrency";
import Chart from 'chart.js';


class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allRates: {},
      currencyList: {},
      initialCurrency: 'GBP',
      targetCurrency: 'USD',
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
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    fetch("https://api.frankfurter.app/latest?from=" + this.state.initialCurrency)
      .then((response) => response.json())
      .then((data) => this.setState({ allRates: data.rates }));
      this.getCurrencyList();
      this.getHistoricalRates(this.state.initialCurrency, this.state.targetCurrency);
  }

  handleChange(event) {
    this.setState({ amount: event.target.value });
  }

  getCurrencyList() {
    fetch("https://api.frankfurter.app/currencies")
    .then((response) => response.json())
    .then((data) => this.setState({ currencyList: data }));
  }

  handleAdditionalFetch = (base) => {
    fetch(`https://api.frankfurter.app/latest?from=${base}`)
      .then((response) => response.json())
      .then((data) => this.setState({ allRates: data.rates }));
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
    const initialCurrency = event.target.value
    this.setState({ initialCurrency });
    this.handleAdditionalFetch(initialCurrency);
    this.getHistoricalRates(initialCurrency, this.state.targetCurrency);
  }

  handleTargetCurrencyChange(event) {
    const targetCurrency = event.target.value
    this.setState({ targetCurrency });
    this.getHistoricalRates(this.state.initialCurrency, targetCurrency);
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
    this.getHistoricalRates(this.state.initialCurrency, this.state.targetCurrency);
  }

  getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }
  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
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
                currencyList={this.state.currencyList}
                initialCurrency={this.state.initialCurrency}
                amount={this.state.amount}
                result={this.state.result}
                handleChange={this.handleChange}
                handleSubmitAll={this.handleSubmitAll}
                handleInitialCurrencyChange={this.handleInitialCurrencyChange}
                onInitialCurrencyChange={this.handleInitialCurrencyChange}
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
                chartRef={this.chartRef}
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
