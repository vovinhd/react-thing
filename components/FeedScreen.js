import React, {Component} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {createStackNavigator} from "react-navigation";
import {
    Body,
    Button,
    Container,
    Content,
    Fab,
    Form,
    Header,
    Icon,
    Input,
    Item as FormItem,
    Label,
    Left,
    ListItem,
    Right,
    Text,
    Thumbnail,
    Title
} from "native-base";
import Expo, {Constants} from "expo";
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";


const defaultAvatar = (process.env.API_IMG_URL || "https://enviroommate.org/app-dev/img/") + "avatar_default.png"; //TODO replace default avatar with local file

const LOAD_FEED = gql`
    query {
        posts {
            id, title, author {
                screenName, avatar {path}
            }
        }
    }
`;

const LOAD_POST = gql`
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
const ADD_POST = gql`
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
        this.state = {active: true, refreshing: false};
    }

    render() {
        return (
            <Container style={styles.fillparent}>
                <Content style={styles.fillparent}>
                    <Query query={LOAD_FEED}>
                        {({loading, error, data, refetch}) => {
                            if (loading) return <Expo.AppLoading/>;
                            if (error) return <Text>`Error ${error.message}`</Text>;
                            return (
                                <FlatList refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => refetch()}
                                    />
                                }
                                          data={data.posts}
                                          keyExtractor={(item, index) => item.id.toString()}
                                          renderItem={({item}) => (
                                              <ListItem icon key={item.id}
                                                        onPress={() => this.props.navigation.navigate('PostWidget', {postId: item.id})}>
                                                  <Left>
                                                      <Button style={{backgroundColor: "#007AFF"}}>
                                                          <Thumbnail circular
                                                                     source={{uri: item.author.avatar ? item.author.avatar.path : defaultAvatar}}/>
                                                      </Button>
                                                  </Left>
                                                  <Body>
                                                  <Text>{item.title}</Text>
                                                  </Body>
                                                  <Right>
                                                      <Icon active name="arrow-forward"/>
                                                  </Right>
                                              </ListItem>
                                          )
                                          }
                                />
                            )
                        }}
                    </Query>
                </Content>
                <Fab style={{backgroundColor: '#5067FF'}}
                     position="bottomRight"
                     onPress={() => this.props.navigation.navigate('NewPostWidget')}>
                    <Icon name="share"/>
                </Fab>
            </Container>
        );
    }
}

class PostWidget extends Component {

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

class FeedScreen extends Component {
    static navigationOptions = {
        title: 'Feed',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='list' style={{fontSize: 20, color: tintColor}}/>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({loading: false})
    }

    render() {
        if (this.state.loading) {
            return (<Expo.AppLoading/>)
        }
        return (
            <Container style={styles.container}>
                <FeedNavigation/>
            </Container>
        );
    }
}

class NewPostWidget extends Component {

    constructor() {
        super();
        this.state = {title: '', body: ''}
    }

    post = async () => {

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
                                <FormItem floatingLabel>
                                    <Label>Titel</Label>
                                    <Input name="email" onChangeText={(text) => this.setState({title: text})}
                                           value={this.state.title}/>
                                </FormItem>
                                <FormItem floatingLabel>
                                    <Label>Text</Label>
                                    <Input name="password" onChangeText={(text) => this.setState({body: text})}
                                           value={this.state.body}/>
                                </FormItem>
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
        headerVisible: false,
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
