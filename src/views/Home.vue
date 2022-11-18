<template>
  <div class="home">
    <div class="buttons">
      <button class="run" @click="$router.push({path: '/games'})">Запустить игру</button>
      <button class="join" @click="$router.push({path: '/code-input'})">Войти в существующую</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style lang="scss" scoped>
@import "@/scss/style.scss";

.home {
  width: 95%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;

  .buttons {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, calc(50% - .5em));
    grid-column-gap: 1em;

    .run {
      @include button(#077da4)
    }

    .join {
      justify-self: start;
      @include button(#077da4)
    }
  }
}
</style>