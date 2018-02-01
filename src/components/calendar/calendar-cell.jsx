import './calendar-cell.scss'
import { h } from 'preact'
import { connect } from 'preact-redux'

import cx from 'classnames'

import { getMonthObj, getActive } from '../../redux/selector-calendar'
import { setDate } from '../../redux/action-calendar'

import ActivityDots from './activity-dots'

const CalendarCell = ({ setDate, active, date, day }) => {
  const exactDate = date.set({ day })
  const isActive = +active === +exactDate.startOf('day')

  const classNames = cx({
    'calendar__cell': true,
    'calendar__cell--active': isActive,
    'calendar__cell--weekend': [6, 7].includes(exactDate.weekday)
  })

  return (
    <div className='calendar__cell__container'>
      <div className={classNames}>
        {day && String(day).padStart(2, '0')}
      </div>
      {[
        <ActivityDots for={exactDate.toFormat('yyyy-MM-dd')} />,
        <a className='calendar__cell--inverted' onclick={() => setDate(exactDate.toObject())} >
          {day ? String(day).padStart(2, '0') : ''}
        </a>
      ]}
    </div>
  )
}

const mapStateToProps = (s = {}) => ({ date: getMonthObj(s), active: getActive(s) })
export default connect(mapStateToProps, { setDate })(CalendarCell)
