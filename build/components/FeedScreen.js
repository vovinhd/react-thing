var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { createStackNavigator } from "react-navigation";
import { Body, Button, Container, Content, Fab, Form, Header, Icon, Input, Item as FormItem, Label, Left, ListItem, Right, Text, Thumbnail, Title } from "native-base";
import Expo, { Constants } from "expo";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
const defaultAvatar = (process.env.API_IMG_URL || "https://enviroommate.org/app-dev/img/") + "avatar_default.png"; //TODO replace default avatar with local file
const LOAD_FEED = gql `
    query {
        posts {
            id
            title
            body
            dateCreated
            author {
                id
                userName
            }
            comments {
                id
                body
                author {
                    id
                    userName
                }
            }
        }
    }
`;
const LOAD_POST = gql `
    query Post($postId: Int!){
        post(postId: $postId) {
            id,
            title,
            body,
            author {
                screenName
            },
            comments {
                id,
                author {
                    screenName
                },
                children {
                    id
                },
                parent {
                    id
                },
                sentiment
            }
        }
    }
`;
const ADD_POST = gql `
    mutation addPost($title: String!, $body: String!){
        addPost(post: {
            title: $title
            body: $body
        }){
            title, body
        }
    }
`;
class FeedWidget extends Component {
    constructor(props) {
        super(props);
        this.state = { active: true, refreshing: false };
    }
    render() {
        return (
        // @ts-ignore
        React.createElement(Container, { style: styles.fillparent },
            "// @ts-ignore",
            React.createElement(Content, { style: styles.fillparent },
                React.createElement(Query, { query: LOAD_FEED }, ({ loading, error, data, refetch }) => {
                    if (loading)
                        return React.createElement(Expo.AppLoading, null);
                    if (error)
                        return React.createElement(Text, null,
                            "`Error $",
                            error.message,
                            "`");
                    return (React.createElement(FlatList, { refreshControl: React.createElement(RefreshControl, { refreshing: this.state.refreshing, onRefresh: () => refetch() }), data: data.posts, keyExtractor: (item, index) => item.id.toString(), renderItem: ({ item }) => (React.createElement(ListItem, { icon: true, key: item.id, onPress: () => this.props.navigation.navigate('PostWidget', { postId: item.id }) },
                            React.createElement(Left, null,
                                React.createElement(Button, { style: { backgroundColor: "#007AFF" } },
                                    React.createElement(Thumbnail, { circular: true, 
                                        // @ts-ignore
                                        source: { uri: item.author.avatar ? item.author.avatar.path : defaultAvatar } }))),
                            React.createElement(Body, null,
                                React.createElement(Text, null, item.title)),
                            React.createElement(Right, null,
                                React.createElement(Icon, { active: true, name: "arrow-forward" })))) }));
                })),
            React.createElement(Fab, { style: { backgroundColor: '#5067FF' }, position: "bottomRight", onPress: () => this.props.navigation.navigate('NewPostWidget') },
                React.createElement(Icon, { name: "share" }))));
    }
}
class PostWidget extends Component {
    render() {
        return (React.createElement(Container, null,
            React.createElement(Query, { query: LOAD_POST, variables: { postId: this.props.navigation.getParam('postId') } }, ({ loading, error, data }) => {
                if (loading)
                    return React.createElement(Expo.AppLoading, null);
                if (error)
                    return React.createElement(Text, null,
                        "`Error $",
                        error.message,
                        "`");
                return (React.createElement(Container, null,
                    React.createElement(Header, null,
                        React.createElement(Left, null,
                            React.createElement(Button, { transparent: true, onPress: () => this.props.navigation.navigate('FeedWidget') },
                                React.createElement(Icon, { name: 'arrow-back' }))),
                        React.createElement(Body, null,
                            React.createElement(Title, null, data.post.title)),
                        React.createElement(Right, null)),
                    React.createElement(Content, null,
                        React.createElement(Text, null, data.post.body))));
            })));
    }
}
class FeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Expo.Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
            });
            this.setState({ loading: false });
        });
    }
    render() {
        if (this.state.loading) {
            return (React.createElement(Expo.AppLoading, null));
        }
        return (
        //@ts-ignore
        React.createElement(Container, { style: styles.container },
            React.createElement(FeedNavigation, null)));
    }
}
FeedScreen.navigationOptions = {
    title: 'Feed',
    tabBarIcon: ({ focused, tintColor }) => (React.createElement(Icon, { name: 'list', style: { fontSize: 20, color: tintColor } })),
};
class NewPostWidget extends Component {
    constructor(props) {
        super(props);
        this.post = () => __awaiter(this, void 0, void 0, function* () {
        });
        this.state = { title: '', body: '' };
    }
    render() {
        return (React.createElement(Container, null,
            React.createElement(Header, null,
                React.createElement(Left, null,
                    React.createElement(Button, { transparent: true, onPress: () => this.props.navigation.navigate('FeedWidget') },
                        React.createElement(Icon, { name: 'arrow-back' }))),
                React.createElement(Body, null,
                    React.createElement(Title, null, "Add Post")),
                React.createElement(Right, null)),
            React.createElement(Content, null,
                React.createElement(Mutation, { mutation: ADD_POST }, (addPost, { data }) => (React.createElement(Form, null,
                    React.createElement(FormItem, { floatingLabel: true },
                        React.createElement(Label, null, "Titel"),
                        React.createElement(Input, { onChangeText: (text) => this.setState({ title: text }), value: this.state.title })),
                    React.createElement(FormItem, { floatingLabel: true },
                        React.createElement(Label, null, "Text"),
                        React.createElement(Input, { onChangeText: (text) => this.setState({ body: text }), value: this.state.body })),
                    React.createElement(Button, { full: true, primary: true, style: { paddingBottom: 4 }, onPress: () => {
                            addPost({
                                variables: {
                                    title: this.state.title,
                                    body: this.state.body
                                }
                            });
                            this.props.navigation.navigate('FeedWidget');
                        } },
                        React.createElement(Text, null, " Next "))))))));
    }
}
const FeedNavigation = createStackNavigator({
    FeedWidget: {
        screen: FeedWidget
    },
    PostWidget: {
        screen: PostWidget
    },
    NewPostWidget: {
        screen: NewPostWidget
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerTransparent: false,
    },
    initialRouteName: 'FeedWidget',
});
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
    },
    fillparent: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
    }
});
export default FeedScreen;
//# sourceMappingURL=FeedScreen.js.map