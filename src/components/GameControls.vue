<template>
  <div class="game-controls">
    <div class="game-on" v-if="game.game_state === 'ON'">
      <div>
        <img src="@/assets/stop.png" class="stop-game" @click.stop="changeState('OFF')">
      </div>
    </div>
    <div class="game-off" v-else>
      <div>
        <img src="@/assets/delete.png" @click.stop="showConfirmMessage">
      </div>
      <div>
        <img src="@/assets/play-button.png" @click.stop="changeState('ON')">
      </div>
      <div>
        <img src="@/assets/pencil.png" @click.stop="$router.push({path: `/game/${game.pk}/edit`})">
      </div>
    </div>
  </div>
</template>

<script>
import texts from "@/assets/text/staticText.json"
import gameDelete from "@/mixins/addMethods/gameDelete";
import gamesCookie from "@/mixins/addMethods/gamesCookie";

export default {
  name: "GameControls",
  mixins: [gamesCookie, gameDelete],
  data () {
    return {
      timerUI: '00:00'
    }
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    getSocket () {
      let socket = this.$store.state.game.gameSocket
      if (socket) {
        console.log('game socket exists (for GameDetail)')
        return socket
      } else {
        console.log('games list')
        this.$store.dispatch(
          'game/makeGameSocket',
          {gamePk: this.game.pk}
        )
        return this.$store.state.game.gameSocket
      }
    },
    changeState (gameState) {
      let socket = this.getSocket()
      try {
        setTimeout(() => {
          socket.send(JSON.stringify({
            'type': 'change_state',
            'event_data': gameState
          }))
        }, 5000)
      } catch (e) {
        console.log(e)
        window.location.reload()
      }

      let games = this.$store.state.game.games
      if (games.length) {
        for (let i = 0; i < games.length; i++) {
          if (this.game.pk === games[i].pk) {
            this.$store.commit('game/setGamesState', {index: i, gameState: gameState})
          }
        }
      } else {
        this.$store.commit('game/setGameState', gameState)
      }
    },
    deleteGameSave () {
      console.log('deleteGameSave was call')
      this.deleteGame(this.game.pk)
      let games = this.$store.state.game.games

      if (games.length) {
        this.$store.commit(
          'game/setGames', games.filter(game => game.pk !== this.game.pk)
        )
      }
      console.log('after update games list')

      this.$router.push({path: '/games'})
    },
    showConfirmMessage () {
      // Добавить нужную проверку, если нужно использовать другие аргументы
      console.log({
        needToCall: this.deleteGameSave,
        needToPassArgs: [],
        text: texts.deleteGame
      })

      this.$store.commit('dialog/setMoveDialog', {
        needToCall: this.deleteGameSave,
        needToPassArgs: [],
        text: texts.deleteGame
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/style.scss";

.game-on {
  display: grid;
  grid-template-columns: 100%;

  div {
    height: 100%;
    width: 33%;
  }
}

.game-off {
  display: grid;
  grid-template-columns: repeat(3, 33.333%);
  grid-auto-rows: 100%;
  grid-column-gap: 1em;
}

img {
  height: 100%;
  width: 100%;
}
</style>