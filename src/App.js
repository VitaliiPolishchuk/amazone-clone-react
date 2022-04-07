import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
import axios from "./axios";

const promise = loadStripe(
  "pk_test_51KUYDRJmJld1fPNvtos2lyIxNAehEmEfU2PfftOJfRwi1kMOlLW49nQ3MHSkAwhUg6KGOK2iaBf4GZk3KKl3xrL500nKYrXw2Q"
);

function App() {
  const [{ authTokens }, dispatch] = useStateValue();

  useEffect(async () => {
    if (authTokens) {
      const responseProfile = await axios({
        method: "get",
        url: `/user/profile`,
        headers: {
          Authorization: "Bearer " + authTokens.access,
        },
      });

      dispatch({
        type: "SET_USER",
        user: responseProfile.data.data,
      });
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
