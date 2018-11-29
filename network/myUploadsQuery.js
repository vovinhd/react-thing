import gql from 'graphql-tag'

export default gql`
    query myImageUploads {
        file {
            id
            filename
            mimetype
            path
        }
    }
`