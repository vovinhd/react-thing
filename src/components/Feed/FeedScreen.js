import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from "react-navigation";
import {Container, Icon,} from "native-base";
import Expo, {Constants} from "expo";
import FeedWidget from './FeedWidget';
import NewPostWidget from './NewPostWidget';
import PostWidget from './PostScreen';

export const defaultAvatar = (process.env.API_IMG_URL || "https://enviroommate.org/app-dev/img/") + "avatar_default.png"; //TODO replace default avatar with local file

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
