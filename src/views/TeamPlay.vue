<template>
  <div class="team-play">
    <leader-board
      :leader-board="$store.state.team.leaderBoard"
      v-if="!objectIsEmpty($store.state.team.leaderBoard)"
    />
    <active-question
      :question="$store.state.team.activeQuestion"
      v-else-if="!objectIsEmpty($store.state.team.activeQuestion)"
    />
    <div class="not-have-leader-board" v-else-if="$store.state.team.notHaveLeaderBoard">
      <div class="not-have-container">
        <p class="text">Пока ещё не проводилось ни одного сеанса игры</p>
        <button class="exit-button" @click="removeCookie">Выйти</button>
      </div>
    </div>
    <div class="wait" v-else>
      <p class="text">Организатор пока что ещё не запустил игры</p>
    </div>
  </div>
</template>

<script>
import {ax, teamSocketEvents} from "@/api/defaults";

import cookie from "@/mixins/addMethods/cookie";
import objectIsEmpty from "@/mixins/addMethods/objectIsEmpty";

import ActiveQuestion from "@/components/ActiveQuestion";
import LeaderBoard from "@/components/LeaderBoard";

export default {
  name: "TeamPlay",
  components: {LeaderBoard, ActiveQuestion},
  mixins: [cookie, objectIsEmpty],
  methods: {
    socketIsValid(socket) {
      setTimeout(() => {
        console.log(socket.readyState)
        if (!socket.readyState) {
          this.$router.push({path: '/code-input'})
        }
      }, 1500)
    },
    async setQuestionOrBoard () {
      console.log('setQuestionOrBoard...')
      try {
        const response = await ax.post('team/get-data/', {code: this.$route.params.code})
        console.log(response.data)
        if (response.data.active_question) {
          this.$store.commit('team/setActiveQuestion', response.data.active_question)
          this.$store.commit('team/setTimer', response.data.timer)
        } else if (response.data.leader_board) {
          this.$store.commit('team/setLeaderBoard', response.data.leader_board)
        } else {
          this.$store.commit('team/setNotHaveLeaderBoard', true)
        }
        this.$store.commit('team/setGameState', response.data.game_state)
      } catch (e) {
        console.log(e)
      }
    },
    setListeners (socket) {
      socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        console.log(data)
        let action = teamSocketEvents[data.event]
        this.$store.dispatch(
          action,
          {
            eventData: data.event_data,
            code: this.$route.params.code
          }
        )
      }
    }
  },
  mounted () {
    this.$store.dispatch('team/makeTeamSocket', this.$route.params.code)
    let socket = this.$store.state.team.teamSocket
    this.socketIsValid(socket)
    // if socket is valid fetch question time for timer
    this.$store.dispatch('team/fetchQuestionTime', this.$route.params.code)

    if (this.cookiesIsExists('inGame', 1)) this.setQuestionOrBoard()

    this.setListeners(socket)
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

.not-have-leader-board {
  @include pageElement();
  @include flexCentered();

  .not-have-container {
    > button {
      margin-top: .5em;
      @include button(red);
    }
  }
}

.wait {
  @include pageElement();
  @include flexCentered();
}

.text {
  padding: 1em .5em;
  border-radius: globalDefaults.$smallBorderRadius;
  background-color: deepskyblue;
  color: white;
}
</style>