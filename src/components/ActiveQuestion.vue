<template>
  <div class="active-question">
    <answer-list-dialog
      :answers="inputAnswers"
      @deleteAnswer="deleteAnswer"
      @close="openAnswers = false"
      v-if="openAnswers"
    />
    <span>{{ timerUI }}</span>
    <div class="question">
      <div class="question-container">
        <p class="ques-text">{{ question.text }}</p>
        <div class="limit">
          <span class="inner-color">В этом вопросе нужно ввести {{ question.correct_answers.length }} ответов</span>
        </div>
        <div class="error" v-if="error">
          <span class="inner-color">{{ error }}</span>
        </div>
        <div class="question-answers" v-if="inputAnswers.length">
          <img @click.stop="openAnswers = true" src="@/assets/more.png">
          <div :data-color="answer.color" class="ques-answer" v-for="answer in inputAnswers" :key="answer.pk">
            <span>{{ answer.text }}</span>
            <img class="delete-answer-img" src="@/assets/x.png" @click="deleteAnswer(answer)">
          </div>
        </div>
        <div class="empty" v-else>
          <span>Здесь будут появляться ваши ответы</span>
        </div>
        <input
          type="text"
          placeholder="Ввести ответ"
          v-model="currentInput"
          @keydown="addAnswer"
        >
      </div>
      <info-text-dialog
        v-if="openInfo"
        @close="openInfo = false"
      />
      <img class="info" src="@/assets/info.png" @click.stop="openInfo = true">
    </div>
  </div>
</template>

<script>
import AnswerListDialog from "@/components/UI/dialogs/AnswerListDialog";
import InfoTextDialog from "@/components/UI/dialogs/InfoTextDialog";

export default {
  name: "ActiveQuestion",
  components: {InfoTextDialog, AnswerListDialog},
  data () {
    return {
      inputAnswers: [],
      openAnswers: false,
      openInfo: false,
      currentInput: '',
      error: '',
      timerUI: '',
    }
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  methods: {
    addAnswer (e) {
      if (e.keyCode !== 13) return
      let answerText = this.currentInput
      if (!answerText) return

      // remove last element if user try add answers more then limit allow
      // then last answer has replaced by new inputed answer
      if (this.inputAnswers.length === this.question.correct_answers.length) {
        this.inputAnswers = this.inputAnswers.slice(0, -1)
      }

      this.inputAnswers.push(
        {text: answerText, pk: new Date(), color: 'default'}
      )

      if (this.inputAnswers.length === this.question.correct_answers.length) {
        this.validateAllAnswers()
      }
    },
    deleteAnswer (answer) {
      this.inputAnswers = this.inputAnswers.filter(an => an.pk !== answer.pk)
    },
    validateAllAnswers () {
      let bonusPoints = 0

      for (let correct of this.question.correct_answers) {
        for (let input of this.inputAnswers) {
          if (correct.text.trim().toLowerCase() === input.text.trim().toLowerCase()) {
            input.color = 'true'
            if (correct.rare) {
              bonusPoints = bonusPoints + 1
            }
          }
        }
      }

      let answerIsValid = true

      for (let input of this.inputAnswers) {
        if (input.color !== 'true') {
          input.color = 'false'
          answerIsValid = false
          this.error = 'Некоторые ответы оказались не верны'
        }
      }
      if (answerIsValid) {
        this.currentInput = ''
        this.inputAnswers = []
        this.$store.dispatch('team/sendNextQuestion', bonusPoints)
      }
    },
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
@use "@/scss/globalDefaults";
@import "@/scss/answers.scss";
@import "@/scss/style.scss";

$elementsMargin: 5em;

.active-question {
  @include pageElement();
  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    margin-top: $elementsMargin;
  }

  .question {
    width: globalDefaults.$questionWidth;
    margin-top: $elementsMargin;
    display: flex;
    align-items: flex-start;
    > img {
      height: 1.5em;
      width: 1.5em;
      margin-left: .7em;
    }
  }

  .question-container {
    @include fullElementGrid();
    width: 100%;
    border: 1px solid #1b1b1b;
    border-radius: globalDefaults.$smallBorderRadius;

    .ques-text {
      word-wrap: break-word;
    }

    .limit {
      background: rgba(29, 110, 194, .6);
      padding: .2em 1em;
      span {
        font-size: .8em;
      }
    }

    .error {
      background: rgba(227, 13, 13, .6);
      padding: .2em 1em;
    }

    .question-answers {
      overflow: hidden;
      min-height: 2em;
      max-height: 9em;
      width: 100%;
      > img {
        align-self: flex-start;
        height: 1em;
        width: 1em;
      }
    }

    .empty {
      @include flexCentered();
      border: 3px dashed black;
      border-radius: globalDefaults.$smallBorderRadius;
      padding: .5em 1em;
    }
  }
}

.inner-color {
  color: white;
}
</style>