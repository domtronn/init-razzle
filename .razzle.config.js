const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Jarvis = require('webpack-jarvis')

module.exports = (base, { target, dev }, webpack) => {
  const config = Object.assign({}, base)
  const isServer = target !== 'web'

  const loaders = {
    sass: { loader: 'sass-loader' },
    css: { loader: 'css-loader',  options: { modules: false, sourceMap: true, minimize: true } },
    postCss: {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('autoprefixer')(),
          require('cssnano')()
        ]
      }
    }
  }

  config.module.rules.push({
    test: /.scss$/,
    use: (() => {
      if (isServer) return [ loaders.css, loaders.sass, loaders.postCss ]
      if (dev) return ['style-loader', loaders.css, loaders.sass, loaders.postCss ]
      
      return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ { loader: 'css-loader', options: { importLoaders: 1 } }, loaders.postCss, loaders.sass ]
      })
    })()
  })

  config.resolve = Object.assign(
    config.resolve,
    {
      alias: {
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class'
      }
    }
  )
  
  !isServer && !dev && config.plugins.push(new ExtractTextPlugin('static/css/[name].[contenthash:8].css'))
  config.plugins.push(new Jarvis())

  return config
}
