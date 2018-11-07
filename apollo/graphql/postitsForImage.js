import gql from 'graphql-tag'

export default gql`
query ($id: ID!) {
	postitsForImage (id: $id) {
		id
    detectedText
    x
    y
    width
    height
    image {
      id
      width
      height
    }
	}
}
`
