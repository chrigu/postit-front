import gql from 'graphql-tag'

export default gql`
mutation ($name: String!) {
	createProject (name: $name) {
		id
		name
		createdAt
	}
}
`
