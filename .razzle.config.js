const bindMods = require('./.razzle.modifications.js')

const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (base, { target, dev }, webpack) => {
  const config = Object.assign({}, base)
  const { addAlias, addExclude, addPlugin, addRule } = bindMods(config)

  const isServer = target !== 'web'

  const loaders = {
    sass: { loader: 'sass-loader', options: { includePaths: [ './node_modules/ustyle/vendor/assets/stylesheets' ] } },
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

  addExclude(/\.ejs$/, /\.svg$/)
  addRule({ test: /\.ejs$/, loader: 'ejs-compiled-loader' })
  addRule({ test: /\.svg$/, loader: 'raw-loader' })
  addRule({
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

  addAlias({
    'react': 'preact-compat',
    'react-dom': 'preact-compat',
    'create-react-class': 'preact-compat/lib/create-react-class',
    'koa-logger': '@uswitch/koa-logger',
    'koa-tracer': '@uswitch/koa-tracer'
  })

  !isServer && !dev && addPlugin(new ExtractTextPlugin('static/css/[name].[contenthash:8].css'))

  return config
}
