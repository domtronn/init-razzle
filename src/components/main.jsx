import './main.scss'
import { h } from 'preact'
import { connect } from 'preact-redux'

import { nextMonth, prevMonth } from '../redux/action-calendar'
import { getMonthName } from '../redux/selector-calendar'

import HueRotateTitle from './hue-rotate-title'
import Calendar from './calendar/calendar'
import CalendarControl from './calendar/calendar-control'

const main = ({ month, prevMonth, nextMonth }) => {
  return (
    <div className='home__container'>
      <div className='home__title'>
        <HueRotateTitle animate>{month}</HueRotateTitle>
      </div>
      <div className='home__calendar'>
        <CalendarControl variant='left' onclick={prevMonth} />
        <Calendar />
        <CalendarControl variant='right' onclick={nextMonth} />
      </div>
    </div>
  )
}

export default connect((s = '') => ({ month: getMonthName(s) }), { prevMonth, nextMonth })(main)
