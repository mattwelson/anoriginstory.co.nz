import qs from 'qs'
import pickBy from 'lodash/pickBy'

export const aspectRatio = file => {
  const width = parseInt(file.details.image.width)
  const height = file.details.image.height
  return width / height
}

export const getWidth = (file, height) => {
  return height * aspectRatio(file)
}

export const getUrlForImage = (file, options = {}) => {
  const args = pickBy(
    {
      h: options.height,
      fl: options.jpegProgresive ? 'progressive' : null,
      q: options.quality
    },
    x => x
  )
  return `${file.url}?${qs.stringify(args)}`
}

// to do add a bunch of srcset and size things
