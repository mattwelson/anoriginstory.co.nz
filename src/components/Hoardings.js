import React from 'react'
import { Lazy } from 'react-lazy'

const Hoardings = ({ hoardings }) => (
  <div className="hoardings">
    {hoardings &&
      hoardings.map(h => (
        <div
          key={h.node.title}
          className="hoarding"
          style={{
            minWidth: h.node.image.resolutions.width,
            height: h.node.image.resolutions.height
          }}
        >
          <Lazy cushion={1000} onLoad={console.log} onViewport={console.log}>
            <img
              src={h.node.image.resolutions.src}
              alt=""
              width={h.node.image.resolutions.width}
              height={h.node.image.resolutions.height}
            />
          </Lazy>
        </div>
      ))}
  </div>
)

export default Hoardings
