function countdown (commit, state) {

  function innerCountdown () {
    console.log('countdown')
    let hours = Math.floor(state.timer / 3600)
    let minutes = Math.floor(state.timer / 60) - hours * 60
    let seconds = state.timer - (hours * 3600 + minutes * 60)

    if (hours >= 0 && minutes >= 0 && seconds >= 0) {
      commit('setTimerUI', `${hours}:${minutes}:${seconds}`)
      commit('setTimer', state.timer - 1)
    } else {
      console.log(`set ${hours}:${minutes}:${seconds}`)
    }

    if (state.timer <= 0) {
      try {
        // interval may already cleared before
        console.log(state.timerIntervalId)
        clearInterval(state.timerIntervalId)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return innerCountdown
}

export default countdown