import './mini-calendar.scss'
import { h } from 'preact'
import { connect } from 'preact-redux'

import { setMonth } from '../../redux/action-calendar'
import { Info } from 'luxon'

import cx from 'classnames'

const MiniCalendar = ({ setMonth, active, month }) => {
  const classNames = cx({
    'minical': true,
    'minical--active': active
  })

  return (
    <a className={classNames} onclick={() => setMonth(month)}>
      <div className='minical__month'>{Info.months('short')[month - 1]}</div>
      <div className='minical__dots'>
        {
          [
            <div className='minical__dot minical__dot--hidden' />,
            [...Array(17)].map(() => (<div className='minical__dot' />))
          ]
        }
      </div>
    </a>
  )
}

export default connect(s => ({}), { setMonth })(MiniCalendar)
