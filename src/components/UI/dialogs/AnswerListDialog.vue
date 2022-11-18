<template>
  <div class="answer-list-dialog">
    <div class="question-answers">
      <div :data-color="answer.color" class="ques-answer" v-for="answer in answers" :key="answer.pk">
        <span>{{ answer.text }}</span>
        <img class="delete-answer-img" src="@/assets/x.png" @click.stop="deleteAnswer(answer)">
      </div>
    </div>
  </div>
</template>

<script>
import closableDialog from "@/mixins/addMethods/closableDialog";

export default {
  name: "AnswerListDialog",
  mixins: [closableDialog],
  props: {
    answers: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteAnswer (answer) {
      this.$emit('deleteAnswer', answer)
      if (this.answers.length === 1) {
        console.log(this.answers)
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";
@import "@/scss/answers.scss";

.answer-list-dialog {
  position: fixed;
  bottom: 15%;
  margin: auto;
  top: 6em;
  height: 25em;
  width: 17em;
  border: 1px solid black;
  border-radius: globalDefaults.$smallBorderRadius;
  padding: .5em;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
}
</style>