import React from 'react'
import HoardingDisplay from '../components/HoardingDisplay'

export default ({ data }) => {
  return (
    <div>
      <HoardingDisplay sections={data.contentfulIndexPage.sections} />
    </div>
  )
}

export const query = graphql`
  query IndexPageQuery {
    contentfulIndexPage {
      title
      slug
      sections {
        title
        childContentfulSectionDescriptionTextNode {
          childMarkdownRemark {
            html
          }
        }
        panels {
          image {
            id
            sizes(maxHeight: 500, quality: 90, maxWidth: 2000) {
              src
            }
          }
        }
      }
    }
  }
`
