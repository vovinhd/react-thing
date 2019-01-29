import React, {Component} from 'react';
import {createStackNavigator} from "react-navigation";
import {Container, Icon,} from "native-base";
import FeedComponent from './FeedComponent';
import NewPostComponent from './NewPostComponent';
import PostScreen from './PostScreen';

export const FeedNavigation = createStackNavigator({
    Feed: {
        screen: FeedComponent
    },
    Post: {
        screen: PostScreen
    },
    NewPost: {
        screen: NewPostComponent
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Feed',
});

