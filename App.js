import React, {Component} from 'react';
import {AsyncStorage, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {Root, StyleProvider} from 'native-base';
import LoginScreen from "./src/components/PreLogin/LoginScreen";
import SignUpScreen from "./src/components/PreLogin/SignUpScreen";
import CheckUserExistsScreen from "./src/components/PreLogin/CheckUserExistsScreen";
import {Provider} from "react-redux";
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import store from "./src/persistence/store"
import {LoggedInScreen} from "./src/components/LoggedInScreen";
import {ForgotPasswordScreen} from "./src/components/PreLogin/ForgotPasswordScreen";
import Expo from "expo";

export default class AppRoot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({loading: false});
    }

    render() {
        if (this.state.loading) {
            return (
                <Expo.AppLoading/>
            )
        }
        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(material)}>
                    <SafeAreaView style={styles.safeArea}>
                        <Root>
                            <AppDelegate/>
                        </Root>
                    </SafeAreaView>
                </StyleProvider>
            </Provider>
        )
    }
}

class AppDelegate extends Component {
    state = {
        userToken: undefined,
    };

    async componentDidMount() {
        const userToken = await AsyncStorage.getItem('token');
        console.log(userToken ? "is logged in" : "is logged out");
        console.log(store.getState)
    }

    render() {
        return (this.state.userToken ? <LoggedInScreen/> : <AuthNav/>)
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: material.brandInfo
    }
});
