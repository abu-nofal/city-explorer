import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super();
    this.state={
      displayName:' ',
      latitude:' ', 
      longitude: ' '  
    }
  }
  HandleDisplayName=(e)=>{
    this.setState({
      displayName:e.target.value
    })
  }
  SubmitForm=async (e)=>{
    e.preventDefault();// to not relode the page
    let axiResponse=await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.54c5bcb87e24270823ee985ff91c6f9c&city=${this.state.displayName} &format=json`)


    // console.log(axiResponse.data)
    this.setState({ //to change the state of the propertes ,and change them with 
      displayName:axiResponse.data[0].display_name,
      latitude:axiResponse.data[0].lat,
      longitude : axiResponse.data[0].lon


    })
    


  }
  render() {
    return (
      <div>
        <form onSubmit={(e)=>{this.SubmitForm(e)}}>
          <input type='text' onChange={(e)=>{this.HandleDisplayName(e)}}/> 
          <button >Explore!</button>
        </form>
        


              <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{this.state.displayName}</Card.Title>
          <Card.Text>
           latitude:   {this.state.latitude}<br/>
          longitude:  {this.state.longitude }
          </Card.Text>
          
        </Card.Body>
      </Card>
      
          {/* <h2>Name:  {this.state.displayName}</h2> */}
          

        
      </div>
    )
  }
}

export default App
