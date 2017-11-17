import Typography from 'typography'

export default Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['700']
    },
    {
      name: 'Merriweather',
      styles: ['400', '400i', '700', '700i']
    }
  ],
  headerFontFamily: [
    'Montserrat',
    'Avenir Next',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif'
  ],
  bodyFontFamily: ['Merriweather', 'Georgia', 'serif'],
  bodyColor: 'white'
})
