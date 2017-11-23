import React from 'react'

const AboutSection = ({ section }) => {
  const [image] = section.images // todo: allow more than one image
  return (
    <section>
      <div className="section__hero">
        <img
          src={image.sizes.src}
          srcSet={image.sizes.srcSet}
          alt={image.description || section.title}
        />
        <h2>{section.title}</h2>
      </div>
      {section.logo && (
        <img
          src={section.logo.resolutions.src}
          srcSet={section.logo.resolutions.srcSet}
          alt="logo"
        />
      )}
      <div
        className="container"
        dangerouslySetInnerHTML={{
          __html: section.description.childMarkdownRemark.html
        }}
      />
    </section>
  )
}

export default AboutSection
