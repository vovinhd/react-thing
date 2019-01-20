import React, {Component} from 'react';
import {Body, Container, Header, Icon, Left, Right, Text, Title} from 'native-base';
import * as Constants from "expo";
import {Query} from "react-apollo";
import {CURRENT_CHALLENGES} from "../../network/Challenges.gql";

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
                <Query query={CURRENT_CHALLENGES}>
                    {({loading, error, data, refetch}) => {
                        return (
                            <Text>SeasonPlanComponent!</Text>
                        )
                    }}
                </Query>
            </Container>
        );
    }
}
