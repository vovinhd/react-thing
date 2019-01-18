import gql from 'graphql-tag'

export const LOAD_FEED = gql`
    query FeedPage($page:ConnectionArgs!) {
        paginatedPosts (connectionArgs:$page) {
            page {
                edges {
                    node {
                        id,
                        title,
                        author {
                            screenName,
                            avatar {path}
                        },
                        body,
                        sentiment,
                        commentCount,
                        currentUserLikedPost
                    },
                    cursor
                }
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

export const LIKE_POST = gql`mutation like($postId:Int!){
    likePost(postId:$postId){
        id,sentiment, currentUserLikedPost
    }
}
`;

export const UNLIKE_POST = gql`mutation unlike($postId:Int!){
    unlikePost(postId:$postId){
        id,sentiment, currentUserLikedPost
    }
}
`;

export const ADD_COMMENT = gql`
    mutation AddComment($body:String!, $postId:Int!, $parentId:Int) {
        addComment(comment: {body:$body, post:$postId, parent:$parentId}) {
            id,
            body,
            parent {id},
            post {id},
            author {screenName, avatar {path}},
            dateCreated,
            sentiment
        }
    }
`;