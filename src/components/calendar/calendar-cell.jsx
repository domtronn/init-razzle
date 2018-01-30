import { h } from 'preact'
import './calendar-cell.scss'

import cx from 'classnames'

const CalendarCell = ({ day = '', inactive = false }) => {
  const classNames = cx({
    'calendar__cell': true,
    'calendar__cell--inactive': inactive
  })

  return (
    <div className={classNames}>
      {String(day).padStart(2, '0')}
    </div>
  )
}

export default CalendarCell
