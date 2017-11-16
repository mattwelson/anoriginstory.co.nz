const path = require(`path`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPage {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      const pageTemplate = path.resolve('./src/templates/page.js')
      result.data.allContentfulPage.edges.map(({ node }) => {
        createPage({
          path: node.slug,
          component: pageTemplate,
          context: {
            slug: node.slug
          }
        })
      })
      resolve()
    })
  })
}
