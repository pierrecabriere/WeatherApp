import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/index";
import "./index.scss";
import { getWeatherFromCity } from "../services/getWeatherFromCity";
import { connect } from "react-redux";
import { addCity, removeCity } from "../actions/cityActions";

const API_TOKEN = "4051ce7fe1ef8cb0d6d4bf227e129df3";

class Settings extends React.Component {
  state = {
    cityToAdd: "",
    cityToRemove: "",
    errorCaught: false
  };
  addCity = async e => {
    console.log("ENTER IN ADD CITY");
    e.preventDefault();
    const responseFromApi = await getWeatherFromCity(
      this.state.cityToAdd,
      API_TOKEN
    );
    console.log("response from api :", responseFromApi);
    if (responseFromApi !== "ERROR") {
      this.setState({
        errorCaught: false
      });
      const weatherFromApi = responseFromApi.weather;
      const tempFromApi = responseFromApi.main;
      const weather = weatherFromApi[0];
      const newCity = {
        name: this.state.cityToAdd,
        temp: Math.round(tempFromApi.temp - 273),
        weather: weather.main,
        icon: weather.icon
      };
      this.props.addCity(newCity);
      this.setState({ cityToAdd: "" });
      console.log("CITY ADDED");
    } else if (responseFromApi === "ERROR") {
      this.setState({
        errorCaught: true
      });
    }
  };

  removeCity = () => {
    this.props.removeCity(this.state.cityToRemove);
    this.setState({ cityToRemove: "" });
    console.log("REMOVE : ", this.state.cityToRemove);
  };

  displayCityItem = city => {
    let classNameCity = "city-item";
    if (this.state.cityToRemove.name === city.name) {
      classNameCity = classNameCity + " city-selected";
    }
    return (
      <li key={city.name} onClick={() => this.setState({ cityToRemove: city })}>
        <div className={classNameCity}>{city.name}</div>
      </li>
    );
  };
  render() {
    console.log("state in settings is : ", this.state);
    let listCities = this.props.cities.map(this.displayCityItem);
    return (
      <div className="settings">
        <Header title="Settings" />
        <div className="settings-content">
          <div className="settings-content-back">
            <Link to="/">
              <button>Back to home page</button>
            </Link>
          </div>
          <div className="settings-content-add">
            <form onSubmit={this.addCity}>
              <input
                placeholder="Enter a city"
                value={this.state.cityToAdd}
                onChange={e => this.setState({ cityToAdd: e.target.value })}
              />
              <button type="submit">Add</button>
              {this.state.errorCaught ? "Enter a valid city name" : null}
            </form>
          </div>
          <div className="settings-content-remove">
            <ul>{listCities}</ul>
            <button onClick={() => this.removeCity()}>Remove</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  addCity: addCity,
  removeCity: removeCity
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Settings);
