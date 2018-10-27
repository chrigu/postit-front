import gql from 'graphql-tag'

export default gql`
subscription ($id: ID!) {
	imageStatus (where: $id) {
    id
    status
  }
}
`
