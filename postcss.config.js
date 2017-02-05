module.exports = () => ({
  plugins: {
    'postcss-smart-import': {},
    'postcss-cssnext': {
      browsers: ['ie >= 9']
    },
    'cssnano': {
      autoprefixer: false
    }
  }
})
