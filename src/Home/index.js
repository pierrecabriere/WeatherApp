import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/index";
import "./index.scss";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudSun,
  faCloudRain,
  faSnowflake
} from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {
  state = {
    inputCity: ""
  };

  handleChangeInput = e => {
    this.setState({
      inputCity: e.target.value
    });
  };

  // Used to determine which icon from FontAwesome is needed
  weatherIcon = weather => {
    switch (weather) {
      case "Clear":
        return faSun;
      case "Clouds":
        return faCloud;
      case "Rain":
      case "Drizzle":
        return faCloudRain;
      case "Snow":
        return faSnowflake;
    }
  };

  displayWidget = city => {
    return (
      <li key={city.name} className="city">
        <div className="city-weatherIcon">
          <img
            src={`http://openweathermap.org/img/w/${city.icon}.png`}
            alt="weather-logo"
            className="weatherIcon"
          />
          {/* <FontAwesomeIcon icon={this.weatherIcon(city.weather)} /> */}
        </div>
        <div className="city-name">
          <div className="city-title">
            {city.name}, {city.country}
          </div>
          <div className="city-infos">
            <div className="city-infos-1">
              <span>Humidity : {city.infos.humidity} %</span>
              <span>T°(C) max : {city.infos.temp_max} °C</span>
            </div>
            <div className="city-infos-2">
              <span>Pressure : {city.infos.pressure} hPa</span>
              <span>T°(C) min : {city.infos.temp_min} </span>
            </div>
          </div>
        </div>
        <div className="city-temp">{city.infos.temp}°C</div>
      </li>
    );
  };

  render() {
    let listWidget = this.props.cities
      .filter(city => city.name.includes(this.state.inputCity))
      .map(this.displayWidget);
    console.log("props are :", this.props.cities);
    return (
      <div className="home">
        <Header title="Home" />
        <div className="home-content">
          <div className="home-content-input">
            <input
              placeholder="Search a city"
              onChange={e => this.handleChangeInput(e)}
            ></input>
            <Link to="/settings">
              <button>Settings</button>
            </Link>
          </div>
          <div className="home-content-widgets">
            <ul className="home-content-widgets-list">{listWidget}</ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Home);
