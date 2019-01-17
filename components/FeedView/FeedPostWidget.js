import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Left, Text, Thumbnail} from "native-base";
import {defaultAvatar} from "./FeedScreen";

export class FeedPostWidget extends Component {
    constructor(props) {
        super(props);
        this.post = this.props.post;
    }

    cardMedia = () => {
        if (this.post.ytId) {
            return (
                <Text>TODO render yt embed here</Text>
            )
        } else if (this.post.media) {
            return (
                <Text>TODO render image here</Text>
            )
        }
    }

    bodyPreview = () => {
        if (!this.post.body) return;
        console.log(this.post.body);
        let preview = this.post.body.length > 140
            ? `${this.post.body.substr(0, 139)} ...`
            : this.post.body;
        return (
            <Text>{preview}</Text>
        )
    }


    render() {
        return (
            <Card icon key={this.post.id}
                  onPress={() => this.props.onPress()}>
                <CardItem>
                    <Left>
                        <Button style={{backgroundColor: "rgba(0,0,0,0)"}}>
                            <Thumbnail circular
                                       source={{uri: this.post.author.avatar ? this.post.author.avatar.path : defaultAvatar}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Text>{this.post.title}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    {this.cardMedia()}
                </CardItem>
                <CardItem>
                    {this.bodyPreview()}
                </CardItem>
            </Card>
        )
    }
}
