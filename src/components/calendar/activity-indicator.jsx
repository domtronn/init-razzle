import './activity-indicator.scss'

import { h } from 'preact'
import { connect } from 'preact-redux'

import { getRemindersDateGrouped } from '../../redux/selector-reminders'

const ActivityIndicator = ({ for: date, reminders = {} }) => {
  if (!reminders[date]) return

  return (
    <div className='activity__indicator'>
      { reminders[date].length }
    </div>
  )
}

export default connect((s = {}) => ({ reminders: getRemindersDateGrouped(s) }), { })(ActivityIndicator)
