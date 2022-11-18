<template>
  <div>
    <img src="@/assets/1.png" v-if="i === 0">
    <img src="@/assets/2.png" v-else-if="i === 1">
    <img src="@/assets/3.png" v-else-if="i === 2">
  </div>
</template>

<script>
export default {
  name: "PlaceByIndex",
  props: {
    i: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 1.6em;
  width: 1.6em;
}
</style>