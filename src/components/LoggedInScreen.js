import React from 'react';
import {AsyncStorage, StatusBar} from 'react-native';
import ApolloClient from "apollo-client";
import {ApolloProvider} from "react-apollo";
import {concat} from 'apollo-link';
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import {FeedNavigation} from "./Feed/FeedScreen";
import {ChallengeViewsNav} from "./Challenges/ChallengeScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import {createUploadLink} from "apollo-upload-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context"
import {Container, Icon} from "native-base";
import {NotificationsScreen} from "./Notifications/NotificationsScreen";
import {TeamsScreen} from "./Competitve/TeamsScreen";
import material from '../../native-base-theme/variables/material';

export const AppNav = createMaterialBottomTabNavigator({
        FeedTab: {
            screen: FeedNavigation,
            navigationOptions: {
                title: 'Feed',
                tabBarIcon: ({focused, tintColor}) => (
                    <Icon name='list' style={{fontSize: 20, color: tintColor}}/>
                ),
            }
        },
        NotificationsTab: {
            screen: NotificationsScreen
        },
        ChallengeTab: {
            screen: ChallengeViewsNav,
            navigationOptions: {
                title: 'Challenge',
                tabBarIcon: ({focused, tintColor}) => (
                    <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
                ),
            }
        },
        CompetitiveTab: {
            screen: TeamsScreen
        },
        ProfileTab: {
            screen: ProfileScreen,
            navigationOptions: {
                title: 'Profile',
                tabBarIcon: ({focused, tintColor}) => (
                    <Icon name='md-person' style={{fontSize: 20, color: tintColor}}/>
                ),
            }
        },
    },
    {

        activeTintColor: material.activeTab,
        inactiveTintColor:
            "#AFD4E6",
        barStyle:
            {
                backgroundColor: material.tabDefaultBg
            }
        ,
    }
    )
;

const uri = "https://enviroommate.org/app-dev/api/gql";

const uploadLink = createUploadLink({
    uri: uri,
});

const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = await AsyncStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});
const link = concat(authLink, uploadLink);

client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

export class LoggedInScreen extends React.Component {

    constructor() {
        super();

    }

    render() {
        return (
            <ApolloProvider client={client}>
                <Container>
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    <AppNav/>
                </Container>
            </ApolloProvider>
        );
    }

}
