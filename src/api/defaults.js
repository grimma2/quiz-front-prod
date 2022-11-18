import axios from 'axios'


export const backendHost = 'aquamarine-kashata-989ba9.netlify.app'

export const ax = axios.create({
  baseURL: `${location.protocol}//${backendHost}/api/v1/`
})


export const teamSocketEvents = {
  'next_question': 'team/nextQuestion',
  'change_state': 'team/changeGameState',
  'update_leader_board': 'team/updateLeaderBoard'
}

export const gameSocketEvents = {
  'change_state': 'game/changeGameState'
}
