import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';
import {Button, Text} from "native-base";
import Expo from "expo";

class ProfileScreen extends Component {

    static navigationOptions = {
        title: 'Profile'
    };

    constructor(props) {
        super(props);
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

    _signOutAsync = async() => {
        await AsyncStorage.removeItem("userToken");
        this.props.navigation.navigate('Auth');
    };

    render() {
        if (this.state.loading) {
            return(<Expo.AppLoading/>)
        }
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>ProfileScreen</Text>
                <Button full primary onPress={this._signOutAsync}>
                    <Text>Sign Out!</Text>
                </Button>
            </View>
        );
    };

}

export default ProfileScreen;
