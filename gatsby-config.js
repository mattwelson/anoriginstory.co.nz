require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACEID || '',
        accessToken: process.env.CONTENTFUL_ACCESSTOKEN || ''
      }
    },
    'gatsby-transformer-remark'
  ]
}
