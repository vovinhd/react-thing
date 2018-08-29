import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Button, Form, Input, Label, Text, Item as FormItem, Container, Header, Content, CheckBox} from "native-base";
import Expo, {Constants} from "expo";
import Api from "../network/api";

class LoginScreen extends Component {

    static navigationOptions = {
        title: 'Please sign in'
    };

    constructor() {
        super();
        this.state = {
            loading: true,
            email: '',
            password: ''
        };
    }

    async componentWillMount() {
        this.setState({ email: this.props.navigation.state.params.email});
        console.log(this.props.navigation.state.params);
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ loading: false});
    }

    signIn = async() => {

        Api.login(this.state.email, this.state.password,
            async (res) => {
                console.log(res.data);
                if(res.status === 200) {
                    await AsyncStorage.setItem('uId', res.data.id.toString());
                    await AsyncStorage.setItem('token', res.data.token);

                    this.props.navigation.navigate('App');
                }
            },
            (err) => {
                console.error(err);
            });

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
            <Container style={{paddingTop: Constants.statusBarHeight}}>
                <Header/>
                <Content>
                    <Form>
                        <FormItem floatingLabel>
                            <Label>Email</Label>
                            <Input name="email" disabled onChangeText={(text) => this.setState({email: text})}
                                   value={this.state.email}/>
                        </FormItem>
                        <FormItem floatingLabel>
                            <Label>Passwort</Label>
                            <Input name="password" onChangeText={(text) => this.setState({password: text})}
                                   value={this.state.password}/>
                        </FormItem>
                        <Button full primary style={{paddingBottom: 4}} onPress={() => this.signIn()}>
                            <Text> Next </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    };

}

export default LoginScreen;
