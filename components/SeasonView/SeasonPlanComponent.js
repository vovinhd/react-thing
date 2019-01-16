import React, {Component} from 'react';
import {Container, Icon, Header, Body, Left, Right, Text, Title} from 'native-base';
import * as Constants from "expo";

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
                    <Title>Header</Title>
                    </Body>
                    <Right/>
                </Header>
                <Text>SeasonPlanComponent!</Text>
            </Container>
        );
    }
}
