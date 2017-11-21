import React from 'react'
import throttle from 'lodash/throttle'
import { Lazy, checkElementsInViewport } from 'react-lazy'
import { TweenLite } from 'gsap'

import HoardingControls from './HoardingControls'

import './hoardings.scss'

class HoardingDisplay extends React.Component {
  componentDidMount() {
    this.changeHoarding(0)
  }

  state = {}

  hoardingNodes = []

  changeHoarding = index => {
    const hoarding = this.props.hoardings.edges[index]
    if (hoarding) {
      this.setState(() => ({
        current: index,
        title: hoarding.node.title,
        description:
          hoarding.node.childContentfulSectionDescriptionTextNode
            .childMarkdownRemark.html
      }))
    }
  }

  onHoardingScroll = throttle(
    e => {
      const scrollPosition =
        this.hoardingContainer.scrollLeft +
        this.hoardingContainer.offsetWidth * 0.35
      let index = this.hoardingNodes.reduce((current, x, i) => {
        return scrollPosition < x.offsetLeft ? current : i
      }, 0)
      checkElementsInViewport()
      this.changeHoarding(index)
      // maybe also set the left most edge and right most edge so I can disable controls
    },
    200,
    { leading: true }
  )

  scroll = (direction = 1) => {
    const scrollDelta = direction * 0.5 * this.hoardingContainer.offsetWidth
    const scrollLeft = this.hoardingContainer.scrollLeft + scrollDelta
    TweenLite.to(this.hoardingContainer, 0.3, { scrollLeft })
  }

  scrollToHoarding = (deltaIndex = 1) => {
    const index = this.state.current + deltaIndex
    const hoarding = this.props.hoardings.edges[index]
    if (hoarding) {
      const scrollLeft = this.hoardingNodes[index].offsetLeft
      TweenLite.to(this.hoardingContainer, 0.3, { scrollLeft })
    }
  }

  render() {
    // some hacks to try and avoid a flash of missing stuffs
    let { title, description } = this.state
    const firstHoarding = this.props.hoardings.edges[0]
    if (!title && firstHoarding) {
      title = firstHoarding.node.title
      description = firstHoarding.node.description
    }
    const hoardings = this.props.hoardings.edges

    return (
      <div className="hoarding-display">
        <h2 className="container">{this.state.title}</h2>
        <div className="hoardings__container">
          <div
            className="hoardings"
            onScroll={this.onHoardingScroll}
            ref={n => (this.hoardingContainer = n)}
          >
            {hoardings &&
              hoardings.map((h, i) => (
                <div
                  key={h.node.title}
                  className="hoarding"
                  style={{
                    //minWidth: h.node.image.resolutions.width,
                    height: 500, // change later
                    minWidth: 300
                  }}
                  ref={n => (this.hoardingNodes[i] = n)}
                >
                  {h.node.panels.map(panel => (
                    <Lazy cushion={1000}>
                      <img
                        src={panel.image.sizes.src}
                        alt=""
                        minWidth={400} // change later
                        height={500}
                      />
                    </Lazy>
                  ))}
                </div>
              ))}
          </div>
          <HoardingControls handleScroll={this.scroll} />
        </div>
        <div
          className="container columns"
          dangerouslySetInnerHTML={{ __html: this.state.description }}
        />
      </div>
    )
  }
}

export default HoardingDisplay
