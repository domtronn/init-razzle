import './weekdays.scss'
import { h } from 'preact'

import { Info } from 'luxon'

const Weekdays = ({ format = 'short' }) => (
  <div className='weekdays'>
    {
      Info
        .weekdays(format)
        .map((day) => (
          <div className='weekdays__day'>
            <span>{day}</span>
          </div>
        ))
    }
  </div>
)

export default Weekdays
