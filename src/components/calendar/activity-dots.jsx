import './activity-dots.scss'
import { h } from 'preact'
import { connect } from 'preact-redux'

import { getRemindersDateGrouped } from '../../redux/selector-reminders'

const ActivityDots = ({ for: date, reminders = {} }) => (
  <div className='activitydots'>
    { (reminders[date] || []).map(() => (<div className='activitydots__dot' />)) }
  </div>
)

export default connect((s = {}) => ({ reminders: getRemindersDateGrouped(s) }), { })(ActivityDots)
