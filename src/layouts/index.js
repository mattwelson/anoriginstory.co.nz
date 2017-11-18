import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.scss'
import './header.scss'

const Header = ({ title, logo, navigation, reeditUrl }) => (
  <header className="header">
    <div className="header__container">
      <h1 className="header__title">
        <Link to="/" className="">
          {title}
        </Link>
      </h1>
      <div className="header__nav">
        {navigation &&
          navigation.map(page => (
            <h3 key={page.slug}>
              <Link to={page.slug}>{page.title}</Link>
            </h3>
          ))}
      </div>
      <a className="header__logo" href={reeditUrl}>
        <img
          src={logo.responsiveResolution.src}
          srcSet={logo.responsiveResolution.srcSet}
          alt={logo.description}
          width={logo.responsiveResolution.width}
          height={logo.responsiveResolution.height}
        />
      </a>
    </div>
  </header>
)

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title={data.contentfulSiteMetadata.siteName}
      meta={[
        {
          name: 'description',
          content:
            data.contentfulSiteMetadata.defaultDescription.defaultDescription
        },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <Header
      title={data.contentfulSiteMetadata.siteName}
      logo={data.contentfulAsset}
      reeditUrl={data.contentfulSiteMetadata.reeditUrl}
      navigation={data.contentfulSiteMetadata.navigation}
    />
    <div className="content">{children()}</div>
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
      reeditUrl
      defaultDescription {
        defaultDescription
      }
      navigation {
        slug
        title
      }
    }
    contentfulAsset(title: { eq: "reedit_logo_full" }) {
      description
      responsiveResolution(width: 110, quality: 90) {
        width
        height
        src
        srcSet
      }
    }
  }
`
