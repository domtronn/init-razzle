import { h } from 'preact'
import './hue-rotate-title.scss'

import cx from 'classnames'

export default ({ children, animate }) => {
  const className = cx({
    'title__huerotate': true,
    'title__huerotate--animate': animate
  })

  return (<h1 className={className}>{children}</h1>)
}
