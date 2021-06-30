import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class WeatherDay extends Component {
    render() {
        return (
            <div>

<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      
      <th>description</th>
      <th>date</th>
      
    </tr>
    </thead>
  <tbody>
      {
          this.props.weatherData.map(value=>{
              return (<tr>
                
                <td>{value.description}</td>
                <td>{value.date}</td>
              
              </tr>)
          })
      }
    
    </tbody>
  
</Table>

                
            </div>
        )
    }
}

export default WeatherDay
