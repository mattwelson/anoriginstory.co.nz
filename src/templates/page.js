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
  }
`
