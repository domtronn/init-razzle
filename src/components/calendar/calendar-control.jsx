import './calendar-control.scss'
import { h } from 'preact'
import { connect } from 'preact-redux'

import { prevMonth, nextMonth } from '../../redux/action-calendar'

import cx from 'classnames'
import { Icon } from 'ustyle-react'

const CalendarControl = ({ next = false, prev = false, nextMonth, prevMonth }) => {
  const { onClick, variant } = {
    [prev]: { onClick: prevMonth, variant: 'left' },
    [next]: { onClick: nextMonth, variant: 'right' }
  }[true]

  const classNames = cx({
    'calendarcontrol': true,
    [`calendarcontrol--${variant}`]: true
  })

  return (
    <a className={classNames} onclick={onClick} >
      <Icon size='large' name={`chevron-${variant}`} />
    </a>
  )
}

export default connect(s => ({}), { nextMonth, prevMonth })(CalendarControl)
