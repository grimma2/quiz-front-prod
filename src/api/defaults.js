import axios from 'axios'

export const backendHost = (process.env.NODE_ENV === 'development') ? 'localhost:8000' : 'quiz-game1.ru'

export const ax = axios.create({
  baseURL: `${location.protocol}//${backendHost}/api/v1/`,
  withCredentials: true
})

export const teamSocketEvents = {
  'next_question': 'team/nextQuestion',
  'change_state': 'team/changeGameState',
  'update_leader_board': 'team/updateLeaderBoard',
  'decrement_remain_answers': 'team/decrementRemainAnswers',
  'add_hint': 'team/addHint'
}

export const gameSocketEvents = {
  'change_state': 'game/changeGameState'
}
