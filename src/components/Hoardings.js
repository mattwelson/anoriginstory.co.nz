import React from 'react'

const Hoardings = ({ hoardings }) => (
  <div className="hoardings">
    {hoardings &&
      hoardings.map(h => (
        <img key={h.node.title} src={h.node.image.resolutions.src} alt="" />
      ))}
  </div>
)

export default Hoardings
