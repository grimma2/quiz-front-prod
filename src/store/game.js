import {backendHost} from "@/api/defaults";


export const game = {
  state: () => ({
    gameSocket: false
  }),
  getters: {},
  mutations: {
    setGameSocket(state, gameSocket) {
      state.gameSocket = gameSocket
    }
  },
  actions: {
    makeGameSocket({commit}, gamePk) {
      const gameSocket = new WebSocket(
        `wss://${backendHost}/game-socket/${gamePk}/${process.env.SECRET_KEY}/`,
      )
      commit('setGameSocket', gameSocket)
      gameSocket.onclose = (e) => {console.log(e)}
    },
    changeGameState ({commit}, eventData) {

    }
  },
  namespaced: true
}
