var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { AsyncStorage, StatusBar, StyleSheet, Text, View } from "react-native";
export class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }
    _bootstrapAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Hello Typescript!");
            console.log("Is logged in?");
            const userToken = yield AsyncStorage.getItem('token');
            console.log("Logged In");
            this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, null, "AuthLoadingScreen"),
            React.createElement(StatusBar, { barStyle: "default" })));
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
//# sourceMappingURL=AuthLoadingScreen.js.map