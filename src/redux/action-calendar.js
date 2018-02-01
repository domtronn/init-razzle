export const INIT_DATE = 'INIT_DATE'
export const SET_MONTH = 'SET_MONTH'
export const SET_DATE = 'SET_DATE'
export const NEXT_MONTH = 'NEXT_MONTH'
export const PREV_MONTH = 'PREV_MONTH'

export const loadDate = (date) => ({
  type: INIT_DATE
})

export const setMonth = (month) => ({
  type: SET_MONTH,
  payload: { month }
})

export const setDate = (date) => ({
  type: SET_DATE,
  payload: { date }
})

export const nextMonth = () => ({
  type: NEXT_MONTH
})

export const prevMonth = () => ({
  type: PREV_MONTH
})
