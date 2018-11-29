import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import myUploadsQuery from "../network/myUploadsQuery";
import {React} from "react-native";

const UploadImage = ({mutate}) => {
    const handleChange = ({
        target: {
            validity,
            files: [file]
        }
    }) => {
        validity.valid &&
            mutate({
                variables: {file},
                update(
                    proxy,
                    {
                        data: {uploadImage}
                    }
                ) {
                    const data = proxy.readQuery({query: myUploadsQuery})
                    data.myImageUploads.push(uploadImage);
                    proxy.writeQuery({query: uploadImage, data})
                }
            })
    }
    return <input type="file" required onChange={handleChange}/>

}

export default graphql(gql`
    mutation($file: Upload!) {
        uploadImage(file: $file) {
            id
            filename
            mimetype
            path
        }
    }
`)(UploadImage)