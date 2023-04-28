import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        <p>Enter an amount and pick a starting and target currency. Click 'Convert' to see the latest conversion amount.</p>
        <form onSubmit={this.props.handleSubmitSingle}>
        <Container>
          <Row className="align-content-center">
            <Col>

          <label>
            Amount:
            <input
              type="number"
              value={this.props.amount}
              onChange={this.props.handleChange}
            />
          </label>
          </Col>
          <Col>
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
          </Col>
          <Col>
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
          </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
            <input type="submit" value="Convert" />
            </Col>
            <Col>
            <p>Conversion: {this.props.result}</p>
            </Col>
          </Row>
          </Container>
        </form>
        <div>
          <p></p>
        </div>
      </div>
    );
  }
}

export default SingleCurrency;
