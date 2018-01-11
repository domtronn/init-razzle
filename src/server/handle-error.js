export default () => async (ctx, next) => {
  try { await next() } catch (ex) {
    ctx.error(ex)
  }
}
