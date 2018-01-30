export const LOAD_MONTH = 'LOAD_MONTH'
export const NEXT_MONTH = 'NEXT_MONTH'
export const PREV_MONTH = 'PREV_MONTH'

export const loadMonth = (month) => ({
  type: LOAD_MONTH,
  payload: { month }
})

export const nextMonth = () => ({
  type: NEXT_MONTH
})

export const prevMonth = () => ({
  type: PREV_MONTH
})
