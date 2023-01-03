import {ax} from "@/api/defaults";

export default {
  methods: {
    async getGames () {
      try {
        const response = await ax.post('game/get/games-cookie/')
        let gamesPks = JSON.parse(response.data)
        console.log(`response data in getGames ${gamesPks}`)
        this.$store.commit('game/setGamesPks', gamesPks)
        return this.$store.state.game.gamesPks
      } catch (e) {
        console.log(e)
      }
    },
    async setGames (games) {
      try {
        await ax.post('game/set/games-cookie/', {gamesPks: JSON.stringify(games)})
      } catch (e) {
        console.log(e)
      }
    },
    async hasInGames (pk) {
      let games = await this.getGames()
      if (games.includes(Number(pk))) return true
    }
  }
}