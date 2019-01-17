import React, {Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {Query} from "react-apollo";
import {LOAD_POST} from "../../network/FeedGql";
import Expo from "expo";

export default class PostWidget extends Component {

    render() {
        return (
            <Container>
                <Query query={LOAD_POST} variables={{postId: this.props.navigation.getParam('postId')}}>
                    {({loading, error, data}) => {
                        if (loading) return <Expo.AppLoading/>;
                        if (error) return <Text>`Error ${error.message}`</Text>;
                        return (
                            <Container>
                                <Header>
                                    <Left>
                                        <Button transparent
                                                onPress={() => this.props.navigation.navigate('FeedWidget')}>
                                            <Icon name='arrow-back'/>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Title>{data.post.title}</Title>
                                    </Body>
                                    <Right/>
                                </Header>
                                <Content>
                                    <Text>{data.post.body}</Text>
                                </Content>
                            </Container>
                        )
                    }}
                </Query>
            </Container>
        );
    }
}