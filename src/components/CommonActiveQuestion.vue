<template>
  <div class="common-active-question">
    <answer-list-dialog
      :answers="inputAnswers"
      @deleteAnswer="deleteAnswer"
      @close="openAnswers = false"
      v-if="openAnswers"
    />
    <span v-if="$store.state.team.timerUI !== '0:0:0'">{{ $store.state.team.timerUI }}</span>
    <span v-else>нет</span>
    <div class="question">
      <div class="question-container">
        <p class="ques-text">{{ activeQuestion.text }}</p>

        <div class="limit">
          <span class="inner-color">В этом вопросе нужно ввести {{ activeQuestion.correct_answers.length }} ответов</span>
        </div>

        <hint-list :hints="$store.state.team.hints"/>

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
import {mapState} from "vuex";

import InfoTextDialog from "@/components/UI/dialogs/InfoTextDialog.vue";
import AnswerListDialog from "@/components/UI/dialogs/AnswerListDialog.vue";
import HintList from "@/components/HintList.vue";

export default {
  name: "CommonActiveQuestion",
  components: {InfoTextDialog, AnswerListDialog, HintList},
  data () {
    return {
      currentInput: '',
      inputAnswers: [],
      openAnswers: false,
      openInfo: false,
      error: '',
    }
  },
  computed: {
    ...mapState({
      activeQuestion: state => state.team.activeQuestion
    })
  },
  methods: {
    addAnswer(e) {
      if (e.keyCode !== 13) return
      let answerText = this.currentInput
      if (!answerText) return

      // remove last element if user try add answers more then limit allow
      // then last answer has replaced by new inputed answer
      if (this.inputAnswers.length === this.activeQuestion.correct_answers.length) {
        this.inputAnswers = this.inputAnswers.slice(0, -1)
      }

      this.inputAnswers.push(
        {text: answerText, pk: String(new Date()), color: 'default'}
      )

      if (this.inputAnswers.length === this.activeQuestion.correct_answers.length) {
        this.validateAllAnswers()
      }
    },
    deleteAnswer(answer) {
      this.inputAnswers = this.inputAnswers.filter(an => an.pk !== answer.pk)
    },
    validateAllAnswers() {
      let bonusPoints = 0

      for (let correct of this.activeQuestion.correct_answers) {
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
        this.inputAnswers = []
        this.currentInput = ''
        this.$store.dispatch('team/sendNextQuestion', bonusPoints)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/answers.scss";
@import "@/scss/style.scss";

$elementsMargin: 5em;

.common-active-question {
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