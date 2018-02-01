/* Helper to group by function call or key */
const groupBy = (arr, fn) => arr
  .map(typeof fn === 'function' ? fn : obj => obj[fn])
  .reduce((acc, it, i) => Object.assign(acc, {[it]: [...(acc[it] || []), arr[i]]}), {})

export const getReminders = (s = {}) => s.reminders || []
export const getRemindersDateGrouped = (s = {}) => groupBy(getReminders(s), 'date')
