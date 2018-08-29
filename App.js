import React, {Component} from 'react';
import {AsyncStorage, StatusBar, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import LoginScreen from "./components/LoginScreen";
import ChallengeScreen from "./components/ChallengeScreen";
import ProfileScreen from "./components/ProfileScreen";
import SignUpScreen from "./components/SignUpScreen";
import CheckUserExistsScreen from "./components/CheckUserExistsScreen";
import {Provider} from "react-redux";

import store from "./persistence/store"
import TreeScreen from "./components/TreeScreen";
import FeedScreen from "./components/FeedScreen";

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootNavigation/>
            </Provider>
        )
    }
}

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
            </View>
        );
    }
}

class AuthLoadingScreen extends Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    async _bootstrapAsync() {
        const userToken = await AsyncStorage.getItem('token');
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

const AppNav = createMaterialBottomTabNavigator({
        FeedTab: {
            screen: FeedScreen
        },
        ChallengeTab: {
            screen: ChallengeScreen
        },
        ProgressTab: {
            screen: TreeScreen
        },
        ProfileTab: {
            screen: ProfileScreen
        }
    }, {
        activeTintColor: '#f0edf6',
        inactiveTintColor: '#105229',
        barStyle: {backgroundColor: '#179154'},
    }
);

const AuthNav = createStackNavigator({
        CheckUserExistsScreen: {
            screen: CheckUserExistsScreen
        },
        LoginScreen: {
            screen: LoginScreen
        },
        SignUpScreen: {
            screen: SignUpScreen
        },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'CheckUserExistsScreen',
    });

const RootNavigation = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppNav,
    Auth: AuthNav
}, {
    initialRouteName: 'AuthLoading'
});

export default Root;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
