import React from 'react'

const Hoardings = ({ hoardings }) => (
  <div className="hoardings">
    {hoardings &&
      hoardings.map(h => (
        <div key={h.node.title} className="hoarding">
          <img src={h.node.image.resolutions.src} alt="" />
        </div>
      ))}
  </div>
)

export default Hoardings
