import {ax, backendHost} from "@/api/defaults";

export const team = {
  state: () => ({
    questionTime: 0,
    timer: 0,
    timerIntervalId: false,
    teamSocket: false,
    gameState: 'OFF',
    activeQuestion: {},
    leaderBoard: {},
    notHaveLeaderBoard: false
  }),
  getters: {},
  mutations: {
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
    setQuestionTime (state, questionTime) {
      state.questionTime = questionTime
    },
    setTimer (state, timer) {
      state.timer = timer
    },
    setTimerIntervalId (state, timerIntervalId) {
      state.timerIntervalId = timerIntervalId
    },
    clearTimerInterval (state) {
      clearInterval(state.timerIntervalId)
      state.timerIntervalId = false
    },
    setNotHaveLeaderBoard (state, notHaveLeaderBoard) {
      state.notHaveLeaderBoard = notHaveLeaderBoard
    }
  },
  actions: {
    makeTeamSocket ({commit}, code) {
      const teamSocket = new WebSocket(`ws://${backendHost}/team-socket/${code}/`)
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
      try {
        const response = await ax.post('team/get-active-question/', {code: code})
        commit('setActiveQuestion', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    changeGameState ({commit, dispatch, state}, {eventData, code}) {
      console.log(`state: ${eventData}, code: ${code}`)
      if (eventData === 'OFF') {
        dispatch('fetchLeaderBoard', code)
        commit('clearTimerInterval')
      } else if (eventData === 'ON') {
        commit('setTimer', state.questionTime)
        dispatch('fetchQuestion', code)
      }
      commit('setGameState', eventData)
    },
    nextQuestion ({commit, state}, {eventData, code}) {
      console.log('nextQuestion action')
      if (eventData.correct_answers) {
        // if 'eventData' has this property then 'eventData' this question
        // esle this leader_board
        commit('setTimer', state.questionTime)
        commit('setActiveQuestion', eventData)
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
    async fetchQuestionTime ({commit}, code) {
      try {
        const response = await ax.post('game/get/question-time/', {code: code})
        commit('setQuestionTime', response.data.time)
      } catch (e) {
        console.log(e)
      }
    }
  },
  namespaced: true
}