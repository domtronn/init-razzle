import server from '../../server.template.ejs'

export default async (ctx, next) => {
  ctx.render = server
  return next()
}
