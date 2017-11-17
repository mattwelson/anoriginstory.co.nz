import React from 'react'
import HoardingDisplay from '../components/HoardingDisplay'

export default ({ data }) => {
  const { contentfulPage } = data
  const { title, slug } = contentfulPage
  const {
    html
  } = contentfulPage.childContentfulPageBodyTextNode.childMarkdownRemark
  return (
    <div>
      {slug === '/' && (
        <HoardingDisplay hoardings={data.allContentfulHoarding} />
      )}
      <article
        className="container"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export const query = graphql`
  query PageQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      childContentfulPageBodyTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulHoarding {
      edges {
        node {
          image {
            resolutions(
              height: 500
              width: 4000
              quality: 80
              resizingBehavior: FILL
            ) {
              srcSet
              src
            }
          }
          title
          childContentfulHoardingDescriptionTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
