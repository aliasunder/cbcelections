import React from 'react';
import { Segment, Divider, Header } from 'semantic-ui-react';
import './ElectionDescription.css';

// text and card style variables
const cardStyle = {
    backgroundColor: "#f8f8f9",
}

const headerStyle = {
    fontSize: "3em",
    paddingBottom: "0.5em"
}

const descriptionStyle = {
    fontSize: "1.5em"
}

const ElectionDescription = ()=>{
    return (
        <Segment className="news__font" style={ cardStyle } basic>
            <Segment basic>
                <Header style= { headerStyle }> Ontario voters head to the polls June 7 </Header>
                <Divider />
                <Segment basic style={ descriptionStyle }>
                    <p> Ontarians are heading to the polls on June 7 to vote for the next
                        provincial government. Television coverage begins at 8:30 p.m. ET
                        on CBC News Network and CBC Television. We'll run a livestream at
                        the top of this page.
                    </p>
                </Segment>
            </Segment>
        </Segment>
    )
}

export default ElectionDescription;