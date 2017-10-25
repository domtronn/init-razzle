import { readFileSync } from 'fs'
import { resolve } from 'path'

export default async (ctx, next) => {
  ctx.template = readFileSync(resolve(__dirname, '../server.template.ejs'), 'utf-8')
  return next()
}
