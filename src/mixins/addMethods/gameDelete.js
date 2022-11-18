import {ax} from "@/api/defaults";

export default {
  methods: {
    async deleteGame (gamePk) {
      let games = localStorage.getItem('games')
      let newGames = JSON.parse(games).filter(game => game !== gamePk)
      localStorage.setItem('games', JSON.stringify(newGames))

      try {
        await ax.post('game/delete-detail/', {pk: gamePk})
      } catch (e) {
        console.log(e)
      }
    }
  }
}