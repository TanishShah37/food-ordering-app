import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import swal from 'sweetalert';
import LandingPage from "../landing-page/LandingPage";
import MainPage from "../main-page/MainPage";
import About from "../about/About";
import RestaurantDetails from "../restaurantDetails/RestaurantDetails";
import { useHistory } from "react-router-dom";
import Payment from "../credit-card/Payment";

function MyRoute() {
  const history = useHistory();

  const [cityName, setCityName] = useState("");
  const [res, setRes] = useState("");

  const cityNameFromInputField = (cityName) => {
    setCityName(cityName);
    if (cityName === "") {
      swal({
        text: "Please fill correct city Name",
        icon: "warning",
      });
    } else {
      history.push("/restaurant");
    }
  };

  const getAboutPage = () => {
    history.push("/about");
  };

  const getRestaurantDetails = (resDetails) => {
    setRes(resDetails);
    if (resDetails) {
      history.push(`/restaurant${resDetails}`);
    }
  };

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <LandingPage getCityName={cityNameFromInputField} />}
        />
      </Switch>
      <Switch>
        <Route
          path="/restaurant"
          component={() => (
            <MainPage
              data={cityName}
              about={getAboutPage}
              resMain={getRestaurantDetails}
            />
          )}
        />
      </Switch>
      <Switch>
        <Route path="/about" component={About} />
      </Switch>
      <Switch>
        <Route path="/payment:firebaseUid" component={Payment} />
      </Switch>

      <Switch>
        <Route
          path="/restaurant:id"
          component={() => <RestaurantDetails res={res} />}
        />
      </Switch>
    </div>
  );
}
export default MyRoute;
