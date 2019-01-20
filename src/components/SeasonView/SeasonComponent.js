import React, {Component} from 'react';
import {Container, Icon} from 'native-base';
import {Text} from "react-native";

export class SeasonComponent extends Component {
    static navigationOptions = {
        title: 'Woche',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };

    render() {
        return (
            <Container>
                <Text>SeasonComponent!</Text>
            </Container>
        );
    }
}
