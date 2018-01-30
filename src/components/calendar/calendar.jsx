import './calendar.scss'
import { h } from 'preact'
import { connect } from 'preact-redux'

import { getDaysInMonth, getStartOfMonth } from '../../redux/selector-calendar'

import CalendarCell from './calendar-cell'
import Weekdays from './weekdays'

const Calendar = ({ days, start }) => (
  <div className='calendar'>
    <div className='calendar__days' >
      <Weekdays />
    </div>
    <div className='calendar__cells'>
      {[
        [...Array(start.weekday - 1)].map(() => <CalendarCell inactive />),
        [...Array(days)].map((_, day) => <CalendarCell day={day + 1} />)
      ]}
    </div>

  </div>
)

export default connect((s = {}) => ({ days: getDaysInMonth(s), start: getStartOfMonth(s) }))(Calendar)
