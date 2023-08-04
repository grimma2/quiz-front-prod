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
    notHaveLeaderBoard: false,
    remainAnswers: [], // for special type of question
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
    },
    setRemainAnswers (state, remainAnswers) {
      state.remainAnswers = remainAnswers
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
      try {
        const response = await ax.post('team/get/active-question/', {code: code})
        commit('setActiveQuestion', response.data)
        commit('setRemainAnswers', response.data.correct_answers)
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
        // else this leader_board
        commit('setTimer', state.questionTime)
        commit('setActiveQuestion', eventData)
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
    async fetchQuestionTime ({commit}, code) {
      try {
        const response = await ax.post('game/get/question-time/', {code: code})
        commit('setQuestionTime', response.data.time)
      } catch (e) {
        console.log(e)
      }
    },
    decrementRemainAnswers ({commit}, {eventData, code}) {
      commit('setRemainAnswers', eventData)
    }
  },
  namespaced: true
}