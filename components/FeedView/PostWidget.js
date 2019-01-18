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
    H1,
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
import {LikeButton} from "./FeedWidget";

export default class PostWidget extends Component {

    cardMedia = (post) => {
        if (post.ytId) {
            return (
                <Text>TODO render yt embed here</Text>
            )
        } else if (post.media) {
            return (
                <Text>TODO render image here</Text>
            )
        }
    };

    render() {
        return (
            <Container>
                <Query query={LOAD_POST} variables={{postId: this.props.navigation.getParam('postId')}}>
                    {({loading, error, data, refetch}) => {
                        if (loading) return <Expo.AppLoading/>;
                        if (error) {
                            console.log(error);
                            return <Text>`Error ${error.message}`</Text>;
                        }
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
                                            {this.cardMedia(data.post)}
                                        </CardItem>
                                        <CardItem>
                                            <H1>{data.post.title}</H1>
                                        </CardItem>
                                        <CardItem>
                                            <Text>{data.post.body}</Text>
                                        </CardItem>
                                        <CardItem last style={{flexDirection: 'row', flex: 1}}>
                                            <LikeButton post={data.post}/>
                                            <AddCommentWidget postId={data.post.id} refetch={refetch}/>
                                        </CardItem>
                                    </Card>
                                    <CommentTreeWidget comments={data.post.comments}/>

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


    closeModal() {
        this.setState({body: '', modalVisible: false});
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
                    <Mutation key={this.props.postId}
                              mutation={ADD_COMMENT}
                              update={(cache, {data: {addComment}}) => {
                                  const data = cache.readQuery({
                                      query: LOAD_POST,
                                      variables: {postId: this.props.postId}
                                  });
                                  console.log(data.post);
                                  console.log(addComment);
                                  data.post.comments.push(addComment);
                                  cache.writeQuery({
                                      id: this.props.postId,
                                      query: LOAD_POST,
                                      data
                                  });
                              }}
                    >
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
                                <CardItem last style={{backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row'}}>
                                    <Left style={{width: 'auto', flex: 1}}>
                                        <Button transparent info onPress={() => {
                                            this.closeModal();
                                        }}>
                                            <Text> Abbrechen </Text>

                                        </Button>
                                    </Left>
                                    <Right style={{width: 'auto', flex: 1}}>
                                        <Button transparent disabled={!this.state.body.length > 0}
                                                onPress={async () => {
                                                    await addComment({
                                                        variables: {
                                                            postId: this.props.postId,
                                                            parentId: this.props.parentId,
                                                            body: this.state.body
                                                        }
                                                    });
                                                    this.props.refetch();
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
                <Button transparent primary
                        onPress={() => {
                            this.setModalVisible();
                        }}>
                    <Icon name='md-chatbubbles'/>
                    <Text>Kommentieren</Text>
                </Button>
            </View>
        )
    }
}

class CommentTreeWidget extends Component {

    buildCommentTree = (comments) => {
        let tree = comments.filter((c) => !c.parent);
        let childComments = comments.filter((c) => c.parent);

        tree.forEach((branchRoot) => {
            this._buildCommentTree(comments, branchRoot, 9)
        });

        return tree;
    };

    _buildCommentTree = (comments, branch, recursionDepth) => {
        if (recursionDepth <= 0) return;
        let current = branch;
        if (!current.children) return;
        current["childComments"] = current.children.map(id => {
            return comments.find(c => {
                return c.id === id.id
            })
        });
        if (!current.childComments) return;

        current.childComments.forEach(child => this._buildCommentTree(comments, child, recursionDepth - 1));
    };

    walkTree = (commentTree) => {
        let tree = commentTree.map(branch => this._walkTree(branch, 20))
        return tree;
    };

    _walkTree = (currentNode, recursionDepth) => {
        let below;
        if (currentNode.childComments && currentNode.childComments.length > 0 && recursionDepth >= 0) {
            below =
                <View style={{marginLeft: 5}}>
                    {currentNode.childComments.map(branch => this._walkTree(branch, recursionDepth - 1))}
                </View>
        }
        return (
            <View key={currentNode.id}>
                <CommentWidget comment={currentNode}/>
                {below}
            </View>
        )
    };


    render() {
        //let result = this.walkTree(this.state.commentTree);
        //console.log(result);
        return (
            <View>
                {this.walkTree(this.buildCommentTree(this.props.comments))}
            </View>
        );
    }


}

class CommentWidget extends Component {
    render() {
        return (
            <Text>{this.props.comment.body}</Text>
        )
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