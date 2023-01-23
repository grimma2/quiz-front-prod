import axios from 'axios'


export const backendHost = 'localhost'

export const ax = axios.create({
  baseURL: `http://${backendHost}/api/v1/`,
  withCredentials: true
})


export const teamSocketEvents = {
  'next_question': 'team/nextQuestion',
  'change_state': 'team/changeGameState',
  'update_leader_board': 'team/updateLeaderBoard',
  'decrement_remain_answers': 'team/decrementRemainAnswers'
}

export const gameSocketEvents = {
  'change_state': 'game/changeGameState'
}
