import gql from 'graphql-tag'
import {Mutation} from "react-apollo";

export const LOAD_FEED = gql`
    query {
        posts {
            id, title, author {
                screenName, avatar {path}
            }
        }
    }
`;

export const LOAD_POST = gql`
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

export const ADD_POST = gql`
    mutation addPost($title: String!, $body: String!){
        addPost(post: {
            title: $title
            body: $body
        }){
            title, body
        }
    }
`;