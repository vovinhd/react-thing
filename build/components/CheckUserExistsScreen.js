var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Button, Container, Form, Input, Item as FormItem, Label, Text, } from 'native-base';
import Expo, { Constants } from "expo";
import Api from "../network/api";
class CheckUserExistsScreen extends Component {
    constructor(props) {
        super(props);
        this.componentWillMount = () => __awaiter(this, void 0, void 0, function* () {
            yield Expo.Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
            });
            this.setState({ loading: false });
        });
        this.checkUserExists = () => __awaiter(this, void 0, void 0, function* () {
            console.log("check " + this.state.email);
            console.log(this.state);
            Api.checkEmailExists(this.state.email, (res) => {
                console.log(res.data.status == true);
                if (res.status === 200) {
                    this.props.navigation.navigate(res.data.status === "true" ? 'LoginScreen' : 'SignUpScreen', { email: this.state.email });
                }
            }, (err) => {
                console.error(err);
            });
        });
        this.state = {
            loading: true,
            email: '',
        };
    }
    render() {
        if (this.state.loading) {
            return (React.createElement(Expo.AppLoading, null));
        }
        return (React.createElement(Container, { style: { paddingTop: Constants.statusBarHeight } },
            React.createElement(Form, null,
                React.createElement(FormItem, { floatingLabel: true },
                    React.createElement(Label, null, "Email"),
                    React.createElement(Input, { onChangeText: (text) => this.setState({ email: text }), value: this.state.email })),
                React.createElement(Button, { full: true, primary: true, style: { paddingBottom: 4 }, onPress: () => this.checkUserExists() },
                    React.createElement(Text, null, " Next ")))));
    }
    ;
}
CheckUserExistsScreen.navigationOptions = {
    title: 'Please sign in'
};
export default CheckUserExistsScreen;
//# sourceMappingURL=CheckUserExistsScreen.js.map