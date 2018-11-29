import gql from 'graphql-tag'

export default gql`
    query upload {
        file {
            id
            filename
            mimetype
            path
        }
    }
`