import gql from 'graphql-tag'

export default gql`
  mutation($file: Upload!, $projectId: ID!) {
    singleUpload(file: $file, projectId: $projectId) {
      id
      url
    }
  }
`
