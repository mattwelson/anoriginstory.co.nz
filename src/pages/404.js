import React from 'react'
import Link from 'gatsby-link'

const NotFoundPage = () => (
  <div className="error">
    <h1>404</h1>
    <h2>No luck</h2>
    <p>
      Sorry, there is no page here! Return <Link to="/">Home</Link>?
    </p>
  </div>
)

export default NotFoundPage
