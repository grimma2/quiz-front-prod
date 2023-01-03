<template>
  <img class="back-button-arrow" @click="back" src="@/assets/right-arrow.png">
  <div class="user-games">
    <confirm-move-dialog
      :need-to-call="$store.state.dialog.moveDialog.needToCall"
      :need-to-pass-args="$store.state.dialog.moveDialog.needToPassArgs"
      :text="$store.state.dialog.moveDialog.text"
      v-if="$store.state.dialog.moveDialog.show"
      @close="$store.commit('dialog/setMoveDialog', {needToCall: null, needToPassArgs: [], text: ''})"
    />
    <games-list :games="games"/>
    <div class="button-container">
      <button @click="$router.push({path: '/game/create'})">Создать новую</button>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import GamesList from "@/components/GamesList";
import game from '@/mixins/addMethods/gameDelete'
import ConfirmMoveDialog from "@/components/UI/dialogs/ConfirmMoveDialog";
import back from "@/mixins/addMethods/back";
import gamesCookie from "@/mixins/addMethods/gamesCookie";

export default {
  name: "UserGames",
  components: {ConfirmMoveDialog, GamesList},
  mixins: [game, back, gamesCookie],
  computed: {
    ...mapState({
      games: state => state.game.games
    })
  },
  async mounted () {
    let games = await this.getGames()
    console.log(`gamesPks in UserGames mounted() ${games}`)
    if (!games.length) return
    console.log('before fetch games by pks')
    this.$store.dispatch('game/fetchGames', games)
  },
  beforeUnmount() {
    this.$store.commit('game/setGames', [])
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/style.scss";

.user-games {
  @include pageElement();
}

.button-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 5em;
  display: flex;
  align-items: center;

  button {
    font-size: 1.2em;
    margin-left: 1em;
    @include button(deepskyblue)
  }
}
</style>