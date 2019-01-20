import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {ReactNativeFile} from 'apollo-upload-client';
import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {Button, Icon, Text} from 'native-base';
import {ImagePicker} from 'expo';

class UploadImage extends React.Component {
    state = {
        image: null,
        media: null,
        uploading: false,
    };

    uploadImage = async () => {
        this.setState({uploading: true});
        this.props.mutate({
            variables: {file: this.state.image},
        })
            .then(media => {
                this.setState({uploading: false});

                this.state.media = media;
                if (this.props.onUploadFinished) {
                    this.props.onUploadFinished(media.data.upload);
                } else {
                    console.log(`[WARN] ${this.constructor.name}: No onUpladFinished callback set in properties`);
                }
            })
            .catch(err => {
                this.setState({uploading: false});
                console.error(err)
            });
    }

    pickImage = async () => { //TODO ENHANCEMENT replace with https://github.com/ivpusic/react-native-image-crop-picker? (requires ejecting)
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            exif: false,
        });
        if (!result.cancelled) {
            const [name, ext] = result.uri.split('\\').pop().split('/').pop().split('.');
            const image = new ReactNativeFile({
                uri: result.uri,
                type: `image/${ext}`,
                name: `${name}.${ext}`,
            });
            this.setState({image: image});
        }
    };

    reset = () => {
        this.setState({image: null});
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    };

    render() {
        let image = this.state.image;
        let uploadButton;
        if (this.state.media) {
            return (
                <ImageBackground
                    style={{flex: 1, height: 300, backgroundColor: "#0ff", alignSelf: 'stretch'}}
                    resizeMode="cover"
                    source={{uri: image.uri}}>
                    <Icon name="md-checkmark"/>
                </ImageBackground>
            )
        }
        if (image) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button warning onPress={this.reset}>
                            <Text>Abbrechen</Text>
                        </Button>
                        <Button info onPress={this.pickImage}>
                            <Text>Wähle ein anderes Bild</Text>
                        </Button>
                    </View>
                    <Image
                        style={{flex: 1, height: 300, backgroundColor: "#0ff", alignSelf: 'stretch'}}
                        resizeMode="cover"
                        source={{uri: image.uri}}
                    />

                    <Button primary block onPress={this.uploadImage}>
                        <Text>Bild hochladen</Text>
                    </Button>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button primary onPress={this.pickImage}>
                        <Text>Wähle ein Bild</Text>
                    </Button>
                </View>
            )
        }
    }
}

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