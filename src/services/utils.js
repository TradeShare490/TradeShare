export const utils = {
  methods: {
    timeSince (date) {
      const time = new Date(date).getTime() / 1000

      const seconds = Math.floor((new Date().getTime() / 1000 - time))

      let interval = seconds / 31536000

      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' a year ago' : Math.floor(interval) + ' years ago'
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' a month ago' : Math.floor(interval) + ' months ago'
      }
      interval = seconds / 86400
      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' a day ago' : Math.floor(interval) + ' days ago'
      }
      interval = seconds / 3600
      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' an hour ago' : Math.floor(interval) + ' hours ago'
      }
      interval = seconds / 60
      if (interval > 1) {
        return Math.floor(interval) === 1 ? ' a minute ago' : Math.floor(interval) + ' minutes ago'
      }
      return Math.floor(interval) === 1 ? ' a second ago' : Math.floor(interval) + ' seconds ago'
    },
    getAge (date) {
      const createdDate = new Date(date)
      const now = new Date()

      const yearNow = now.getYear()
      const monthNow = now.getMonth()
      const dateNow = now.getDate()

      const yearCreated = createdDate.getYear()
      const monthCreated = createdDate.getMonth()
      const dateCreated = createdDate.getDate()

      let age = {}
      let ageString = ''
      let yearString = ''
      let monthString = ''
      let dayString = ''

      let yearAge = yearNow - yearCreated
      let monthAge = 0
      let dateAge = 0
      if (monthNow >= monthCreated) {
        monthAge = monthNow - monthCreated
      } else {
        yearAge--
        monthAge = 12 + monthNow - monthCreated
      }
      if (dateNow >= dateCreated) {
        dateAge = dateNow - dateCreated
      } else {
        monthAge--
        dateAge = 31 + dateNow - dateCreated

        if (monthAge < 0) {
          monthAge = 11
          yearAge--
        }
      }
      age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
      }

      if (age.years > 1) yearString = ' years'
      else yearString = ' year'
      if (age.months > 1) monthString = ' months'
      else monthString = ' month'
      if (age.days > 1) dayString = ' days'
      else dayString = ' day'

      if ((age.years > 0) && (age.months > 0) && (age.days > 0)) {
        ageString = age.years + yearString + ', ' + age.months + monthString + ', ' + age.days + dayString
      } else if ((age.years === 0) && (age.months === 0) && (age.days > 0)) {
        ageString = age.days + dayString
      } else if ((age.years > 0) && (age.months === 0) && (age.days === 0)) {
        ageString = age.years + yearString
      } else if ((age.years > 0) && (age.months > 0) && (age.days === 0)) {
        ageString = age.years + yearString + ', ' + age.months + monthString
      } else if ((age.years === 0) && (age.months > 0) && (age.days > 0)) {
        ageString = age.months + monthString + ', ' + age.days + dayString
      } else if ((age.years > 0) && (age.months === 0) && (age.days > 0)) {
        ageString = age.years + yearString + ', ' + age.days + dayString
      } else if ((age.years === 0) && (age.months > 0) && (age.days === 0)) {
        ageString = age.months + monthString
      } else {
        ageString = 'Unavailable'
      }

      return ageString
    }
  }
}
