import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Card,Button, Form} from "react-bootstrap";
import Weather from "./components/Weather";
import Movies from "./components/Movies";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: " ",
      latitude: " ",
      longitude: " ",
      weatherData: [],
      show: false,
      error: "",
      moviesData: [],
    };
  }
  HandleDisplayName = (e) => {
    this.setState({
      displayName: e.target.value,
    });
  };
  SubmitForm = async (e) => {
    e.preventDefault(); // to not relode the page
    try {
      // ======================== for loction qi

      let KEY = process.env.REACT_APP_KEY_LOCTION;
      let axiResponse = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=${KEY}&city=${this.state.displayName} &format=json`
      );

      let lat = axiResponse.data[0].lat;
      let lon = axiResponse.data[0].lon;
      let KeyLocal = process.env.REACT_APP_BACKEND_URL;

      // ============================  for weather data

      let axiosWeaterResponce = await axios.get(
        `${KeyLocal}/weather?lat=${lat}&lon=${lon}`
      );

      // ============================== for movies

      let axiosMoviesResponce = await axios.get(
        `${KeyLocal}/movies?city=${this.state.displayName}`
      );

      this.setState({
        //to change the state of the propertes ,and change them with
        displayName: axiResponse.data[0].display_name,
        latitude: axiResponse.data[0].lat,
        longitude: axiResponse.data[0].lon,
        weatherData: axiosWeaterResponce.data,
        show: !this.state.show,
        error: "",
        moviesData: axiosMoviesResponce.data,
      });
    } catch {
      this.setState({
        error: "Error map not found",
      });
    }
    
  };


  render() {
    return (
      <div>
        <Form 
          onSubmit={(e) => {
            this.SubmitForm(e);
          }}
        >
          <input
            type="text"
            placeholder='enter city name'
            onChange={(e) => {
              this.HandleDisplayName(e);
            }}
          />
          
          <Button variant="dark" type="submit" > Eplore!</Button>
        </Form>
<br/>
        {this.state.show && (
        
          <Card style={{ width: "18rem" }}>
            <Card.Img
                variant="top"
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.54c5bcb87e24270823ee985ff91c6f9c&center=${this.state.latitude},${this.state.longitude}&zoom=18&format=png`}
                width="300px"
                height="300px"
              />
            <Card.Body>
              <Card.Title>{this.state.displayName}</Card.Title>
              <Card.Text>
                latitude: {this.state.latitude}
                
                longitude: {this.state.longitude}
              </Card.Text>
              
            </Card.Body>
          </Card>
          
        
        )
      }
      <br/>
      {this.state.show &&
        <Weather weatherData={this.state.weatherData} key="iddd" />
      }
      
        <Movies moviesData={this.state.moviesData} key="idx" />

        {<p>{this.state.error}</p>}
      </div>
    );
  }
}

export default App;
