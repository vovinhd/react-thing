import React, {Component} from 'react';
import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {StyleProvider} from 'native-base';
import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import CheckUserExistsScreen from "./components/CheckUserExistsScreen";
import {Provider} from "react-redux";
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import store from "./persistence/store"
import {LoggedInScreen} from "./components/LoggedInScreen";
import {AuthLoadingScreen} from "./components/AuthLoadingScreen";

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(material)}>
                    <RootNavigation/>
                </StyleProvider>
            </Provider>
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
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerTransparent: true,
        },
        initialRouteName: 'CheckUserExistsScreen',
    });

const RootNavigation = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: LoggedInScreen,
    Auth: AuthNav
}, {
    initialRouteName: 'AuthLoading'
});

export default Root;

