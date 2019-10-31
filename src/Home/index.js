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

  weatherIcon = weather => {
    if (weather === "Clear") return faSun;
    if (weather === "Clouds") return faCloud;
    if (weather === "Rain" || weather === "Drizzle") return faCloudRain;
    if (weather === "Snow") return faSnowflake;
  };

  displayWidget = city => {
    let date = new Date();
    console.log("date is :", date);
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
        <div className="city-name">{city.name}</div>
        <div className="city-temp">{city.temp}°C</div>
      </li>
    );
  };

  render() {
    let listWidget = this.props.cities.map(this.displayWidget);
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
