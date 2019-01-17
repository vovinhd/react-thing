import React, {Component} from 'react';
import {Body, Button, Container, Content, Fab, Icon, Left, ListItem, Right, Text, Thumbnail} from "native-base";
import {Query} from "react-apollo";
import {LOAD_FEED} from "../../network/FeedGql";
import Expo from "expo";
import {FlatList, RefreshControl} from "react-native";
import {defaultAvatar} from "./FeedScreen";

export default class FeedWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {active: true, refreshing: false};
    }

    render() {
        return (
            <Container>
                <Content>
                    <Query query={LOAD_FEED}>
                        {({loading, error, data, refetch}) => {
                            if (loading) return <Expo.AppLoading/>;
                            if (error) return <Text>`Error ${error.message}`</Text>;
                            return (
                                <FlatList refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => refetch()}
                                    />
                                }
                                          data={data.posts}
                                          keyExtractor={(item, index) => item.id.toString()}
                                          renderItem={({item}) => (
                                              <ListItem icon key={item.id}
                                                        onPress={() => this.props.navigation.navigate('PostWidget', {postId: item.id})}>
                                                  <Left>
                                                      <Button style={{backgroundColor: "#007AFF"}}>
                                                          <Thumbnail circular
                                                                     source={{uri: item.author.avatar ? item.author.avatar.path : defaultAvatar}}/>
                                                      </Button>
                                                  </Left>
                                                  <Body>
                                                  <Text>{item.title}</Text>
                                                  </Body>
                                                  <Right>
                                                      <Icon active name="arrow-forward"/>
                                                  </Right>
                                              </ListItem>
                                          )
                                          }
                                />
                            )
                        }}
                    </Query>
                </Content>
                <Fab style={{backgroundColor: '#5067FF'}}
                     position="bottomRight"
                     onPress={() => this.props.navigation.navigate('NewPostWidget')}>
                    <Icon name="share"/>
                </Fab>
            </Container>
        );
    }
}
