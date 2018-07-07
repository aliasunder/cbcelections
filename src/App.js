import React, { Component } from 'react';
import axios from 'axios';
import ElectionDataContainer from './ElectionDataContainer';
import uniqid from 'uniqid';

class App extends Component {
  constructor(){
    super();
    this.state = {
      electionData: [],
      loadMore: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  // on mount, get CBC elections data
  componentWillMount() {
    const electionURL = 'https://canopy.cbc.ca/live/election_hub2/ON/current_toplevel'

    axios.get(electionURL)
      .then(results => {
        // hold all election data in variable
        let electionData = results.data.data.parties;
        let partyObjectArray = []

        // create custom party objects with only data needed and push to an array
        electionData.forEach((party)=>{
          let partyObject = {}
          partyObject.name = party.englishCode;
          partyObject.electedSeats = party.electedSeats;
          partyObject.totalVotes = party.totalVotes;
          partyObject.seatDifference = (party.electedSeats) - (party.previousElected)
          partyObject.displayOrder = party.displayOrder;
          partyObject.key = uniqid();
          if (partyObject.displayOrder){
            partyObjectArray.push(partyObject)
          }
        })
        this.setState({
          electionData: partyObjectArray
        })
    })
    .catch(error => {
      console.log(error)
    })
  }

  // when "Load More" button is clicked, loadMore is set to true and additional party data will appear
  handleButtonClick(){
    this.setState({
      loadMore: true
    })
  }

  render() {
    let electionDataJSX;

    if (this.state.electionData === null || undefined){
      electionDataJSX  = <div> ...Loading </div>
    }
    else {
       electionDataJSX = <ElectionDataContainer handleButtonClick= { this.handleButtonClick } 
                                                electionData= { this.state.electionData }
                                                loadMore = { this.state.loadMore }
                          />
    }

    return (
      <div>
        { electionDataJSX }
      </div>
    );
  }
}

export default App;
