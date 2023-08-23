<template>
  <div class="hint-list">
    <div class="hints">

      <div class="hint" v-for="hint in hints" :key="hint.pk">
        <span class="hint-text">{{ hint.text }}</span>
      </div>

<!--       <div class="hint" v-for="hint in hints.slice(-1)" :key="hint" v-else>
        <span class="hint-text">{{ hint.text }}</span>
      </div>
 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HintList'
}
</script>

<style lang="scss">
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

.hints {
  margin-top: 1em;
  display: grid;
  grid-template-columns: 100%;
  grid-column-gap: .5em;

  .hint {
    border: 1px solid black;
    padding: 0.5em;
  }
}

.extend-text {
  font-size: 1.2em;
}
</style>