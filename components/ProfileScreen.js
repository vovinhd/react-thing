import React, {Component} from 'react';
import {AsyncStorage, View, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Icon } from "native-base";import Expo from "expo";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import UploadImage from "./UploadImage";

class ProfileScreen extends Component {

    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='home' style={{fontSize: 20, color: tintColor}}/>
        ),
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
        await AsyncStorage.removeItem('uId');
        await AsyncStorage.removeItem('token');
        console.log("signed out");
        this.props.navigation.navigate('Auth');
    };

    render() {
        if (this.state.loading) {
            return(<Expo.AppLoading/>)
        }
        return (
            <Container>

                <Header />
                <Content padder>
                    <Card transparent>
                        <CardItem>
                            <Body>
                            <Text>ProfileScreen</Text>
                            <UploadImage/>
                            <Button full primary onPress={this._signOutAsync}>
                                <Text>Sign Out!</Text>
                            </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>


        );
    };

}

export default ProfileScreen;
