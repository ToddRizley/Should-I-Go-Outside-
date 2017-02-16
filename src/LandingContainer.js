import React, { Component } from 'react';
import $ from 'jquery'

export default class LandingContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentLocation: '',
      displayAnswer: ''
    }
  }
  handleSubmit(){
    event.preventDefault()
    var zipcode = this.refs.zipcode.value
    var url = 'http://api.wunderground.com/api/0fb3bafa90d81d9c/conditions/q/' + zipcode + '.json'
    $.getJSON(url).then( (response)=> {
      this.setState({currentLocation: response.current_observation.display_location.full})
      debugger
  })

    debugger

  }

  displayResponse(){

  }

  changeBackgroundImage(){

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

        </div>
      </div>
    )
  }
}
