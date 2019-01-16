import React, {Component} from 'react'
import Expo, {LinearGradient} from "expo";
import {
    Button,
    Card,
    CardItem,
    Container,
    Form,
    H1,
    H3,
    Input,
    Item,
    Label,
    Text,
    Toast,
    Header,
    Left,
    Right,
    Body,
    Icon
} from "native-base";
import {Image, View} from "react-native";
import {Grid, Row} from "react-native-easy-grid";
import {loginScreenStyles} from "./LoginScreen";

export class ForgotPasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    resetPassword = () => {
        if (this.state.email === '') return;
        Api.requestPasswordReset(this.state.email,
            (res) => {
                Toast.show({
                    text: 'STR_TOAST_PASSWD_RESET_SUCCESS',
                    buttonText: 'Okay'
                })
            },
            (err) => {
                console.error(err);
                Toast.show({
                    text: 'STR_TOAST_PASSWD_RESET_ERROR',
                    buttonText: 'Okay'
                })
            });
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onClick={() => {
                            this.props.navigation.navigate('LoginScreen', {email: this.state.email});
                        }}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>

                    </Body>
                    <Right>

                    </Right>
                </Header>
                <LinearGradient
                    colors={['#8dc2db', '#b8d497']}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={loginScreenStyles.container} contentContainerStyle={loginScreenStyles.row}>
                        <Grid style={{alignItems: 'flex-start'}}>

                            <Row size={2}>
                                <Card style={loginScreenStyles.loginCard}>
                                    <CardItem style={loginScreenStyles.loginCardItem}>
                                        <H1>Passwort zurücksetzen</H1>
                                    </CardItem>
                                    <CardItem style={loginScreenStyles.loginCardItem}>
                                        <Form style={{flex: 1}}>
                                            <Item regular style={loginScreenStyles.loginFormTextInput}>
                                                <Input name="email"
                                                       placeholder="eMail"
                                                       onChangeText={(text) => this.setState({email: text})}
                                                       value={this.state.email}/>
                                            </Item>

                                        </Form>
                                    </CardItem>

                                </Card>
                            </Row>
                            <Row size={1} style={loginScreenStyles.row}>
                                <Button primary style={loginScreenStyles.loginButton} onPress={() => this.signIn()}>
                                    <Text>Passwort zurücksetzen</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
                </LinearGradient>
            </Container>
        )
            ;
    }
}