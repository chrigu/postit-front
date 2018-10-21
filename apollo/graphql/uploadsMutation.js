import gql from 'graphql-tag'

export default gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      mimetype
      path
    }
  }
`
