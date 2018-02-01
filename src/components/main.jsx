import './main.scss'
import { h } from 'preact'

import Calendar from './calendar/calendar'
import CalendarControl from './calendar/calendar-control'
import AnnualCalendar from './minicalendar/annual-calendar'

const main = () => {
  return (
    <div className='home__container'>
      <div className='annual__container' style={{ display: 'flex', margin: '0 5em' }}>
        <CalendarControl prev />
        <AnnualCalendar />
        <CalendarControl next />
      </div>
      <div className='spacer' style={{ height: '80px' }} />
      <Calendar />
    </div>
  )
}

export default main
