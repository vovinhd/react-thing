import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from "native-base";

class ChallengeScreen extends React.Component {
    static navigationOptions = {
        title: 'Challenge',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>ChallengeScreen</Text>
            </View>
        );
    }

};

export default ChallengeScreen;
