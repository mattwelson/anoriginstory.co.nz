import React from 'react'
import throttle from 'lodash/throttle'
import { Lazy, checkElementsInViewport } from 'react-lazy'
import { TweenLite } from 'gsap'

import HoardingControls from './HoardingControls'
import {
  getWidth,
  getUrlForImage,
  getHeightForSections,
  getBlackBarWidth,
  getSrcSetForImage
} from '../utils/helpers'

import './hoarding.scss'

class HoardingDisplay extends React.Component {
  componentDidMount() {
    this.changeSection(0)
    this.scroll(0)
    this.setSizes()

    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  state = {}

  sectionNodes = []
  panelNodes = []

  changeSection = index => {
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
      const sectionIndex = this.sectionNodes.reduce((current, x, i) => {
        return scrollPosition < x.offsetLeft ? current : i
      }, 0)
      checkElementsInViewport()
      this.changeSection(sectionIndex)
      // maybe also set the left most edge and right most edge so I can disable controls
    },
    200,
    { leading: true }
  )

  onResize = throttle(e => {
    this.setSizes()
  })

  scroll = (direction = 1) => {
    const titleLeft = this.titleNode.offsetLeft
    const scrollPosition = this.hoardingContainer.scrollLeft + titleLeft
    const mergedPanels = [].concat.apply([], this.panelNodes)

    const panelIndex = mergedPanels.reduce((current, x, i) => {
      return scrollPosition < x.offsetLeft ? current : i
    }, 0)
    // get panel left position
    const panel = mergedPanels[panelIndex + direction]

    if (!panel) return

    const panelLeft = panel.offsetLeft
    // get text position to align to

    TweenLite.to(this.hoardingContainer, 0.3, {
      scrollLeft: panelLeft - (this.state.blackBarWidth || titleLeft)
    })
  }

  setSizes = () => {
    this.setState(() => ({
      sectionHeight: getHeightForSections(window.outerHeight),
      blackBarWidth: getBlackBarWidth(window.innerWidth)
    }))
  }

  render() {
    const sections = this.props.sections
    // some hacks to try and avoid a flash of missing stuffs
    const { title, description } = this.state || sections[0]
    let height = this.state.sectionHeight
    if (!height && typeof window !== 'undefined') height = window.outerHeight

    return (
      <div>
        <div className="container">
          <h2 ref={n => (this.titleNode = n)}>{title}</h2>
        </div>
        <div className="hoarding__container">
          <div
            className="hoarding"
            onScroll={this.onHoardingScroll}
            ref={n => (this.hoardingContainer = n)}
            style={{ height }}
          >
            <div
              className="section--buffer"
              style={{ minWidth: this.state.blackBarWidth }}
            />
            {sections &&
              sections.map((s, i) => (
                <div
                  key={s.title}
                  className="section"
                  style={{
                    height
                  }}
                  ref={n => (this.sectionNodes[i] = n)}
                >
                  {s.panels.map((panel, panelIndex) => {
                    const file = panel.image.file
                    const width = getWidth(file, height)
                    this.panelNodes[i] = []
                    return (
                      <div
                        key={panel.id}
                        style={{
                          width
                        }}
                        ref={n => (this.panelNodes[i][panelIndex] = n)}
                        className="section__panel"
                      >
                        <Lazy cushion={2000}>
                          <img
                            src={getUrlForImage(file, {
                              height,
                              jpegProgresive: true
                            })}
                            srcSet={getSrcSetForImage(file, {
                              height,
                              jpegProgresive: true
                            })}
                            alt=""
                            height={height}
                            width={width}
                          />
                        </Lazy>
                      </div>
                    )
                  })}
                </div>
              ))}
            <div
              className="section--buffer"
              style={{ minWidth: this.state.blackBarWidth }}
            />
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
