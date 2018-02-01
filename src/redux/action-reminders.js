export const LOAD_REMINDERS = 'LOAD_REMINDERS'

export const loadReminders = (reminders) => ({
  type: LOAD_REMINDERS,
  payload: { reminders }
})
