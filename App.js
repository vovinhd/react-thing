import React, {Component} from 'react';
import {AsyncStorage, StatusBar, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {Container, Content, StyleProvider, Root} from 'native-base';
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import LoginScreen from "./components/LoginScreen";
import ChallengeScreen from "./components/ChallengeScreen";
import ProfileScreen from "./components/ProfileScreen";
import SignUpScreen from "./components/SignUpScreen";
import CheckUserExistsScreen from "./components/CheckUserExistsScreen";
import {Provider} from "react-redux";
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import store from "./persistence/store"
import TreeScreen from "./components/TreeScreen";
import FeedScreen from "./components/FeedView/FeedScreen";
import {LoggedInScreen} from "./components/LoggedInScreen";
import {ForgotPasswordScreen} from "./components/ForgotPasswordScreen";

class AppRoot extends Component {
    render() {
        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(material)}>
                    <Root>
                        <RootNavigation/>
                    </Root>
                </StyleProvider>
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
        ForgotPasswordScreen: {
            screen: ForgotPasswordScreen
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'LoginScreen',
    });

const RootNavigation = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: LoggedInScreen,
    Auth: AuthNav
}, {
    initialRouteName: 'AuthLoading'
});

export default AppRoot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
