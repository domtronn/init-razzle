import { trace } from './koa-tracer'

describe(`koa-trace.js`, () => {
  beforeEach(() => { process.env.NODE_ENV = 'production' })

  test('should add a new trace context correctly', () => {
    const ctx = { state: {} }
    trace(ctx, 'new_trace', 'message')
    expect(ctx.state.trace.new_trace).toBeDefined()
  })

  test('should add multiple messages to the same context', () => {
    const ctx = { state: {} }
    trace(ctx, 'new_trace', 'message1')
    trace(ctx, 'new_trace', 'message2')

    expect(ctx.state.trace.new_trace.length).toBe(2)
    expect(ctx.state.trace.new_trace[0]).toEqual(expect.objectContaining({ msg: 'message1' }))
    expect(ctx.state.trace.new_trace[1]).toEqual(expect.objectContaining({ msg: 'message2' }))
  })

  it('should preserve other object properties passed in as meta data', () => {
    const ctx = { state: {} }
    trace(ctx, 'new_trace', {msg: 'message', reason: 'bar'})

    expect(ctx.state.trace.new_trace[0]).toEqual(expect.objectContaining({ msg: 'message', reason: 'bar' }))
  })

  it('should note down the time difference between traces', async () => {
    const ctx = { state: {} }

    trace(ctx, 'new_trace', 'a')
    await new Promise(resolve => setTimeout(resolve, 10))
    trace(ctx, 'new_trace', 'b')

    expect(ctx.state.trace.new_trace[1].timeDiff).toEqual(expect.any(Number))
  })

  it('should be able to trace multiple keys', () => {
    const ctx = { state: {} }

    trace(ctx, 'trace_one', 'a')
    trace(ctx, 'trace_two', 'b')

    expect(ctx.state.trace.trace_one).toBeDefined()
    expect(ctx.state.trace.trace_two).toBeDefined()
  })
})
