import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Button, Container, Form, Input, Item as FormItem, Label, Text,} from 'native-base';
import Expo, {Constants} from "expo";
import Provider from "react-redux";
import Api from "../network/api";

class CheckUserExistsScreen extends Component {

    static navigationOptions = {
        title: 'Please sign in'
    };

    constructor() {
        super();
        this.state = {
            loading: true,
            action: "check",
            userData: {
                email: '',
                screenName: '',
                password: '',
                password2: '',
                gdprAccept: false,
                newsLetterAccept: false
            }
        };
    }

    componentWillMount = async () => {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({loading: false})
    };

    signIn = async () => {
        await AsyncStorage.setItem('userToken', 'temp');
        this.props.navigation.navigate('App');
    };

    checkUserExists = async () => {
        console.log("check " + this.state.userData.email);
        Api.checkEmailExists(this.state.userData.email,
            (res) => {
                console.log("ApiCall returned");
            },
            (err) => {
                console.error(err);
            });
    };

    renderForm(action) {
        switch (action) {
            case "check":
                return (
                    <Form>
                        <FormItem floatingLabel>
                            <Label>Email</Label>
                            <Input/>
                        </FormItem>
                        <Button full primary style={{paddingBottom: 4}} onPress={() => this.checkUserExists()}>
                            <Text> Next </Text>
                        </Button>
                    </Form>
                );
            case "login":
                return (<Text>login form</Text>);
            case "register":
                return (<Text>register form</Text>);
            default:
                return (<Text>unreachable</Text>);
        }
    }

    render() {
        if (this.state.loading) {
            return (<Expo.AppLoading/>)
        }

        var form = this.renderForm(this.state.action);
        return (
            <Container style={{paddingTop: Constants.statusBarHeight}}>
                {form}

            </Container>
        );
    };

}

export default CheckUserExistsScreen;
