import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Item,
    Header,
    Icon,
    Input,
    Label,
    Left,
    Right, Text,
    Title
} from "native-base";
import {Mutation} from "react-apollo";
import {ADD_POST} from "../../network/FeedGql";
import gql from "graphql-tag";

export default class NewPostWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', body: ''}
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('FeedWidget')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Add Post</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Mutation mutation={ADD_POST}>
                        {(addPost, {data}) => (
                            <Form>
                                <Item floatingLabel>
                                    <Label>Titel</Label>
                                    <Input name="email" onChangeText={(text) => this.setState({title: text})}
                                           value={this.state.title}/>
                                </Item>
                                <Item floatingLabel>
                                    <Label>Text</Label>
                                    <Input name="password" onChangeText={(text) => this.setState({body: text})}
                                           value={this.state.body}/>
                                </Item>
                                <Button full primary style={{paddingBottom: 4}} onPress={() => {
                                    addPost({
                                        variables: {
                                            title: this.state.title,
                                            body: this.state.body
                                        }
                                    });
                                    this.props.navigation.navigate('FeedWidget')
                                }}>
                                    <Text> Next </Text>
                                </Button>
                            </Form>
                        )}
                    </Mutation>
                </Content>
            </Container>

        )
    }
}
