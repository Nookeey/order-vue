export default {
  created () {
    setInterval(() => {
      let curTime = new Date().getTime()
      let d = new Date()
      let month = d.getMonth()
      let day = d.getDate()
      let year = d.getFullYear()
      let countDownDate = new Date(month + 1 + ' ' + day + ', ' + year + ' ' + this.deadline + ':00').getTime()
      let distance = countDownDate - curTime
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((distance % (1000 * 60)) / 1000)
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      if (hours < 1 && minutes < 5) {
        this.countdownTimeRed = true
      } else {
        this.countdownTimeRed = false
      }
      this.countdownTime = hours + ':' + minutes + ':' + seconds
      distance < 0 ? this.deadlineStatus = false : this.deadlineStatus = true
    }, 1000)
  }
}
