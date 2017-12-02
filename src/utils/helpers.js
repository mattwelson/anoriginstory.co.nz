import qs from 'qs'
import pickBy from 'lodash/pickBy'
import slugify from 'slugify'

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
      q: options.quality || 90
    },
    x => x
  )
  return `${file.url}?${qs.stringify(args)}`
}

export const getSrcSetForImage = (file, options = {}) => {
  const sizes = [
    { height: options.height, res: '1x' },
    { height: Math.round(options.height * 1.5), res: '1.5x' },
    { height: options.height * 2, res: '2x' },
    { height: options.height * 3, res: '3x' }
  ]

  const filteredSizes = sizes.filter(
    size => size.height < file.details.image.height
  )

  return filteredSizes
    .map(
      size =>
        `${getUrlForImage(file, { ...options, height: size.height })} ${
          size.res
        }`
    )
    .join(',\n')
}

export const getHeightForSections = browserHeight => {
  // round down to hundreds of pixels, cap between 700 and 300?
  const minHeight = 350
  const maxHeight = 700
  const maxProportion = 0.6
  const roundTo = 100
  const panelHeight = Math.max(
    minHeight,
    Math.min(
      maxHeight,
      roundTo * Math.floor(maxProportion * browserHeight / roundTo)
    )
  )
  return panelHeight
}

export const getBlackBarWidth = (
  browserWidth,
  right = false,
  lastSectionWidth = 0
) => {
  const maxWidth = 1200
  const padding = 100 // for the controls, don't want half overlays!

  const delta = (browserWidth - maxWidth) / 2
  const leftBar = delta > padding ? delta : 0

  if (!right) return leftBar
  return Math.max(leftBar, browserWidth - leftBar - lastSectionWidth)
}

export const slug = text =>
  slugify(text, {
    remove: '"',
    lower: true
  })
