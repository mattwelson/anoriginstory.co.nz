import React from 'react'
import { getHeightForSections } from '../utils/helpers'

const AboutSection = ({ section }) => {
  const [image] = section.images // todo: allow more than one image
  return (
    <section>
      <div
        className={`section__hero ${(section.imageShim &&
          'section__hero--shim') ||
          ''} ${(section.parralax && 'section__hero--parallax') || ''}`}
      >
        <img
          src={image.sizes.src}
          srcSet={image.sizes.srcSet}
          alt={image.description || section.title}
        />
        <h1>{section.title}</h1>
      </div>
      {(section.logo || section.description) && (
        <div className="section__body container">
          {section.logo && (
            <img
              src={section.logo.resolutions.src}
              srcSet={section.logo.resolutions.srcSet}
              alt="logo"
            />
          )}
          {section.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: section.description.childMarkdownRemark.html
              }}
            />
          )}
        </div>
      )}
    </section>
  )
}

export default AboutSection
