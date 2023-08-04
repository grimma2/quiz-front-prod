import {ax, backendHost} from "@/api/defaults";

export const game = {
  state: () => ({
    gameSocket: false,
    game: {},
    games: [],
    gamesPks: []
  }),
  getters: {},
  mutations: {
    setGameSocket(state, gameSocket) {
      state.gameSocket = gameSocket
    },
    setGame (state, game) {
      state.game = game
    },
    setGameState (state, game_state) {
      state.game.game_state = game_state
    },
    setGames (state, games) {
      state.games = games
    },
    setGamesState (state, {index, gameState}) {
      state.games[index].game_state = gameState
    },
    setGamesPks (state, gamesPks) {
      state.gamesPks = gamesPks
    }
  },
  actions: {
    makeGameSocket({commit}, {gamePk, commitToState=true}) {
      console.log('makeGameSocket...', commitToState)
      let wsProtocol = (process.env.NODE_ENV === 'development') ? 'ws' : 'wss'
      const gameSocket = new WebSocket(
        `${wsProtocol}://${backendHost}/api/game-socket/${gamePk}/`,
      )
      gameSocket.onerror = (e) => {console.log(e)}

      if (commitToState) {
        commit('setGameSocket', gameSocket)
      } else {
        return gameSocket
      }
    },
    changeGameState ({commit}, eventData) {
      commit('setGameState', eventData)
    },
    async fetchGame ({commit}, gamePk) {
      console.log('fetchGame')
      try {
        const response = await ax.post('game/detail/', {pk: gamePk})
        commit('setGame', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchGames ({commit}, games) {
      try {
        const response = await ax.post('game/list/', {games: games})
        console.log(`games fetched: ${response.data}`)
        commit('setGames', response.data)
      } catch (e) {
        console.log(e)
      }
    },
  },
  namespaced: true
}
