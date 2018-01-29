/*
  Helper functions to allow easy modifications to Razzle config
  */

module.exports = ctx => ({
  addExclude (...args) {
    ctx
      .module.rules
      .find(({ loader = '' }) => loader.includes('file-loader'))
      .exclude
      .push(...args)
  }

  ,addRule (...rules) {
    ctx
      .module.rules
      .push(...rules)
  }

  ,addPlugin (...plugins) {
    ctx
      .plugins
      .push(...plugins)
  }

  ,addAlias (alias) {
    Object.assign(ctx.resolve, { alias })
  }
})
