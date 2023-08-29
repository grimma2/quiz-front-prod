<template>
  <div class="hint-list">
    <div class="hints">

      <div class="hint" v-for="hint in hints" :key="hint.pk">
        <span class="hint-text">{{ hint.text }}</span>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'HintList',
  props: {
    hints: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

.hints {
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: .5em;

  .hint {
    background-color: yellow;
    border: 1px solid yellow;
    border-radius: .2em;
    padding: 0.5em;
  }
}

.extend-text {
  font-size: 1.2em;
}
</style>