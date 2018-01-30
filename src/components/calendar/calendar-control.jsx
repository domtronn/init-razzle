import './calendar-control.scss'
import { h } from 'preact'

import cx from 'classnames'
import { Icon } from 'ustyle-react'

const CalendarControl = ({ variant = 'left', onclick }) => {
  const classNames = cx({
    'calendarcontrol': true,
    [`calendarcontrol--${variant}`]: true
  })

  return (
    <a className={classNames} onclick={onclick} >
      <Icon size='large' name={`chevron-${variant}`} />
    </a>
  )
}

export default CalendarControl
