import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllCurrencies from "./AllCurrencies";
import SingleCurrency from "./SingleCurrency";
import NavigationBar from "./NavigationBar";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={AllCurrencies} />
            <Route path="/single-currency" component={SingleCurrency} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

