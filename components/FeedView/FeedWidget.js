import React, {Component} from 'react';
import {Container, Content, Fab, Icon, Text} from "native-base";
import {Query} from "react-apollo";
import {LOAD_FEED} from "../../network/FeedGql";
import Expo from "expo";
import {FlatList, RefreshControl} from "react-native";
import {FeedPostWidget} from "./FeedPostWidget";

export default class FeedWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {active: true, refreshing: false};
    }

    render() {
        return (
            <Container>
                <Query query={LOAD_FEED}>
                    {({loading, error, data, refetch}) => {
                        if (loading) return <Expo.AppLoading/>;
                        if (error) return <Text>`Error ${error.message}`</Text>;
                        return (

                            <Content refreshControl={<RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => refetch()}
                            />
                            }>
                                <FlatList
                                    data={data.posts}
                                    keyExtractor={(item, index) => item.id.toString()}
                                    renderItem={({item}) => (
                                        <FeedPostWidget post={item}
                                                        onPress={() => this.props.navigation.navigate('PostWidget', {postId: item.id})}/>
                                    )}
                                />
                            </Content>
                        )
                    }
                    }
                </Query>
                <Fab style={{backgroundColor: '#5067FF'}}
                     position="bottomRight"
                     onPress={() => this.props.navigation.navigate('NewPostWidget')}>
                    <Icon name="share"/>
                </Fab>
            </Container>
        );
    }
}
