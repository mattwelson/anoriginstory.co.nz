import React from 'react'

const HoardingControls = ({ handleScroll }) => (
  <div className="controls">
    <div
      className="controls__button controls__button--left"
      onClick={() => handleScroll(-1)}
    >
      &lt;
    </div>
    <div
      className="controls__button controls__button--right"
      onClick={() => handleScroll()}
    >
      &gt;
    </div>
  </div>
)

export default HoardingControls
