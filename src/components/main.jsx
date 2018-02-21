import './main.scss'
import { h } from 'preact'
import { connect } from 'preact-redux'

import { getActive } from '../redux/selector-calendar'

import Calendar from './calendar/calendar'
import AnnualCalendar from './minicalendar/annual-calendar'

const Main = ({ date }) => {
  return (
    <div className='home__container'>
      <div className='summary__container'>
        <div className='summary'>{date.toFormat('EEE, d MMM, yyyy')}</div>
      </div>
      <div className='annual__container' style={{ display: 'flex', margin: '0 5em' }}>
        <AnnualCalendar />
      </div>
      <div className='spacer' style={{ height: '80px' }} />
      <Calendar />
    </div>
  )
}

export default connect((s = {}) => ({ date: getActive(s) }), { })(Main)
