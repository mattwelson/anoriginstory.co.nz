import React from 'react'
import HoardingDisplay from '../components/HoardingDisplay'

import AboutSection from '../components/AboutSection'

export default ({ data }) => {
  const { contentfulPage } = data
  const { title } = contentfulPage

  // set title
  return (
    <div>
      <article>
        {contentfulPage.sections.map(x => (
          <AboutSection section={x} key={x.title} />
        ))}
      </article>
    </div>
  )
}

export const query = graphql`
  query PageQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      slug
      title
      sections {
        title
        logo {
          resolutions(width: 200, quality: 90) {
            srcSet
            src
          }
        }
        images {
          sizes(maxWidth: 4000, quality: 90) {
            srcSet
            src
          }
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
