import React from 'react'
import throttle from 'lodash/throttle'
import { Lazy, checkElementsInViewport } from 'react-lazy'
import { TweenLite } from 'gsap'

import HoardingControls from './HoardingControls'

import './hoarding.scss'

class HoardingDisplay extends React.Component {
  componentDidMount() {
    this.changeHoarding(0)
  }

  state = {}

  hoardingNodes = []

  changeHoarding = index => {
    const section = this.props.sections[index]
    if (section) {
      this.setState(() => ({
        current: index,
        title: section.title,
        description:
          section.childContentfulSectionDescriptionTextNode.childMarkdownRemark
            .html
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
    const sections = this.props.sections
    // some hacks to try and avoid a flash of missing stuffs
    const { title, description } = this.state || sections[0]

    return (
      <div>
        <h2 className="container">{title}</h2>
        <div className="hoarding__container">
          <div
            className="hoarding"
            onScroll={this.onHoardingScroll}
            ref={n => (this.hoardingContainer = n)}
          >
            {sections &&
              sections.map((s, i) => (
                <div
                  key={s.title}
                  className="section"
                  style={{
                    height: 500 // change later
                    //minWidth: 2000
                  }}
                  ref={n => (this.hoardingNodes[i] = n)}
                >
                  {s.panels.map(panel => (
                    <Lazy cushion={1000} key={panel.id}>
                      <img src={panel.image.sizes.src} alt="" height={500} />
                    </Lazy>
                  ))}
                </div>
              ))}
          </div>
          <HoardingControls handleScroll={this.scroll} />
        </div>
        <div
          className="container columns"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    )
  }
}

export default HoardingDisplay
