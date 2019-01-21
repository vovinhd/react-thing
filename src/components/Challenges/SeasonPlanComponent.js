import React, {Component} from 'react';
import {Body, Container, Header, Icon, Left, Right, Text, Title} from 'native-base';
import * as Constants from "expo";
import {Query} from "react-apollo";
import {CURRENT_SEASONPLAN} from "../../network/Challenges.gql";

export class SeasonPlanComponent extends Component {
    static navigationOptions = {
        title: 'Woche',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };

    render() {
        return (
            <Container>
                <Header style={{paddingTop: Constants.statusBarHeight}}>
                    <Left/>
                    <Body>
                    <Title>Challenges</Title>
                    </Body>
                    <Right/>
                </Header>
                <Query query={CURRENT_SEASONPLAN}>
                    {({loading, error, data, refetch}) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>Error {error.message}</Text>;
                        if (data.globalCurrentChallenges) {
                            const themenwoche = data.globalCurrentChallenges.themenwoche;
                            return <RenderThemenwocheComponent themenwoche={themenwoche}/>
                        }
                        return (
                            <Text>no current challenges!</Text>
                        )
                    }}
                </Query>
            </Container>
        );
    }
}

RenderThemenwocheComponent = ({themenwoche}) => {
    if (themenwoche) {
        return (
            <Text>{JSON.stringify(themenwoche, null, 2)}</Text>
        )
    } else {
        return (<Text>no themenwoche</Text>)
    }
};

class ChallengeComponent extends Component {
    render() {
        return (
            <Text>Challenge {JSON.stringify(this.props.challenge, null, 2)}</Text>
        )
    }
}