import React, {Component} from 'react';
import {AsyncStorage, StatusBar, StyleSheet, Text, View} from "react-native";

interface IMyComponentProps {
    navigation
}

interface IMyComponentState {
}

export class AuthLoadingScreen extends Component<IMyComponentProps, IMyComponentState> {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    async _bootstrapAsync() {
        console.log("Hello Typescript!");
        console.log("Is logged in?");
        const userToken = await AsyncStorage.getItem('token');
        console.log("Logged In");
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>AuthLoadingScreen</Text>
                <StatusBar barStyle="default"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
