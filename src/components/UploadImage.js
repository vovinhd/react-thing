import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import { ReactNativeFile } from 'apollo-upload-client';
import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

 class UploadImage extends React.Component  {
    state = {
        image: null,
        media: null
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {

            const file_name = result.uri.split('\\').pop().split('/').pop();
            // TODO type and name
            const image = new ReactNativeFile({
                uri: result.uri,
                type: 'image/jpg',
                name: 'i-am-a-name',
            });

            this.setState({ image: image });

            this.props.mutate({
                variables: {file: image},
            })
                .then(media => {
                    console.log(media);
                    this.state.media = media;
                    if(this.props.onUploadFinished) {
                        this.props.onUploadFinished();
                    } else {
                        console.log(`[WARN] ${this.constructor.name}: No onUpladFinished callback set in properties`);
                    }
                })
                .catch(err => console.error(err));
        }
    };

    render() {
        let image = this.state.image;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                />
                {image &&
                <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
            </View>
        );
    }
}

const myMediaQuery = gql`
    query {
        myMedia {
            id
            filename
            mimetype
            path
            uploadedAt
        }
    }
`;

export default graphql(gql`
    mutation($file: Upload!) {
        upload(file: $file) {
            id
            filename
            mimetype
            path
            uploadedAt
        }
    }
`)(UploadImage)