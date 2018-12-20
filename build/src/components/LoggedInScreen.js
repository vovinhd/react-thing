var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { AsyncStorage } from 'react-native';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { concat } from 'apollo-link';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import FeedScreen from "./FeedScreen";
import ChallengeScreen from "./ChallengeScreen";
import ProfileScreen from "./ProfileScreen";
import TreeScreen from "./TreeScreen";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
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
    barStyle: { backgroundColor: '#179154' },
});
const uri = "https://enviroommate.org/app-dev/api/gql";
const uploadLink = createUploadLink({
    uri: uri,
});
const authLink = setContext((_, { headers }) => __awaiter(this, void 0, void 0, function* () {
    // get the authentication token from local storage if it exists
    const token = yield AsyncStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: Object.assign({}, headers, { authorization: token ? `Bearer ${token}` : "" })
    };
}));
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
        return (React.createElement(ApolloProvider, { client: client },
            React.createElement(AppNav, null)));
    }
}
;
//# sourceMappingURL=LoggedInScreen.js.map