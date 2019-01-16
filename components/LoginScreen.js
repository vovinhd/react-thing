import React, {Component} from 'react';
import {AsyncStorage, Image, StyleSheet, View} from 'react-native'
import {Col, Row, Grid} from "react-native-easy-grid";
import {
    Button,
    Body,
    Form,
    Input,
    Label,
    Text,
    Item,
    Container,
    H1, H2, H3,
    Header,
    Content,
    CheckBox,
    Card,
    CardItem
} from "native-base";
import Expo, {Constants} from "expo";
import Api from "../network/api";
import {LinearGradient} from 'expo';

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
        console.log(this.props.navigation.state.params);
        if (!!this.props.navigation.state.params && !!this.props.navigation.state.params.email) {
            this.setState({email: this.props.navigation.state.params.email});
        }
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({loading: false});
    }

    signIn = async () => {

        Api.login(this.state.email, this.state.password,
            async (res) => {
                console.log(res.data);
                if (res.status === 200) {
                    await AsyncStorage.setItem('uId', res.data.id.toString());
                    await AsyncStorage.setItem('token', res.data.token);

                    this.props.navigation.navigate('App');
                }
            },
            (err) => {
                console.error(err);
            });

    };

    _checkUserExistsAsync = async (email) => {
        Api.checkEmailExists(email,
            (res) => {
            },
            (err) => {
            });
    };


    render() {
        if (this.state.loading) {
            return (<Expo.AppLoading/>)
        }
        return (
            <Container>
                <LinearGradient
                    colors={['#8dc2db', '#b8d497']}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={loginScreenStyles.container} contentContainerStyle={loginScreenStyles.row}>
                        <Grid style={{alignItems: 'flex-start'}}>
                            <Row size={1}>
                                <Image
                                    style={{flex: 1, height: undefined, width: undefined}}
                                    resizeMode="contain"
                                    source={require('../assets/KlimafuchsLogo.png')}
                                />
                            </Row>
                            <Row size={2}>
                                <Card style={loginScreenStyles.loginCard}>
                                    <CardItem style={loginScreenStyles.loginCardItem}>
                                        <H1>Login</H1>
                                    </CardItem>
                                    <CardItem style={loginScreenStyles.loginCardItem}>
                                        <Form style={{flex: 1}}>
                                            <Item regular style={loginScreenStyles.loginFormTextInput}>
                                                <Label>Email</Label>
                                                <Input name="email"
                                                       onChangeText={(text) => this.setState({email: text})}
                                                       value={this.state.email}/>
                                            </Item>

                                            <Item regular style={loginScreenStyles.loginFormTextInput}>
                                                <Label>Passwort</Label>
                                                <Input name="password"
                                                       onChangeText={(text) => this.setState({password: text})}
                                                       value={this.state.password}/>
                                            </Item>
                                        </Form>
                                    </CardItem>
                                    <CardItem style={loginScreenStyles.loginCardItem}>
                                        <H3 style={{color: 'blue'}}
                                            onPress={() => console.log(`${this.name}: register clicked!`)}>
                                            Registrieren
                                        </H3>
                                        <H3>|</H3>
                                        <H3 style={{color: 'blue'}}
                                            onPress={() => console.log(`${this.name}: forgot_password clicked!`)}>
                                            Passwort vergessen?
                                        </H3>
                                    </CardItem>
                                    <CardItem style={loginScreenStyles.loginCardItem}>
                                        <Text style={{color: 'blue'}}
                                              onPress={() => console.log(`${this.name}: eula clicked!`)}>
                                            AGBs
                                        </Text>
                                        <Text>|</Text>
                                        <Text style={{color: 'blue'}}
                                              onPress={() => console.log(`${this.name}: privacy clicked!`)}>
                                            Datenschutzerklärung
                                        </Text>
                                    </CardItem>
                                </Card>
                            </Row>
                            <Row size={1}>
                                <Button full primary style={{paddingBottom: 4}} onPress={() => this.signIn()}>
                                    <Text> Next </Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
                </LinearGradient>
            </Container>
        );
    };

}

const loginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(255,0,255,1)'
    },
    row: {},
    loginCard: {
        backgroundColor: 'rgba(230, 230, 230, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        shadowRadius: 5,
    },
    loginCardItem: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        padding: 10,
    },
    loginFormTextInput: {
        backgroundColor: 'rgba(255, 255, 255, .8)',
        margin: 10,
    },

});

export default LoginScreen;
