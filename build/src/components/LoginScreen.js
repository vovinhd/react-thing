var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Button, Form, Input, Label, Text, Item as FormItem, Container, Header, Content } from "native-base";
import Expo, { Constants } from "expo";
import Api from "../network/api";
class LoginScreen extends Component {
    constructor() {
        super();
        this.signIn = () => __awaiter(this, void 0, void 0, function* () {
            Api.login(this.state.email, this.state.password, (res) => __awaiter(this, void 0, void 0, function* () {
                console.log(res.data);
                if (res.status === 200) {
                    yield AsyncStorage.setItem('uId', res.data.id.toString());
                    yield AsyncStorage.setItem('token', res.data.token);
                    this.props.navigation.navigate('App');
                }
            }), (err) => {
                console.error(err);
            });
        });
        this._checkUserExistsAsync = (email) => __awaiter(this, void 0, void 0, function* () {
            Api.checkEmailExists(email, (res) => {
            }, (err) => {
            });
        });
        this.state = {
            loading: true,
            email: '',
            password: ''
        };
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ email: this.props.navigation.state.params.email });
            console.log(this.props.navigation.state.params);
            yield Expo.Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
            });
            this.setState({ loading: false });
        });
    }
    render() {
        if (this.state.loading) {
            return (React.createElement(Expo.AppLoading, null));
        }
        return (React.createElement(Container, { style: { paddingTop: Constants.statusBarHeight } },
            React.createElement(Header, null),
            React.createElement(Content, null,
                React.createElement(Form, null,
                    React.createElement(FormItem, { floatingLabel: true },
                        React.createElement(Label, null, "Email"),
                        React.createElement(Input, { name: "email", disabled: true, onChangeText: (text) => this.setState({ email: text }), value: this.state.email })),
                    React.createElement(FormItem, { floatingLabel: true },
                        React.createElement(Label, null, "Passwort"),
                        React.createElement(Input, { name: "password", onChangeText: (text) => this.setState({ password: text }), value: this.state.password })),
                    React.createElement(Button, { full: true, primary: true, style: { paddingBottom: 4 }, onPress: () => this.signIn() },
                        React.createElement(Text, null, " Next "))))));
    }
    ;
}
LoginScreen.navigationOptions = {
    title: 'Please sign in'
};
export default LoginScreen;
//# sourceMappingURL=LoginScreen.js.map