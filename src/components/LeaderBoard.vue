<template>
  <div class="leader-board">
    <div class="board">
      <div class="finish-team" v-for="(team, index) in leaderBoard.leader_board" :key="team">
        <place-by-index class="small" :i="index" v-if="index < 3"/>
        <p class="team-name">{{ team.name }}</p>
        <p class="small play-time">{{ team.play_time }}</p>
        <p v-if="gameState === 'OFF'" class="small points">{{ team.bonus_seconds }}</p>
      </div>
    </div>
    <button
      class="exit-button"
      @click="$router.push({path: '/code-input'})"
    >Выйти</button>
  </div>
</template>

<script>
import PlaceByIndex from "@/components/UI/PlaceByIndex";
import {mapState} from "vuex";

export default {
  name: "LeaderBoard",
  components: {PlaceByIndex},
  props: {
    leaderBoard: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      gameState: state => state.team.gameState
    })
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

$elementsWidth: 20em;

p {
  font-size: 1.2em;
}

.leader-board {
  @include pageElement();
  @include flexCentered();
  flex-direction: column;

  .board {
    @include fullElementGrid();
    width: $elementsWidth;

    > div {
      width: calc(100% - 1em);
      padding: .5em;
    }

    div.finish-team {
      display: flex;
      align-items: center;
      border: 1px solid black;
      border-radius: globalDefaults.$smallBorderRadius;
      height: 2em;

      .small {
        display: flex;
        align-items: center;
        width: 1.5em;
        height: 100%;
      }
      .team-name {
        width: 13em;
        margin-left: .5em;
      }
      .points {
        margin-left: .5em;
        width: 2em;
        text-align: center;
      }
      .play-time {
        margin-left: auto;
        width: 2em;
        text-align: center;
      }
    }

    .names {
      display: flex;
      align-items: center;

      .team-name-name {
        margin-left: .5em;
        width: 14em;
      }
      .time-name {
        margin-left: auto;
      }
      .points-name {
        margin-left: .5em;
      }
    }
  }

  > button {
    margin-top: .5em;
    width: $elementsWidth;
    @include button(red);
  }
}
</style>
