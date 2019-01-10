import React, {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import {FlexStyle, StyleSheet} from "react-native";
import Expo, {Constants} from "expo";

class ChallengeScreen extends Component {
    static navigationOptions = {
        title: 'Challenge',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };
    render() {
        return (
            <Container>
                <Header/>
                <Content />
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="apps" />
                            <Text>Apps</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="camera" />
                            <Text>Camera</Text>
                        </Button>
                        <Button vertical active>
                            <Icon active name="navigate" />
                            <Text>Navigate</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person" />
                            <Text>Contact</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }

};
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        height: 54 + Constants.statusBarHeight,
    },
    fillparent: {
        flex: 1,
        flexDirection: 'column' as FlexStyle['flexDirection'],
        alignSelf: 'stretch' as FlexStyle['alignSelf'],
    }
});

export default ChallengeScreen;
