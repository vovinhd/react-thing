import React, {Component} from 'react';
import {View} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    Right,
    Text,
    Title
} from "native-base";
import {Mutation} from "react-apollo";
import {ADD_POST} from "../../network/FeedGql";
import UploadImage from "../UploadImage";

export default class NewPostWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', body: '', ytId: '', mediaId: undefined}
    }

    addHeader = (header) => {
        console.log(header)
        this.setState({mediaId: header.mediaId, ytId: header.ytId})
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
                                <MediaInput onSelected={this.addHeader}/>
                                <Item floatingLabel>
                                    <Label>Titel</Label>
                                    <Input name="title" onChangeText={(text) => this.setState({title: text})}
                                           value={this.state.title}/>
                                </Item>
                                <Item floatingLabel>
                                    <Label>Text</Label>
                                    <Input name="body" multiline onChangeText={(text) => this.setState({body: text})}
                                           value={this.state.body}/>
                                </Item>
                                <Button full primary style={{paddingBottom: 4}} onPress={() => {
                                    console.log({
                                        variables: {
                                            title: this.state.title,
                                            body: this.state.body,
                                            mediaId: this.state.mediaId
                                        }
                                    });
                                    addPost({
                                        variables: {
                                            title: this.state.title,
                                            body: this.state.body,
                                            mediaId: this.state.mediaId
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

class MediaInput extends Component {
    state = {
        awaitsMedia: false,
        awaitsYt: false,
    };

    reset = () => {
        if (this.props.onCancel) this.props.onCancel();
        this.setState({
            awaitsMedia: false,
            awaitsYt: false,
        })
    }

    render() {
        if (this.state.awaitsMedia) {
            return (
                <View style={{height: 400}}>
                    <UploadImage onCancel={this.reset} onUploadFinished={(media) => {
                        if (this.props.onSelected) {

                            this.props.onSelected({mediaId: media.id})
                        }
                    }}/>
                </View>
            )
        }
        if (this.state.awaitsYt) {
            return (
                <Text>yt</Text>
            )
        }
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Button style={{flex: 1}} onPress={() => {
                    this.setState({awaitsMedia: true});
                    if (this.props.onSelecting) this.props.onSelecting();
                }}>
                    <Text>
                        Bild hochladen
                    </Text>
                </Button>
                <Button style={{flex: 1}} disabled>
                    <Text>
                        Youtube-Video einbetten
                    </Text>
                </Button>
            </View>
        )
    }


}