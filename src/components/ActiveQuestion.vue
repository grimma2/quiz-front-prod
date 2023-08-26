<template>
  <div class="active-question">
    <common-active-question
      v-if="$store.state.team.activeQuestion.question_type !== 'blitz'"
    />
    <blitz-active-question
      v-else
    />
  </div>
</template>

<script>
import CommonActiveQuestion from "@/components/CommonActiveQuestion.vue";
import BlitzActiveQuestion from "@/components/BlitzActiveQuestion.vue";

export default {
  name: "ActiveQuestion",
  components: {BlitzActiveQuestion, CommonActiveQuestion}
}
</script>

<style lang="scss" scoped>

</style>