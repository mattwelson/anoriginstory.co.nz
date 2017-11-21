import React from 'react'
import HoardingDisplay from '../components/HoardingDisplay'

export default ({ data }) => {
  return (
    <div>
      <HoardingDisplay hoardings={data.allContentfulSection} />
    </div>
  )
}

export const query = graphql`
  query IndexPageQuery {
    contentfulIndexPage {
      title
      slug
    }
    allContentfulSection {
      edges {
        node {
          title
          panels {
            title
            image {
              id
              sizes(maxHeight: 500, quality: 90, maxWidth: 2000) {
                src
              }
            }
          }
          childContentfulSectionDescriptionTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
