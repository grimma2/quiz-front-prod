<template>
  <div class="games-list">
    <div class="games">
      <div
        class="game"
        v-for="game in games"
        :key="game.pk"
        @click.stop="$router.push({path: `/game/${game.pk}`})"
      >
        <p class="game-name">{{ game.name }}</p>
        <div :class="`controls-container ${getGameStyle(game.game_state)}`">
          <game-controls :game="game"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameControls from "@/components/GameControls";

export default {
  name: "GamesList",
  components: {GameControls},
  props: {
    games: {
      type: Array,
      required: true
    }
  },
  methods: {
    getGameStyle (gameState) {
      if (gameState === 'ON') {
        return 'game-on-container'
      } else if (gameState === 'OFF') {
        return 'game-off-container'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

.games {
  padding-top: .5em;
  display: grid;
  grid-template-columns: repeat(2, calc(50% - .25em));
  grid-gap: .5em;

  .game {
    border: 1px solid black;
    border-radius: globalDefaults.$smallBorderRadius;
    padding: .3em;

    .game-name {
      font-size: 1.2em;
      font-weight: bold;
      word-wrap: break-word;
    }

    // game controls
    .controls-container {
      margin-top: .5em;

      .game-controls {
        width: 5.5em;
        height: calc(5.5em * .35);
      }
    }
  }
}
</style>