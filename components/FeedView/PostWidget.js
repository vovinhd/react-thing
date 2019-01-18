import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {
    Body,
    Button,
    Card,
    CardItem,
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
    Title,
    Toast
} from "native-base";
import {Mutation, Query} from "react-apollo";
import {ADD_COMMENT, LOAD_POST} from "../../network/FeedGql";
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
                                    <Card>
                                        <CardItem>
                                            <Text>{data.post.body}</Text>
                                        </CardItem>
                                    </Card>

                                    <AddCommentWidget postId={data.post.id}/>
                                    <CommentTreeWidget commentTree={data.post.comments}/>

                                </Content>

                            </Container>
                        )
                    }}
                </Query>
            </Container>
        );
    }
}

class AddCommentWidget extends Component {
    state = {
        modalVisible: false,
        body: ''
    };

    setModalVisible() {
        this.setState({modalVisible: true});
    }

    cancelComment() {
        this.setState({body: '', modalVisible: false});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={styles.modal}
                    onRequestClose={() => {
                        this.cancelComment(false);
                        Toast.show({
                            text: "Modal closed",
                        });
                    }}>
                    <Mutation id={this.props.postId} mutation={ADD_COMMENT}>
                        {(addComment, {data}) => (
                            <Card transparent style={styles.modalContent}>
                                <CardItem first style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                                    <Form style={{flex: 1}}>
                                        <Item floatingLabel>
                                            <Label>Text</Label>
                                            <Input name="comment"
                                                   onChangeText={(text) => this.setState({body: text})}
                                                   value={this.state.body}/>
                                        </Item>
                                    </Form>
                                </CardItem>
                                <CardItem last style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                                    <Left>
                                        <Button onPress={() => {
                                            this.cancelComment();
                                        }}>
                                            <Text> Abbrechen </Text>

                                        </Button>
                                    </Left>
                                    <Right>
                                        <Button onPress={() => {
                                            addComment({
                                                variables: {
                                                    postId: this.props.postId,
                                                    parentId: this.props.parentId,
                                                    body: this.state.body
                                                }
                                            });
                                            this.closeModal();
                                        }}>
                                            <Text> Kommentieren </Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                        )}
                    </Mutation>
                </Modal>
                <Button
                    onPress={() => {
                        this.setModalVisible();
                    }}>
                    <Text>Kommentieren</Text>
                </Button>
            </View>
        )
    }


}

class CommentTreeWidget extends Component {
    render() {
        return (<Text>CommentTreeWidget</Text>)

    }
}

class CommentWidget extends Component {
    render() {
        return (<Text>CommentWidget</Text>)
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        margin: 0,
    },
    modalContent: {
        margin: 45, // This is the important style you need to set
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,1)',
        height: 'auto',
        flex: 0,
        padding: 10
    }
});