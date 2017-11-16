import React from 'react'

export default ({ data }) => {
  const { contentfulPage } = data
  const { title, slug } = contentfulPage
  const {
    html
  } = contentfulPage.childContentfulPageBodyTextNode.childMarkdownRemark
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
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
