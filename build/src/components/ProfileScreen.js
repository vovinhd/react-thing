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
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Icon } from "native-base";
import Expo from "expo";
import UploadImage from "./UploadImage";
class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this._signOutAsync = () => __awaiter(this, void 0, void 0, function* () {
            yield AsyncStorage.removeItem('uId');
            yield AsyncStorage.removeItem('token');
            console.log("signed out");
            this.props.navigation.navigate('Auth');
        });
        this.state = { loading: true };
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
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
        return (React.createElement(Container, null,
            React.createElement(Header, null),
            React.createElement(Content, { padder: true },
                React.createElement(Card, { transparent: true },
                    React.createElement(CardItem, null,
                        React.createElement(Body, null,
                            React.createElement(Text, null, "ProfileScreen"),
                            React.createElement(UploadImage, null),
                            React.createElement(Button, { full: true, primary: true, onPress: this._signOutAsync },
                                React.createElement(Text, null, "Sign Out!"))))))));
    }
    ;
}
ProfileScreen.navigationOptions = {
    title: 'Profile',
    tabBarIcon: ({ focused, tintColor }) => (React.createElement(Icon, { name: 'home', style: { fontSize: 20, color: tintColor } })),
};
export default ProfileScreen;
//# sourceMappingURL=ProfileScreen.js.map