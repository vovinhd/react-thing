import React, {Component} from 'react';
import {Button, Card, CardItem, Container, Content, Fab, H1, Icon, Left, Right, Text, Thumbnail} from "native-base";
import {Mutation, Query} from "react-apollo";
import {LIKE_POST, LOAD_FEED, UNLIKE_POST} from "../../network/FeedGql";
import Expo from "expo";
import {FlatList, RefreshControl} from "react-native";
import {defaultAvatar} from "./FeedScreen";
import PostWidget from "./PostWidget";

export default class FeedWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {active: true, refreshing: false};
    }

    cardMedia = (item) => {
        if (item.ytId) {
            return (
                <Text>TODO render yt embed here</Text>
            )
        } else if (item.media) {
            return (
                <Text>TODO render image here</Text>
            )
        }
    };

    bodyPreview = (item) => {
        if (!item.body) {
            return;
        }
        let preview = item.body.length > 140
            ? `${item.body.substr(0, 139)}...`
            : item.body;
        return (
            <Text>{preview}</Text>
        )
    };

    renderLikesButton = (item) => {
        if (item.currentUserLikedPost) {
            return (
                <Mutation mutation={UNLIKE_POST}
                          key={item.id}>
                    {(unlikePost) => {
                        return (
                            <LikesButton mutation={unlikePost} post={item}/>
                        )
                    }}
                </Mutation>
            )
        } else {
            return (
                <Mutation mutation={LIKE_POST}
                          key={item.id}
                >
                    {(likePost, {data}) => (
                        <LikesButton mutation={likePost} post={item}/>
                    )}
                </Mutation>
            )
        }
    }

    render() {
        return (
            <Container>
                <Query query={LOAD_FEED}>
                    {({loading, error, data, refetch}) => {
                        if (loading) return <Expo.AppLoading/>;
                        if (error) return <Text>`Error ${error.message}`</Text>;
                        return (

                            <Content refreshControl={<RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => refetch()}
                            />
                            }>
                                <FlatList
                                    data={data.posts}
                                    keyExtractor={(item, index) => item.id.toString()}
                                    renderItem={({item}) => (
                                        <Card icon key={item.id}>
                                            <CardItem>
                                                <Left>
                                                    <Button style={{backgroundColor: "rgba(0,0,0,0)"}}>
                                                        <Thumbnail circular
                                                                   source={{uri: item.author.avatar ? item.author.avatar.path : defaultAvatar}}/>
                                                    </Button>
                                                </Left>
                                            </CardItem>
                                            <CardItem>
                                                {this.cardMedia(item)}
                                            </CardItem>
                                            <CardItem>
                                                <H1>{item.title}</H1>
                                            </CardItem>
                                            <CardItem>
                                                {this.bodyPreview(item)}
                                            </CardItem>
                                            <CardItem>
                                                <Left>
                                                    {this.renderLikesButton(item)}
                                                </Left>
                                                <Button transparent
                                                        onPress={() => this.props.navigation.navigate('PostWidget', {postId: item.id})}>
                                                <Text>{item.commentCount} Kommentare</Text>
                                            </Button>
                                            <Right>
                                                <Button icon transparent
                                                        onPress={() => this.props.navigation.navigate('PostWidget', {postId: item.id})}>
                                                <Icon name="ios-more" style={{ /* this is a choice */
                                                    transform: [{rotate: '90deg'}]
                                                }}/>
                                            </Button>
                                        </Right>
                                        </CardItem>
                                        </Card>)}
                                        />
                                        </Content>
                                        )
                                    }
                                }
                            </Query>
                        <Fab style={{backgroundColor: '#5067FF'}}
                             position="bottomRight"
                             onPress={() => this.props.navigation.navigate('NewPostWidget')}>
                            <Icon name="share"/>
                        </Fab>
                    </Container>
                    )
                        ;
                    }
                    }

                    const LikesButton = ({mutation, post}) => {
                    return (
                    <Button transparent
                    onPress={async () => {
                        await mutation({variables: {postId: post.id}});
                    }}
                    >
                    <Text style={{color: post.currentUserLikedPost ? '#ff0000' : '#0000ff'}}>{post.sentiment} Likes</Text>
                    </Button>
                    )
                }
