import {ax, backendHost} from "@/api/defaults";


export const game = {
  state: () => ({
    gameSocket: false,
    game: {},
    games: []
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
    }
  },
  actions: {
    makeGameSocket({commit}, {gamePk, commitToState=true}) {
      console.log('makeGameSocket...', commitToState)
      const gameSocket = new WebSocket(
        `wss://${backendHost}/game-socket/${gamePk}/`,
      )
      gameSocket.onclose = (e) => {console.log(e)}

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
        commit('setGames', response.data)
      } catch (e) {
        console.log(e)
      }
    },
  },
  namespaced: true
}
