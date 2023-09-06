function countdown (commit, state, isGlobalCommit=false) {

  function innerCountdown () {
    console.log(isGlobalCommit)
    
    let hours = Math.floor(state.timer / 3600)
    let minutes = Math.floor(state.timer / 60) - hours * 60
    let seconds = state.timer - (hours * 3600 + minutes * 60)
    console.log(`minutes: ${minutes}`)
    console.log(`seconds: ${seconds}`)

    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    if (isGlobalCommit) {
      commit('team/setTimerUI', `${minutes}:${seconds}`)
      commit('team/setTimer', state.timer - 1)
    } else {
      commit('setTimerUI', `${minutes}:${seconds}`)
      commit('setTimer', state.timer - 1)
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