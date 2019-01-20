import React, {Component} from 'react';
import {Container, Icon} from 'native-base';
import {Text} from "react-native";

export class HistoryComponent extends Component {
    static navigationOptions = {
        title: 'Trophäen',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='md-trophy' style={{fontSize: 20, color: tintColor}}/>
        ),
    };

    render() {
        return (
            <Container>
                <Text>HistoryComponent!</Text>
            </Container>
        );
    }
}
