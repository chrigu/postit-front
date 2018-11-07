import gql from 'graphql-tag'

export default gql`
query ($id: ID!) {
	imageWithPostits (id: $id) {
    id
    width
    height
    url
    postits {
      id
      detectedText
      x
      y
      width
      height
      url
    }
	}
}
`
