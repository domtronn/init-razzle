import './annual-calendar.scss'

import { h } from 'preact'
import { connect } from 'preact-redux'
import { getMonth } from '../../redux/selector-calendar'

import MiniCalendar from './mini-calendar'

const AnnualCalendar = ({ month }) => (
  <div className='minical__container' >
    {
      [...Array(12)].map((_, i) => (
        <MiniCalendar active={i + 1 === month} month={i + 1} />
      ))
    }
  </div>
)

export default connect((s = {}) => ({ month: getMonth(s) }))(AnnualCalendar)
