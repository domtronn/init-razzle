import { DateTime } from 'luxon'

export const getMonth = (s = '') => s.month
export const getMonthObj = (s = '') => DateTime.fromObject({ month: getMonth(s) })
export const getMonthName = (s = '') => getMonthObj(s).monthLong

export const getDaysInMonth = (s = '') => getMonthObj(s).daysInMonth
export const getStartOfMonth = (s = '') => getMonthObj(s).startOf('month')
