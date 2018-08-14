import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';
import {Button, Text} from "native-base";
import Expo from "expo";
import Api from "../network/api";

class SignUpScreen extends Component {

    static navigationOptions = {
        title: 'Please sign in'
    };

    constructor() {
        super();
        this.state = { loading: true };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ loading: false})
    }

    _signInAsync= async() => {
        await AsyncStorage.setItem('userToken', 'temp');
        this.props.navigation.navigate('App');
    };

    _checkUserExistsAsync = async(email) => {
        Api.checkEmailExists(email,
            (res) => {
        },
            (err) => {
        });
    };


    render() {
        if (this.state.loading) {
            return(<Expo.AppLoading/>)
        }
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>LoginScreen</Text>
                <Button full primary onPress={this._signInAsync}>
                    <Text>Sign in!</Text>
                </Button>
            </View>
        );
    };

}

export default SignUpScreen;
