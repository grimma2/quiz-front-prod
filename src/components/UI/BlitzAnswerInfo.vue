<template>
  <div :class="`blitz-answer-info ${isValid ? 'green' : 'red'}`">
    <span class="text" v-if="isValid">{{ isValidText }}</span>
    <span class="text" v-else>{{ isInvalidText }}</span>
  </div>
</template>

<script>
export default {
  name: "BlitzAnswerInfo",
  props: {
    isValid: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isValidText: 'Верно!',
      isInvalidText: 'Ответ не верный'
    }
  },
  mounted () {
    setTimeout(() => {
      this.$emit('close')
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

.blitz-answer-info {
  position: fixed;
  left: 0;
  bottom: 0;
  margin-left: .5em;
  margin-bottom: .5em;
  padding: 1em;
  border-radius: globalDefaults.$smallBorderRadius;

  > span {
    color: white;
    text-align: center;
  }
}

.green {
  background-color: #0ede0e;
}

.red {
  background-color: red;
}
</style>