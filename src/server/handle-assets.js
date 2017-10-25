const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

export default async (ctx, next) => {
  ctx.assets = assets
  return next()
}
