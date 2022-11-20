<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Игра'
      }
    },
  },
  mounted () {
    if (!localStorage.getItem('games')) {
      localStorage.setItem('games', JSON.stringify([]))
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/globalDefaults.scss";
</style>
