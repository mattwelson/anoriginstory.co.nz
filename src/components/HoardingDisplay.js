import React from 'react'
import Hoardings from './Hoardings'

import './hoardings.scss'

class HoardingDisplay extends React.Component {
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

  componentDidMount() {
    this.changeHoarding(0)
  }

  render() {
    console.log(this.props.hoardings)
    return (
      <div className="hoarding-display">
        <h2 className="container">{this.state.title}</h2>
        <Hoardings hoardings={this.props.hoardings.edges} />
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: this.state.description }}
        />
      </div>
    )
  }
}

export default HoardingDisplay
