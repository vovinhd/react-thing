import React, {Component} from 'react';
import {Button, Card, CardItem, Container, Content, Fab, H1, Icon, Left, Right, Text, Thumbnail} from "native-base";
import {Mutation, Query} from "react-apollo";
import {LIKE_POST, LOAD_FEED, UNLIKE_POST} from "../../network/FeedGql";
import {FlatList, RefreshControl} from "react-native";
import {defaultAvatar} from "./FeedScreen";
import PostWidget from "./PostWidget";

export default class FeedWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {active: true, refreshing: false};
        this.pageSize = props.pageSize || 10;
    }

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

    bodyPreview = (post) => {
        if (!post.body) {
            return;
        }
        let preview = post.body.length > 140
            ? `${post.body.substr(0, 139)}...`
            : post.body;
        return (
            <Text>{preview}</Text>
        )
    };


    render() {
        return (
            <Container>
                <Query query={LOAD_FEED}
                       variables={{page: {first: this.pageSize, after: ""}}}
                       fetchPolicy="cache-and-network"
                >
                    {({loading, error, data, refetch, fetchMore}) => {
                        let spinner;
                        if (loading) {
                            spinner = <Text>Loading...</Text>
                        } else {
                            spinner = <Text>More</Text>
                        }
                        if (error) return <Text>`Error ${error.message}`</Text>;
                        return (

                            <Content refreshControl={<RefreshControl
                                refreshing={this.state.refreshing || loading}
                                onRefresh={() => refetch()}
                            />
                            }>
                                <FlatList
                                    data={data.paginatedPosts ? data.paginatedPosts.page.edges : []}
                                    keyExtractor={(item, index) => item.node.id.toString()}
                                    renderItem={({item}) => {
                                        const post = item.node;
                                        return (
                                            <Card icon key={post.id}>
                                                <CardItem>
                                                    <Left>
                                                        <Button style={{backgroundColor: "rgba(0,0,0,0)"}}>
                                                            <Thumbnail circular
                                                                       source={{uri: post.author.avatar ? post.author.avatar.path : defaultAvatar}}/>
                                                        </Button>
                                                    </Left>
                                                </CardItem>
                                                <CardItem>
                                                    {this.cardMedia(post)}
                                                </CardItem>
                                                <CardItem>
                                                    <H1>{post.title}</H1>
                                                </CardItem>
                                                <CardItem>
                                                    {this.bodyPreview(post)}
                                                </CardItem>
                                                <CardItem>
                                                    <Left>
                                                        <LikeButton post={post}/>
                                                    </Left>
                                                    <Button transparent
                                                            onPress={() => this.props.navigation.navigate('PostWidget', {postId: post.id})}>
                                                        <Text>{post.commentCount} Kommentare</Text>
                                                    </Button>
                                                    <Right>
                                                        <Button icon transparent
                                                                onPress={() => this.props.navigation.navigate('PostWidget', {postId: post.id})}>
                                                            <Icon name="ios-more" style={{ /* this is a choice */
                                                                transform: [{rotate: '90deg'}]
                                                            }}/>
                                                        </Button>
                                                    </Right>
                                                </CardItem>
                                            </Card>)
                                    }
                                    }
                                />
                                <Button full light onPress={() => {
                                    const lastCursor = data.paginatedPosts.page.edges[data.paginatedPosts.page.edges.length - 1].cursor;
                                    console.log(lastCursor)
                                    fetchMore({
                                        variables: {
                                            page: {
                                                first: this.pageSize,
                                                after: lastCursor
                                            }
                                        },
                                        updateQuery: (prev, {fetchMoreResult}) => {
                                            if (!fetchMoreResult) return prev;
                                            return Object.assign(data.paginatedPosts.page, prev, {
                                                edges: [...prev.paginatedPosts.page.edges, ...fetchMoreResult.paginatedPosts.page.edges]
                                            });
                                        }
                                    })
                                }}>{spinner}</Button>
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

export class LikeButton extends Component {
    likesButton = ({mutation, post}) => {
        return (
            <Button transparent
                    onPress={async () => {
                        await mutation({variables: {postId: post.id}});
                    }}
            >
                <Text style={{color: post.currentUserLikesPost ? '#ff0000' : '#0000ff'}}>{post.sentiment} Likes</Text>
            </Button>
        )
    }

    render() {
        const post = this.props.post;
        if (post.currentUserLikesPost) {
            return (
                <Mutation mutation={UNLIKE_POST}
                          key={post.id}>
                    {(unlikePost) => {
                        return (this.likesButton({mutation: unlikePost, post: post}))
                    }}
                </Mutation>
            )
        } else {
            return (
                <Mutation mutation={LIKE_POST}
                          key={post.id}
                >
                    {(likePost, {data}) => {
                        return (this.likesButton({mutation: likePost, post: post}))
                    }}
                </Mutation>
            )
        }
    }
}
