import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import ElectionDescription from './ElectionDescription'
import PartyData from './PartyData';

// button style variable
const buttonStyle = {
    marginTop: "3em"
}

const ElectionDataContainer = (props) => {
    return(
        <Segment basic>
            <Grid centered columns={ 2 } stackable doubling> 
                <Grid.Row>
                    <Grid.Column width = { 5 }> 
                        <ElectionDescription /> 
                    </Grid.Column>
                    <Grid.Column width = { 9 }>
                        <PartyData loadMore= { props.loadMore } electionData= { props.electionData }/> 
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {/* If loadMore is true, button will not appear. If loadMore is false, the button will appear */}
                    { props.loadMore ? null :
                        (<Button style={ buttonStyle } size="big" onClick={ props.handleButtonClick }> Load More </Button>) 
                    }
                </Grid.Row>
            </Grid> 
        </Segment>
    )
}

export default ElectionDataContainer;