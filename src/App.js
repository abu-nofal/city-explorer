import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap';
import Weather from './components/Weather';
import Movies from './components/Movies';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      displayName:' ',
      latitude:' ', 
      longitude: ' ' ,
      weatherData:[],
      show : false,
      error:'',
      moviesData:[]
    }
  }
  HandleDisplayName=(e)=>{
    this.setState({
      displayName:e.target.value
    })
  }
  SubmitForm=async (e)=>{
    e.preventDefault();// to not relode the page
    try{

      // ======================== for loction qi 
    let axiResponse=await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.54c5bcb87e24270823ee985ff91c6f9c&city=${this.state.displayName} &format=json`);
    
    let lat=axiResponse.data[0].lat;
    let lon=axiResponse.data[0].lon;
      let KeyLocal=process.env.REACT_APP_BACKEND_URL
    // ============================for weather data 
    let axiosWeaterResponce=await axios.get(`${KeyLocal}/weather?lat=${lat}&lon=${lon}`)
    // console.log(axiosWeaterResponce.date)
  
  // =========================for movies 
    let axiosMoviesResponce=await axios.get(`${KeyLocal}/movies?city=${this.state.displayName}`)
    // console.log(axiosMoviesResponce.data)
   
    this.setState({ //to change the state of the propertes ,and change them with 
      displayName:axiResponse.data[0].display_name,
      latitude:axiResponse.data[0].lat,
      longitude : axiResponse.data[0].lon,
      weatherData: axiosWeaterResponce.data,
      show :!this.state.show,
      error:'',
      moviesData:axiosMoviesResponce.data
           })
          }
          catch{
            this.setState({
              error:'Error map not found'
            })
          }


     }
  render() {
    return (
      <div>
        <form onSubmit={(e)=>{this.SubmitForm(e)}}>
          <input type='text' onChange={(e)=>{this.HandleDisplayName(e)}} /> 
          <button >Explore!</button>
        </form>
        
        { this.state.show &&
              <Card style={{ width: '18rem' }}>
        
        <Card.Body>
          
          <Card.Title>{this.state.displayName}</Card.Title>
          <Card.Text>
           latitude:   {this.state.latitude}<br/>
          longitude:  {this.state.longitude }
          </Card.Text>
          <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.54c5bcb87e24270823ee985ff91c6f9c&center=${this.state.latitude},${this.state.longitude}&zoom=18&format=png`} width='300px' height='300px' />
        </Card.Body>
      </Card>  
      
    }
    {
      this.state.weatherData.map(value=>{
        return  <Weather desc={value.description} date={value.date} />
      })
    }
    {
      this.state.moviesData.map(value=>{
        return  <Movies average_votes={value.average_votes} image_url={value.image_url} 
        popularity={value.popularity}   released_on={value.released_on}  total_votes={value.total_votes}/>
      })

    }
   
    {
    <p>{this.state.error}</p>
    }
    
   
          

        
      </div>
    )
  }
}

export default App
