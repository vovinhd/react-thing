"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_navigation_1 = require("react-navigation");
var native_base_1 = require("native-base");
var expo_1 = require("expo");
var graphql_tag_1 = require("graphql-tag");
var react_apollo_1 = require("react-apollo");
var defaultAvatar = (process.env.API_IMG_URL || "https://enviroommate.org/app-dev/img/") + "avatar_default.png"; //TODO replace default avatar with local file
var LOAD_FEED = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query {\n        posts {\n            id\n            title\n            body\n            dateCreated\n            author {\n                id\n                userName\n            }\n            comments {\n                id\n                body\n                author {\n                    id\n                    userName\n                }\n            }\n        }\n    }\n"], ["\n    query {\n        posts {\n            id\n            title\n            body\n            dateCreated\n            author {\n                id\n                userName\n            }\n            comments {\n                id\n                body\n                author {\n                    id\n                    userName\n                }\n            }\n        }\n    }\n"])));
var LOAD_POST = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query Post($postId: Int!){\n        post(postId: $postId) {\n            id,\n            title,\n            body,\n            author {\n                screenName\n            },\n            comments {\n                id,\n                author {\n                    screenName\n                },\n                children {\n                    id\n                },\n                parent {\n                    id\n                },\n                sentiment\n            }\n        }\n    }\n"], ["\n    query Post($postId: Int!){\n        post(postId: $postId) {\n            id,\n            title,\n            body,\n            author {\n                screenName\n            },\n            comments {\n                id,\n                author {\n                    screenName\n                },\n                children {\n                    id\n                },\n                parent {\n                    id\n                },\n                sentiment\n            }\n        }\n    }\n"])));
var ADD_POST = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    mutation addPost($title: String!, $body: String!){\n        addPost(post: {\n            title: $title\n            body: $body\n        }){\n            title, body\n        }\n    }\n"], ["\n    mutation addPost($title: String!, $body: String!){\n        addPost(post: {\n            title: $title\n            body: $body\n        }){\n            title, body\n        }\n    }\n"])));
var FeedWidget = /** @class */ (function (_super) {
    __extends(FeedWidget, _super);
    function FeedWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { active: true, refreshing: false };
        return _this;
    }
    FeedWidget.prototype.render = function () {
        var _this = this;
        return (
        // @ts-ignore
        <native_base_1.Container style={styles.fillparent}>
                // @ts-ignore
                <native_base_1.Content style={styles.fillparent}>
                    <react_apollo_1.Query query={LOAD_FEED}>
                        {function (_a) {
            var loading = _a.loading, error = _a.error, data = _a.data, refetch = _a.refetch;
            if (loading)
                return <expo_1.default.AppLoading />;
            if (error)
                return <native_base_1.Text>`Error ${error.message}`</native_base_1.Text>;
            return (<react_native_1.FlatList refreshControl={<react_native_1.RefreshControl refreshing={_this.state.refreshing} onRefresh={function () { return refetch(); }}/>} data={data.posts} keyExtractor={function (item, index) { return item.id.toString(); }} renderItem={function (_a) {
                var item = _a.item;
                return (<native_base_1.ListItem icon key={item.id} onPress={function () { return _this.props.navigation.navigate('PostWidget', { postId: item.id }); }}>
                                                  <native_base_1.Left>
                                                      <native_base_1.Button style={{ backgroundColor: "#007AFF" }}>
                                                          <native_base_1.Thumbnail circular 
                // @ts-ignore
                source={{ uri: item.author.avatar ? item.author.avatar.path : defaultAvatar }}/>
                                                      </native_base_1.Button>
                                                  </native_base_1.Left>
                                                  <native_base_1.Body>
                                                  <native_base_1.Text>{item.title}</native_base_1.Text>
                                                  </native_base_1.Body>
                                                  <native_base_1.Right>
                                                      <native_base_1.Icon active name="arrow-forward"/>
                                                  </native_base_1.Right>
                                              </native_base_1.ListItem>);
            }}/>);
        }}
                    </react_apollo_1.Query>
                </native_base_1.Content>
                <native_base_1.Fab style={{ backgroundColor: '#5067FF' }} position="bottomRight" onPress={function () { return _this.props.navigation.navigate('NewPostWidget'); }}>
                    <native_base_1.Icon name="share"/>
                </native_base_1.Fab>
            </native_base_1.Container>);
    };
    return FeedWidget;
}(react_1.Component));
var PostWidget = /** @class */ (function (_super) {
    __extends(PostWidget, _super);
    function PostWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostWidget.prototype.render = function () {
        var _this = this;
        return (<native_base_1.Container>
                <react_apollo_1.Query query={LOAD_POST} variables={{ postId: this.props.navigation.getParam('postId') }}>
                    {function (_a) {
            var loading = _a.loading, error = _a.error, data = _a.data;
            if (loading)
                return <expo_1.default.AppLoading />;
            if (error)
                return <native_base_1.Text>`Error ${error.message}`</native_base_1.Text>;
            return (<native_base_1.Container>
                                <native_base_1.Header>
                                    <native_base_1.Left>
                                        <native_base_1.Button transparent onPress={function () { return _this.props.navigation.navigate('FeedWidget'); }}>
                                            <native_base_1.Icon name='arrow-back'/>
                                        </native_base_1.Button>
                                    </native_base_1.Left>
                                    <native_base_1.Body>
                                    <native_base_1.Title>{data.post.title}</native_base_1.Title>
                                    </native_base_1.Body>
                                    <native_base_1.Right />
                                </native_base_1.Header>
                                <native_base_1.Content>
                                    <native_base_1.Text>{data.post.body}</native_base_1.Text>
                                </native_base_1.Content>
                            </native_base_1.Container>);
        }}
                </react_apollo_1.Query>
            </native_base_1.Container>);
    };
    return PostWidget;
}(react_1.Component));
var FeedScreen = /** @class */ (function (_super) {
    __extends(FeedScreen, _super);
    function FeedScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { loading: true };
        return _this;
    }
    FeedScreen.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expo_1.default.Font.loadAsync({
                            Roboto: require("native-base/Fonts/Roboto.ttf"),
                            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
                        })];
                    case 1:
                        _a.sent();
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    FeedScreen.prototype.render = function () {
        if (this.state.loading) {
            return (<expo_1.default.AppLoading />);
        }
        return (
        //@ts-ignore
        <native_base_1.Container style={styles.container}>
                <FeedNavigation />
            </native_base_1.Container>);
    };
    FeedScreen.navigationOptions = {
        title: 'Feed',
        tabBarIcon: function (_a) {
            var focused = _a.focused, tintColor = _a.tintColor;
            return (<native_base_1.Icon name='list' style={{ fontSize: 20, color: tintColor }}/>);
        },
    };
    return FeedScreen;
}(react_1.Component));
var NewPostWidget = /** @class */ (function (_super) {
    __extends(NewPostWidget, _super);
    function NewPostWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.post = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        _this.state = { title: '', body: '' };
        return _this;
    }
    NewPostWidget.prototype.render = function () {
        var _this = this;
        return (<native_base_1.Container>
                <native_base_1.Header>
                    <native_base_1.Left>
                        <native_base_1.Button transparent onPress={function () { return _this.props.navigation.navigate('FeedWidget'); }}>
                            <native_base_1.Icon name='arrow-back'/>
                        </native_base_1.Button>
                    </native_base_1.Left>
                    <native_base_1.Body>
                    <native_base_1.Title>Add Post</native_base_1.Title>
                    </native_base_1.Body>
                    <native_base_1.Right />
                </native_base_1.Header>
                <native_base_1.Content>
                    <react_apollo_1.Mutation mutation={ADD_POST}>
                        {function (addPost, _a) {
            var data = _a.data;
            return (<native_base_1.Form>
                                <native_base_1.Item floatingLabel>
                                    <native_base_1.Label>Titel</native_base_1.Label>
                                    <native_base_1.Input onChangeText={function (text) { return _this.setState({ title: text }); }} value={_this.state.title}/>
                                </native_base_1.Item>
                                <native_base_1.Item floatingLabel>
                                    <native_base_1.Label>Text</native_base_1.Label>
                                    <native_base_1.Input onChangeText={function (text) { return _this.setState({ body: text }); }} value={_this.state.body}/>
                                </native_base_1.Item>
                                <native_base_1.Button full primary style={{ paddingBottom: 4 }} onPress={function () {
                addPost({
                    variables: {
                        title: _this.state.title,
                        body: _this.state.body
                    }
                });
                _this.props.navigation.navigate('FeedWidget');
            }}>
                                    <native_base_1.Text> Next </native_base_1.Text>
                                </native_base_1.Button>
                            </native_base_1.Form>);
        }}
                    </react_apollo_1.Mutation>
                </native_base_1.Content>
            </native_base_1.Container>);
    };
    return NewPostWidget;
}(react_1.Component));
var FeedNavigation = react_navigation_1.createStackNavigator({
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
var styles = react_native_1.StyleSheet.create({
    container: {
        paddingTop: expo_1.Constants.statusBarHeight,
        flex: 1,
    },
    fillparent: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
    }
});
exports.default = FeedScreen;
var templateObject_1, templateObject_2, templateObject_3;
