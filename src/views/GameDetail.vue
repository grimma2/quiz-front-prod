<template>
  <div class="game-detail">
    <confirm-move-dialog
      :need-to-call="$store.state.dialog.moveDialog.needToCall"
      :need-to-pass-args="$store.state.dialog.moveDialog.needToPassArgs"
      :text="$store.state.dialog.moveDialog.text"
      v-if="$store.state.dialog.moveDialog.show"
      @close="$store.commit('dialog/setMoveDialog', {needToCall: null, needToPassArgs: [], text: ''})"
    />
    <p class="game-name">{{ game.name }}</p>
    <div class="teams">
      <div class="team" v-for="team in game.team_set" :key="team.pk">
        <p class="team-name">Команда</p>
        <p class="team-code">{{ team.code }}</p>
      </div>
      <div class="button-container">
        <button @click="generateTeamCodes">Пересоздать коды у комманд</button>
      </div>
    </div>
    <div class="controls-container">
      <game-controls class="game-controls" :game="game"/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {ax, gameSocketEvents} from '@/api/defaults'
import GameControls from "@/components/GameControls";
import gameDelete from '@/mixins/addMethods/gameDelete'
import ConfirmMoveDialog from "@/components/UI/dialogs/ConfirmMoveDialog";

export default {
  name: "GameDetail",
  components: {GameControls, ConfirmMoveDialog},
  mixins: [gameDelete],
  computed: {
    ...mapState({
      game: state => state.game.game
    })
  },
  methods: {
    async generateTeamCodes () {
      try {
        const response = await ax.post('team/generate-codes/', {pk: this.game.pk})
        this.game.team_set = response.data
      } catch (e) {
        console.log(e)
      }
    },
    setListeners () {
      let socket = this.$store.state.game.gameSocket

      socket.onmessage = (e) => {
        console.log(`socket message ${JSON.parse(e.data)}`)
        let data = JSON.parse(e.data)

        let action = gameSocketEvents[data.event]
        this.$store.dispatch(
          action, data.event_data
        )
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('game/fetchGame', this.$route.params.pk)
    this.$store.dispatch('game/makeGameSocket', {gamePk: this.game.pk})
    this.setListeners()
  },
  beforeUnmount() {
    this.$store.commit('game/setGame', {})
    this.$store.commit('game/setGameSocket', false)
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/style.scss";

html, body {
  overflow: hidden;
}

.game-detail {
  @include pageElement();
  padding-bottom: 0;

  .teams {
    display: flex;
    flex-wrap: wrap;

    .team {
      height: 5em;
      width: 5em;
      @include flexCentered();
      flex-direction: column;

      .team-code {
        font-weight: bold;
        font-size: 1.2em;
        margin-top: .3em;
      }
    }

    .button-container {
      width: 100%;
      button {
        @include button(yellow);
        color: #1b1b1b;
      }
    }
  }
}

.game-name {
  font-size: 1.2em;
  text-align: center;
  font-weight: bold;
  width: 100%;
  padding-top: .5em;
}

.controls-container {
  height: calc(6em * .35 + 2em);
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(185, 170, 170, 0.7);

  .game-controls {
    margin-left: .5em;
    width: 6em;
    height: calc(6em * .35);
  }
}
</style>
