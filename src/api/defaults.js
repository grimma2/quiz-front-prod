import axios from 'axios'


export const backendHost = '62.113.100.228:8000'

export const ax = axios.create({
  baseURL: `http://${backendHost}/api/v1/`
})


export const teamSocketEvents = {
  'next_question': 'team/nextQuestion',
  'change_state': 'team/changeGameState',
  'update_leader_board': 'team/updateLeaderBoard'
}

export const gameSocketEvents = {
  'change_state': 'game/changeGameState'
}
