import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment/min/moment-with-locales';
import de from 'moment/locale/de';
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
import {ADD_COMMENT, LIKE_COMMENT, LOAD_POST, UNLIKE_COMMENT} from "../../network/FeedGql";
import Expo from "expo";
import {LikeButton} from "./FeedWidget";

moment.locale('de');

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
                                            <AddCommentWidget postId={data.post.id}/>
                                        </CardItem>
                                    </Card>
                                    <CommentTreeWidget comments={data.post.comments} postId={data.post.id}
                                                       refetch={refetch}/>

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

    renderButton() {
        if (this.props.compact) {
            return (
                <Button transparent
                        primary
                        small
                        onPress={() => {
                            this.setModalVisible();
                        }}>
                    <Icon name='md-chatbubbles'/>
                </Button>
            )
        } else {
            return (
                <Button transparent primary
                        onPress={() => {
                            this.setModalVisible();
                        }}>
                    <Icon name='md-chatbubbles'/>
                    <Text>Kommentieren</Text>
                </Button>
            )
        }
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
                                                    this.closeModal();
                                                    await addComment({
                                                        variables: {
                                                            postId: this.props.postId,
                                                            parentId: this.props.parentId,
                                                            body: this.state.body
                                                        }
                                                    });
                                                    if (this.props.refetch) this.props.refetch()
                                                }}>
                                            <Text> Kommentieren </Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                        )}
                    </Mutation>
                </Modal>
                {this.renderButton()}
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
                <View style={{borderLeftWidth: 1, borderLeftColor: '#68cdff'}}>
                    {currentNode.childComments.map(branch => this._walkTree(branch, recursionDepth - 1))}
                </View>
        }
        return (
            <View key={currentNode.id} style={{margin: 10}}>
                <CommentWidget comment={currentNode} postId={this.props.postId} refetch={this.props.refetch}/>
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
    LikeCommentButton = ({comment}) => {
        if (comment.currentUserLikesComment) {
            return (
                <Mutation mutation={UNLIKE_COMMENT}
                          key={comment.id}>
                    {(unlikeComment) => {
                        return (<Button transparent small
                                        onPress={async () => {
                                            await unlikeComment({variables: {commentId: comment.id}});
                                        }}
                            >
                                <Text style={{color: '#f00'}}>{comment.sentiment}</Text>
                                <Icon style={{color: '#f00'}} name="ios-heart"/>
                            </Button>
                        )
                    }}
                </Mutation>
            )
        } else {
            return (
                <Mutation mutation={LIKE_COMMENT}
                          key={comment.id}>
                    {(likeComment) => {
                        return (<Button transparent small
                                        onPress={async () => {
                                            await likeComment({variables: {commentId: comment.id}});
                                        }}
                            >
                                <Text style={{color: '#000'}}>{comment.sentiment}</Text>
                                <Icon style={{color: '#000'}} name="ios-heart-outline"/>
                            </Button>
                        )
                    }}
                </Mutation>

            )
        }
    }

    render() {
        let comment = this.props.comment;
        let displayedTime = moment(comment.dateCreated).fromNow();
        return (
            <Card transparent style={styles.commentCard}>
                <CardItem cardBody style={styles.commentCardText}>
                    <Text>{comment.body}</Text>
                </CardItem>
                <CardItem cardBody style={styles.commentCardActions}>
                    <Text>{`${displayedTime} von ${comment.author.screenName}`}</Text>
                    <this.LikeCommentButton comment={comment}/>
                    <AddCommentWidget postId={this.props.postId} parentId={comment.id}
                                      refetch={this.props.refetch} compact/>
                </CardItem>
            </Card>
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
    },
    commentCard: {
        margin: 0,
        padding: 0,
        backgroundColor: 'rgba(255,255,0,1)',
    },
    commentCardText: {
        backgroundColor: 'rgba(0,255,255,1)',

    },
    commentCardActions: {
        margin: 0,
        padding: 0,

        backgroundColor: 'rgba(255,0,255,1)',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
    }
});