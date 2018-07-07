import React from 'react';
import { Label, Card, Header } from 'semantic-ui-react';

// text style variables 
const textStyle = {
    fontSize: "5em"
}

const textPositive = {
    color: "blue"
}

const textNegative = {
    color: "orange"
}
const textNeutral = {
    color: "black"
}

// card style variables
const cardsWidth = {
    width: "45%"
}

const PartyData = (props)=>{
    let electionData = props.electionData;

    // sort party objects in array by display order
    electionData.sort((a,b)=>{
        if (a.displayOrder < b.displayOrder){
            return -1
        }
        if (a.displayOrder > b.displayOrder){
            return 1
        }
        return 0
    });

    // variable for top two parties in elected seats, 
    //next two parties in elected seats, and the rest of the parties
    let topTwoJSX = [];
    let nextTwoJSX = [];
    let restOfParties = [];

    // variable to track iterations through loop to push data to topTwoJSX
    let partyCount = 0

    // variable containing an array of all other parties (other than the top two)
    let otherJSX = []

    // create party cards with relevant data for top two parties
    electionData.forEach((party)=>{
        if (partyCount < 2) {
            topTwoJSX.push(
                <Card raised key={ party.key } style= { cardsWidth } fluid color="violet">
                    <Card.Content>
                        <Label  size ="huge"
                                basic 
                                color={ party.name === 'PC' ? "blue" : party.name === "LIB" ? "red" : party.name === "NDP" ? "orange" : party.name === 
                                "GRN" ? "green" : "grey"}> 
                                <p style = { textNeutral }>{ party.name }</p> 
                        </Label>
                        <Header textAlign="center" 
                                size="huge" 
                                style= { textStyle }>
                            { party.electedSeats }
                        </Header>
                    </Card.Content>
                    <Card.Content extra>
                        <p> { party.totalVotes } votes</p>
                        <p style={ party.seatDifference > 0 ? textPositive : textNegative }>{ party.seatDifference > 0 ? "+" : null} {party.seatDifference === 0 ? null : party.seatDifference }</p>
                    </Card.Content>
                </Card>
            )
            partyCount++
        }
        else {
            otherJSX.push(party)
        }
    })
  
    // reset party count 
    partyCount = 0

    // create party cards for the next two parties
    otherJSX.forEach((party)=>{
        if (partyCount < 2){
            nextTwoJSX.push(
                <Card key={ party.key } style= { cardsWidth }>
                    <Card.Content>
                        <Label  size ="huge"
                                basic 
                                color={ party.name === 'PC' ? "blue" : party.name === "LIB" ? "red" : party.name === "NDP" ? "orange" : party.name === 
                                "GRN" ? "green" : "grey"}> 
                                <p style = { textNeutral }>{ party.name }</p> 
                        </Label>
                        <Header textAlign="center" 
                                size="huge" 
                                style= { textStyle }>
                            { party.electedSeats }
                        </Header>
                    </Card.Content>
                    <Card.Content extra>
                        <p> { party.totalVotes } votes</p>
                        <p style={ party.seatDifference > 0 ? textPositive : textNegative }>{ party.seatDifference > 0 ? "+" : null} {party.seatDifference === 0 ? null : party.seatDifference }</p>
                    </Card.Content>
                </Card>
            )
            partyCount++
        }
        else {
            restOfParties.push(party)
        }
    })

    // create party cards with relevant data for the rest of the parties 
    let restOfPartiesJSX = restOfParties.map((party)=>{
        return <Card key={ party.key } style= { cardsWidth }>
                    <Card.Content>
                        <Label  size ="huge"
                                basic 
                                color={ party.name === 'PC' ? "blue" : party.name === "LIB" ? "red" : party.name === "NDP" ? "orange" : party.name === 
                                "GRN" ? "green" : "grey"}> 
                                <p style = { textNeutral }>{ party.name }</p> 
                        </Label>
                        <Header textAlign="center" 
                                size="huge" 
                                style= { textStyle }>
                            { party.electedSeats }
                        </Header>
                    </Card.Content>
                    <Card.Content extra>
                        <p> { party.totalVotes } votes</p>
                        <p style={ party.seatDifference > 0 ? textPositive : textNegative }>{ party.seatDifference > 0 ? "+" : null} {party.seatDifference === 0 ? null : party.seatDifference }</p>
                    </Card.Content>
                </Card>
    })

    let mainPartiesJSX = [...topTwoJSX, ...nextTwoJSX]

        // render party cards
        return( 
            <div>
                <Card.Group stackable  centered> { mainPartiesJSX } </Card.Group>
                {
                  (  props.loadMore ? (<Card.Group centered stackable> { restOfPartiesJSX } </Card.Group>) : null)
                }
            </div>

            
            
        )
    }

export default PartyData;