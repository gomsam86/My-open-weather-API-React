import React, { Component } from "react";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherinfo: null,
      country: "",
      City: "",
      messege: "",
      hideResult: true,
      hideError: true
    };
  }

  getWeatherdetails = e => {
    debugger;
    e.preventDefault();

    const CountryCode = this.state.country;
    const Cityname = this.state.City;
    console.log(CountryCode);
    console.log(Cityname);

    if (CountryCode === "select" || CountryCode === "") {
      this.setState({ messege: "Please select country.." });
      this.setState({ hideError: false });
      return;
    } else if (Cityname === "") {
      this.setState({ messege: "Please enter city name.." });
      this.setState({ hideError: false });
      return;
    }

    this.setState({ hideError: true });

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          Cityname +
          "," +
          CountryCode +
          "&appid=defc307f092c285df6b2fe3ba130ea0d"
      )
      .then(res => {
        console.log(res);
        this.setState({
          weatherinfo: res.data.name + " is " + res.data.weather[0].main
        });
        this.setState({ hideResult: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ messege: "Something is wrong please try again.." });
        this.setState({ hideError: false });
        this.setState({ hideResult: true });
        // alert("Something is wrong please try again..");
      });
  };

  logChange = e => {
    debugger;
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const hideErrorStyle = this.state.hideError
      ? { display: "none" }
      : { display: "block" };
    const hideSuccesStyle = this.state.hideResult
      ? { display: "none" }
      : { display: "block" };
    return (
      <form>
        <div className="App">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col">
                <h1>Welcome to weather forcasting site</h1>
                <showMessge />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Country</label>
              <select
                name="country"
                onChange={this.logChange}
                className="form-control"
              >
                <option value="select">Select</option>
                <option value="SE">Sweden</option>
                <option value="DE">Germany</option>
                <option value="DK">Denmark</option>
                <option value="NO">Norway</option>
                <option value="FI">Finland</option>
                <option value="IE">Ireland</option>
                <option value="LV">Latvija</option>
                <option value="CH">Switzerland</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">City Name</label>
              <input
                type="text"
                name="City"
                onChange={this.logChange}
                placeholder="City name"
                className="form-control"
              />
            </div>

            <button
              type="button"
              value="Search"
              onClick={this.getWeatherdetails.bind(this)}
              className="btn btn-primary"
            >
              Search
            </button>

            <div className="form-group" />

            <div id="divSuccess" className="form-group" style={hideSuccesStyle}>
              <div className="alert alert-success" role="alert">
                {this.state.weatherinfo}
              </div>
            </div>

            <div id="divError" className="form-group" style={hideErrorStyle}>
              <div className="alert alert-danger" role="alert">
                {this.state.messege}{" "}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}