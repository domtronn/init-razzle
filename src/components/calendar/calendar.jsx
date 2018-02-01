import './calendar.scss'
import { h } from 'preact'
import { connect } from 'preact-redux'

import { getDaysInMonth, getStartOfMonth } from '../../redux/selector-calendar'

import Weekdays from './weekdays'
import CalendarCell from './calendar-cell'
import CalendarCellInactive from './calendar-cell-inactive'

const Calendar = ({ days, start }) => (
  <div className='calendar'>
    <div className='calendar__days' >
      <Weekdays />
    </div>
    <div className='calendar__cells'>
      {[
        [...Array(start.weekday - 1)].map(() => <CalendarCellInactive />),
        [...Array(days)].map((_, day) => <CalendarCell day={day + 1} />),
        [...Array((8 - ((days + start.weekday) % 7)) % 7)].map(() => <CalendarCellInactive />)
      ]}
    </div>
  </div>
)

export default connect((s = {}) => ({
  days: getDaysInMonth(s),
  start: getStartOfMonth(s)
}))(Calendar)
