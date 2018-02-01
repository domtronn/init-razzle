import { DateTime } from 'luxon'

export const getYear = (s = {}) => s.date.year
export const getMonth = (s = {}) => s.date.month

export const getMonthObj = (s = {}) => DateTime.fromObject({ month: getMonth(s), year: getYear(s) }).startOf('month')
export const getMonthName = (s = {}) => getMonthObj(s).monthLong

export const getDaysInMonth = (s = {}) => getMonthObj(s).daysInMonth
export const getStartOfMonth = (s = {}) => getMonthObj(s).startOf('month')

export const getActive = (s = {}) => DateTime.fromObject(s.active).startOf('day')
