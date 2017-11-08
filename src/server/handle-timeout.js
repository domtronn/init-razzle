export default async (ctx, next) => !ctx.state.timeout && next()
