import React from 'react'
import Hoardings from './Hoardings'

import './hoardings.scss'

class HoardingDisplay extends React.Component {
  componentDidMount() {
    this.changeHoarding(0)
  }

  state = {}

  changeHoarding = index => {
    const hoarding = this.props.hoardings.edges[index].node
    this.setState(() => ({
      current: index,
      title: hoarding.title,
      description:
        hoarding.childContentfulHoardingDescriptionTextNode.childMarkdownRemark
          .html
    }))
  }

  render() {
    // some hacks to try and a void a flash of missing stuffs
    let { title, description } = this.state
    const firstHoarding = this.props.hoardings.edges[0]
    if (!title && firstHoarding) {
      title = firstHoarding.node.title
      description = firstHoarding.node.description
    }

    return (
      <div className="hoarding-display">
        <h2 className="container">{this.state.title}</h2>
        <Hoardings hoardings={this.props.hoardings.edges} />
        <div
          className="container columns"
          dangerouslySetInnerHTML={{ __html: this.state.description }}
        />
      </div>
    )
  }
}

export default HoardingDisplay
