import gql from 'graphql-tag'

export default gql`
query ($id: ID!) {
	image (id: $id) {
    id
    width
    height
    url
	}
}
`
