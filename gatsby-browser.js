import throttle from 'lodash/throttle'

const strength = 0.1

exports.onInitialClientRender = () => {
  window.addEventListener(
    'scroll',
    throttle(
      _ => {
        const sections = [
          ...document.querySelectorAll('.section__hero--parallax')
        ]

        sections[0].forEach(s => {
          const delta = (window.pageYOffset - s.offsetTop) * strength
          const image = s.querySelector('img')
          image.setAttribute('style', `transform: translateY(${delta}px)`)
        })
      },
      15,
      { leading: true }
    )
  )
}
