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
          id
          image {
            id
            file {
              url
              details {
                image {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`
