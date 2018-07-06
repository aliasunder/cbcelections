import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid, Segment, Button } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      electionData: []
    }
    this.fetchElectionData = this.fetchElectionData.bind(this);
  }

  fetchElectionData(){
    const electionURL = 'https://canopy.cbc.ca/live/election_hub2/ON/current_toplevel'

    axios.get(electionURL)
      .then(results => {
        // hold all election data in variable
        let electionData = results.data.data.parties;
        let partyObjectArray = []

        console.log(results.data.data)

        // create custom party objects with only data needed and push to an array
        electionData.forEach((party)=>{
          let partyObject = {}
          partyObject.name = party.englishCode;
          partyObject.electedSeats = party.electedSeats;
          partyObject.totalVotes = party.totalVotes;
          partyObject.seatDifference = (party.electedSeats) - (party.previousElected)
          partyObject.displayOrder = party.displayOrder;
          partyObjectArray.push(partyObject)
        })
        this.setState({
          electionData: partyObjectArray
        })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="App">
      <Segment>
        <Button onClick = { this.fetchElectionData }> Fetch Election Data </Button>
        {this.state.electionsData}
       </Segment>
      </div>
    );
  }
}

export default App;
