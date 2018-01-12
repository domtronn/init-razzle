export default (time, { status = 408 } = {}) => async (ctx, next) => {
  let timer
  const timeout = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      ctx.state.timeout = true
      ctx.status = status
      ctx.body = {}

      reject(new Error(`Request timedout: ${time}ms`))
    }, time)
  })

  try { await Promise.race([ timeout, next() ]) } catch (ex) {
    if (ctx.state.timeout) ctx.throw(408, 'Request timeout')
  }
  clearTimeout(timer)
}
