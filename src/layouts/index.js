import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Typography from 'typography'

import './index.css'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  headerFontFamily: [
    'Avenir Next',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif'
  ],
  bodyFontFamily: ['Georgia', 'serif']
})

const Header = ({ title }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem'
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem'
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          {title}
        </Link>
      </h1>
    </div>
  </div>
)

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        {
          name: 'description',
          content:
            data.contentfulSiteMetadata.defaultDescription.childMarkdownRemark
              .excrept
        },
        { name: 'keywords', content: 'sample, something' }
      ]}
    >
      <style type="text/css">{typography.toString()}</style>
    </Helmet>
    <Header title={data.contentfulSiteMetadata.siteName} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0
      }}
    >
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper

export const query = graphql`
  query LayoutQuery {
    contentfulSiteMetadata {
      siteName
      defaultDescription {
        childMarkdownRemark {
          excerpt
        }
      }
    }
  }
`
