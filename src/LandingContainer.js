import React, { Component } from 'react';
import $ from 'jquery'

export default class LandingContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentLocation: '',
      weatherInfo: {},
      goodOrBad: ''
    }
  }
  handleSubmit(){
    event.preventDefault()
    var zipcode = this.refs.zipcode.value
    var url = 'http://api.wunderground.com/api/0fb3bafa90d81d9c/conditions/q/' + zipcode + '.json'
    $.getJSON(url).then( (response)=> {
      var weatherJSON = response.current_observation
      var parsedJSON = this.parseJSONResponse(weatherJSON)
      this.setState({currentLocation: weatherJSON.display_location.full, weatherInfo: parsedJSON, goodOrBad: this.calculateWeather(parsedJSON) })
      debugger
    })
    debugger
  }

  parseJSONResponse(weatherJSON){
    return ({
    feelslike_f: Number(weatherJSON.feelslike_f),
    precip_1hr_in: Number(weatherJSON.precip_1hr_in),
    relative_humidity: Number(weatherJSON.relative_humidity.split("%")[0]),
    temp_f: Number(weatherJSON.temp_f),
    weather_description: weatherJSON.weather,
    wind_mph: Number(weatherJSON.wind_mph),
    forecast_url: weatherJSON.forecast_url
    })
  }

  calculateWeather(weatherInfo){
    return this.checkGoodTemp(weatherInfo.feelslike_f) && this.checkNoRain(weatherInfo.precip_1hr_in) && this.checkNoHumidity(weatherInfo.relative_humidity, weatherInfo.temp_f) && this.checkNoWind(weatherInfo.wind_mph) ? 'good' : 'bad'
  }

  checkGoodTemp(feelslike_f){
    if (feelslike_f < 40) {
      return false
    } else if (feelslike_f > 95){
      return false
    } else {
      return true
    }
  }

  checkNoRain(precip_1hr_in){
    if (precip_1hr_in > 0){
      return false
    } else {
      return true
    }
  }

  checkNoHumidity(relative_humidity, temp_f) {
    if (relative_humidity > 90 && temp_f > 80 ){
      return false
    } else {
      return true
    }
  }

  checkNoWind(wind_mph) {
    if (wind_mph >= 6){
      return false
    } else {
      return true
    }
  }

  displayResponse(goodOrBad){
    const RESULTS = {
      good: ['Sure.', 'It\'s pleasant out.', 'Go ahead!', 'No reason not to.', 'Get off your ass.', 'Hell ya.'],
      bad: ['Hell no.', 'It\'s DISGUSTING out.', 'Netflix and chill?', 'Are you out of your goddamned mind?', 'LOL...no', 'X-Files is on Neflix.']
    }
    let randomNum = Math.floor(Math.random() * 6)
    debugger
    if (goodOrBad.length > 0 ) {
    return goodOrBad === 'good' ?  RESULTS.good[randomNum] : RESULTS.bad[randomNum]
    }
  }

  changeBackgroundImage(goodOrBad){

  }
  getCurrentWeather(zipcode){
    // const URL = 'http://api.wunderground.com/api/0fb3bafa90d81d9c/conditions/q/' + zipcode + '.json'

  }
  render(){
    return(
      <div className='landing container col-xs-12'>
        <h1>Should I Go Outside?</h1>
        <div>
          <h3>Please input your zipcode:</h3>
          <input min='0' max='99999' ref='zipcode' type='number' placeholder='000000'/>
          <input type='submit' value='Tell me good news' onClick={this.handleSubmit.bind(this)}/>
        </div>
        <div className='results container'>
          <h3>{this.state.currentLocation.length > 0 ? this.state.currentLocation : null }</h3>
          <div>{this.displayResponse(this.state.goodOrBad)}</div>
        </div>
      </div>
    )
  }
}
