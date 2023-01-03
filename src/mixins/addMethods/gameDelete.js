import {ax} from "@/api/defaults";

export default {
  methods: {
    async deleteGame (gamePk) {
      let games = this.$store.state.game.gamesPks
      let newGames = games.filter(game => game !== gamePk)
      this.$store.commit('game/setGamesPks', newGames)
      await this.setGames(newGames)

      try {
        await ax.post('game/delete-detail/', {pk: gamePk})
      } catch (e) {
        console.log(e)
      }
    }
  }
}