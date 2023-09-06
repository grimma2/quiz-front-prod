import {ax, backendHost} from "@/api/defaults";
import countdown from "@/timer/countdown"

export const team = {
  state: () => ({
    time: 0,
    timer: 0,
    timerUI: '',
    timerIntervalId: false,
    teamSocket: false,
    gameState: 'OFF',
    activeQuestion: {},
    leaderBoard: {},
    notHaveLeaderBoard: false,
    remainAnswers: [], // for special type of question
    hints: []
  }),
  getters: {
    getFirstTimerValue (state) {
      if (!state.activeQuestion.hints.length) return 0

      let times = state.activeQuestion.hints[0].appear_after.split(':')
      console.log(times)
      let seconds = Number(times[1]) * 60 + Number(times[2])
      console.log(seconds)

      return seconds
    },
    getGivenTimerValue: (state) => (appearAfter) => {
      let times = appearAfter.split(':')
      return Number(times[1]) * 60 + Number(times[2])
    },
    getNextHintTime: (state) => (hint) => {
      try {
        let hintIndex = state.activeQuestion.hints.findIndex(ht => ht.pk === hint.pk)
        let times = state.activeQuestion.hints[hintIndex + 1].appear_after.split(':')
        return Number(times[1] * 60 + times[2])
      } catch (e) {}
    }
  },
  mutations: {
    setTimerUI (state, timerUI) {
      state.timerUI = timerUI
    },
    setTeamSocket (state, teamSocket) {
      state.teamSocket = teamSocket
    },
    setActiveQuestion (state, activeQuestion) {
      state.leaderBoard = {}
      state.activeQuestion = activeQuestion
    },
    setLeaderBoard (state, leaderBoard) {
      state.activeQuestion = {}
      state.leaderBoard = leaderBoard
    },
    setGameState (state, gameState) {
      state.gameState = gameState
    },
    setTime (state, time) {
      state.time = time
    },
    setTimer (state, timer) {
      state.timer = timer
    },
    setTimerIntervalId (state, timerIntervalId) {
      try {clearInterval(state.timerIntervalId)} catch (e) {}
      state.timerIntervalId = timerIntervalId
    },
    clearTimerInterval (state) {
      clearInterval(state.timerIntervalId)
      state.timerIntervalId = false
    },
    setNotHaveLeaderBoard (state, notHaveLeaderBoard) {
      state.notHaveLeaderBoard = notHaveLeaderBoard
    },
    setRemainAnswers (state, remainAnswers) {
      state.remainAnswers = remainAnswers
    },
    setHints (state, hints) {
      state.hints = hints
    }
  },
  actions: {
    makeTeamSocket ({commit}, code) {
      let wsProtocol = (location.protocol === 'http:') ? 'ws' : 'wss'
      const teamSocket = new WebSocket(`${wsProtocol}://${backendHost}/api/team-socket/${code}/`)
      teamSocket.onclose = (e) => {console.log(e)}
      commit('setTeamSocket', teamSocket)
    },
    async fetchLeaderBoard ({commit}, code) {
      console.log(`fetchLeaderBoard... code ${code}`)
      try {
        const response = await ax.post('game/get/leader-board/', {code: code})
        commit('setLeaderBoard', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchQuestion ({commit}, code) {
      // clear showed hints before fetch new question
      commit('setHints',  [])

      try {
        const response = await ax.post('team/get/active-question/', {code: code})
        commit('setActiveQuestion', response.data)
        commit('setRemainAnswers', response.data.correct_answers)
      } catch (e) {
        console.log(e)
      }
    },
    async changeGameState ({commit, dispatch, getters, state}, {eventData, code}) {
      console.log(`state: ${eventData}, code: ${code}`)
      if (eventData === 'OFF') {
        await dispatch('fetchLeaderBoard', code)
        commit('clearTimerInterval')
      } else if (eventData === 'ON') {
        await dispatch('fetchQuestion', code)
        commit('setTimer', getters.getFirstTimerValue)
        commit('setTimerIntervalId', setInterval(countdown(commit, state), 1000))
      }
      commit('setGameState', eventData)
    },
    nextQuestion ({commit, getters, state}, {eventData, code}) {
      console.log('nextQuestion action')
      if (eventData.correct_answers) {
        console.log(eventData)
        // if 'eventData' has this property then 'eventData' it is question
        // else it is leader_board
        commit('setActiveQuestion', eventData)
        commit('setTimer', getters.getFirstTimerValue)
        commit('setTimerIntervalId', setInterval(countdown(commit, state), 1000))
        // when blitz question just begun,
        // question's 'correct_answers' same as team's 'remain_answers'
        commit('setRemainAnswers', eventData.correct_answers)
      } else {
        commit('setLeaderBoard', eventData)
        commit('clearTimerInterval')
      }
    },
    updateLeaderBoard ({commit}, {eventData, code}) {
      console.log('updateLeaderBoard action')
      commit('setLeaderBoard', eventData)
    },
    sendNextQuestion ({state}, bonusPoints) {
      console.log('sendNextQuestion...')
      state.teamSocket.send(JSON.stringify({
        type: 'next_question',
        bonus_points: bonusPoints
      }))
    },
    sendBlitzAnswer ({state}, {bonusPoints, answerText}) {
      console.log('sendBlitzAnswer...')
      state.teamSocket.send(JSON.stringify({
        type: 'decrement_remain_answers',
        answer_text: answerText,
        bonus_points: bonusPoints
      }))
    },
    decrementRemainAnswers ({commit}, {eventData, code}) {
      commit('setRemainAnswers', eventData)
    },
    addHint ({commit, state, getters}, {eventData, code}) {
      commit('setHints', [...state.hints, eventData])

      let nextHintTime = getters.getNextHintTime(eventData)
      if (nextHintTime) {
        commit('setTimer',
          nextHintTime -
          getters.getGivenTimerValue(eventData.appear_after)
        )

        commit('setTimerIntervalId', setInterval(countdown(commit, state), 1000))
      }
    }
  },
  namespaced: true
}