import React, {Component} from 'react';
import {Image, View} from "react-native";
import {Container, Text} from "native-base";
import {Query} from "react-apollo";
import {LOAD_POST} from "../../network/FeedGql";
import Expo from "expo";
import PostCard from "./PostComponent"


export default class PostScreen extends Component {

    cardMedia = (post) => {

        if (post.ytId) {
            return (
                <Text>TODO render yt embed here</Text>
            )
        } else if (post.image) {
            const url = `${process.env.API_IMG_URL}${post.image.filename}`;
            console.log(url)
            return (
                <View>
                    <Image
                        style={{width: '100%', height: 400}}
                        source={{uri: url}}
                        resizeMode="cover"
                    />
                </View>
            )
        }
    };

    render() {
        return (
            <Container>
                <Query query={LOAD_POST} variables={{postId: this.props.navigation.getParam('postId')}}>
                    {({loading, error, data, refetch}) => {
                        console.log(process.env.API_IMG_URL)
                        console.log(data.post);
                        if (loading) return <Expo.AppLoading/>;
                        if (error) {
                            console.log(error);
                            return <Text>`Error ${error.message}`</Text>;
                        }
                        return (
                            <PostCard post={data.post} commentRefetch={refetch}
                                      close={() => this.props.navigation.navigate('FeedWidget')}/>
                        )
                    }}
                </Query>
            </Container>
        );
    }
}

