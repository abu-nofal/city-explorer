import React, { Component } from 'react'
import WeatherDay from './WeatherDay'

class Weather extends Component {
    render() {
        return (
            < >

            
               
                <WeatherDay weatherData={this.props.weatherData}/>
               
            
    
            </>
        )
    }
}

export default Weather
