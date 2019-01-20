import React from 'react';
import {AsyncStorage, StatusBar} from 'react-native';
import ApolloClient from "apollo-client";
import {ApolloProvider} from "react-apollo";
import {concat} from 'apollo-link';
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import FeedScreen from "./FeedView/FeedScreen";
import ChallengeScreen from "./ChallengeScreen";
import ProfileScreen from "./ProfileScreen";
import TreeScreen from "./TreeScreen";
import {createUploadLink} from "apollo-upload-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context"
import {Container} from "native-base";

const AppNav = createMaterialBottomTabNavigator({
        FeedTab: {
            screen: FeedScreen
        },
        ChallengeTab: {
            screen: ChallengeScreen
        },
        ProgressTab: {
            screen: TreeScreen
        },
        ProfileTab: {
            screen: ProfileScreen
        }
    }, {
        activeTintColor: '#f0edf6',
        inactiveTintColor: '#105229',
        barStyle: {backgroundColor: '#179154'},
    }
);

const uri ="https://enviroommate.org/app-dev/api/gql";

const uploadLink = createUploadLink({
    uri: uri,
});

const authLink = setContext(async (_, { headers }) => {
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

};
