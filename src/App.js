import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      displayName:' ',
      latitude:' ', 
      longitude: ' ' ,
      
      show : false,
      error:''
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
    let axiResponse=await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.54c5bcb87e24270823ee985ff91c6f9c&city=${this.state.displayName} &format=json`);

  

   
    this.setState({ //to change the state of the propertes ,and change them with 
      displayName:axiResponse.data[0].display_name,
      latitude:axiResponse.data[0].lat,
      longitude : axiResponse.data[0].lon,
      show :!this.state.show,
      error:''
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
    <p>{this.state.error}</p>
    }
    
   
          

        
      </div>
    )
  }
}

export default App
