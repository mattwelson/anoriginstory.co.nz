import React from 'react'

const HoardingControls = ({ handleScroll }) => (
  <div className="controls">
    <div
      className="controls__button controls__button--left"
      onClick={() => handleScroll(-1)}
    >
      &lsaquo;
    </div>
    <div
      className="controls__button controls__button--right"
      onClick={() => handleScroll()}
    >
      &rsaquo;
    </div>
  </div>
)

export default HoardingControls
