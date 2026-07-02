import moment from 'moment'

const formatDate = {
  getFormattedDate,
  getFormattedTime
}

function getFormattedDate (date = '', format = 'MMM DD, YYYY') {
  const momentDate = moment.tz(date, moment.tz.guess())
  return momentDate.format(format)
}

function getFormattedTime (timeInSec = 0) {
  if (timeInSec < 60) {
    return `${(timeInSec).toFixed(2)} sec`
  } else if (timeInSec < 3600) {
    return `${(timeInSec / 60).toFixed(2)} min`
  } else if (timeInSec < 86400) {
    return `${(timeInSec / 3600).toFixed(2)} hr`
  } else {
    return `${(timeInSec / 86400).toFixed(2)} day`
  }
}

export default formatDate
