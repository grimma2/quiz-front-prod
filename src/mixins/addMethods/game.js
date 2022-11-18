import {ax} from "@/api/defaults";

export default {
  data () {
    return {
      game: {}
    }
  },
  methods: {
    async fetchGame (gamePk) {
      try {
        const response = await ax.post('game/detail/', {pk: gamePk})
        return response.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}