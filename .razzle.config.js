const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (base, { target, dev }, webpack) => {
  const config = Object.assign({}, base)
  const isServer = target !== 'web'

  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        autoprefixer({ browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'] })
      ]
    }
  }

  const cssLoader = (() => {
    switch (true) {
      case isServer: return 'css-loader';
      case dev: return ['style-loader', {loader: 'css-loader', options: {modules: false, sourceMap: true,},}, postCssLoader, 'sass-loader']
      default: return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ { loader: 'css-loader', options: { importLoaders: 1 } }, postCssLoader, 'sass-loader' ]
      })
    }
  })()

  config.module.rules.push({ test: /.scss$/, use: cssLoader })
  // config.plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: true, analyzerPort: isServer ? 8080 : 8081  }))

  !isServer && !dev && config.plugins.push(new ExtractTextPlugin('static/css/[name].[contenthash:8].css'))

  return config
}
