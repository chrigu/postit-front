import gql from 'graphql-tag'

export default gql`
query ($id: ID!) {
	getProject (id: $id) {
		id
		name
		createdAt
	}
}
`
