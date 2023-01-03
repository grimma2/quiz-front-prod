<template>
  <div class="active-question">
    <common-active-question
      :timer-u-i="timerUI"
      v-if="$store.state.team.activeQuestion.question_type !== 'blitz'"
    />
    <blitz-active-question
      :timer-u-i="timerUI"
      v-else
    />
  </div>
</template>

<script>
import CommonActiveQuestion from "@/components/CommonActiveQuestion.vue";
import BlitzActiveQuestion from "@/components/BlitzActiveQuestion.vue";

export default {
  name: "ActiveQuestion",
  components: {BlitzActiveQuestion, CommonActiveQuestion},
  data () {
    return {
      timerUI: '',
    }
  },
  methods: {
    countdown () {
      let time = this.$store.state.team.timer
      let hours = Math.floor(time / 3600)
      let minutes = Math.floor(time / 60) - hours * 60
      let seconds = time - (hours * 3600 + minutes * 60)

      this.timerUI = `${hours}:${minutes}:${seconds}`
      time--
      this.$store.commit('team/setTimer', time)

      if (time <= 0) {
        try {
          // interval may already clear before
          clearInterval(this.$store.state.team.timerIntervalId)
        } catch (e) {}
      }
    }
  },
  mounted () {
    this.$store.commit(
      'team/setTimerIntervalId', setInterval(this.countdown, 1000)
    )
  }
}
</script>

<style lang="scss" scoped>

</style>