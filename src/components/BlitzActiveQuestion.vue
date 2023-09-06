<template>
  <div class="blitz-active-question">
    <span v-if="timerUI !== '00:00' && timerUI !== '00:01'">{{ timerUI }}</span>
    <div class="question">
      <div class="question-container">

        <img class="question-image" v-if="activeQuestion.image" :src="activeQuestion.image">

        <p class="ques-text" v-if="activeQuestion.text">{{ activeQuestion.text }}</p>

        <div class="blitz-text">
          <span class="inner-color">Введите как можно больше правильных ответов</span>
        </div>

        <hint-list :hints="$store.state.team.hints"/>

        <div class="answers-count">
          <span>Ответов осталось:</span>
          <div>
            <span>{{ $store.state.team.remainAnswers.length }}</span>
          </div>
        </div>

        <input
          type="text"
          placeholder="Ввести ответ"
          v-model="currentInput"
          @keydown="validateAnswer"
        >
      </div>
      <info-text-dialog
        v-if="openInfo"
        @close="openInfo = false"
      />
      <img class="info" src="@/assets/info.png" @click.stop="openInfo = true">
    </div>
    <blitz-answer-info
      :is-valid="showAnswerInfo.answerIsCorrect"
      v-if="showAnswerInfo.show"
      @close="showAnswerInfo.show = false"
    />
  </div>
</template>

<script>
import {mapState} from "vuex";

import InfoTextDialog from "@/components/UI/dialogs/InfoTextDialog.vue";
import BlitzAnswerInfo from "@/components/UI/BlitzAnswerInfo.vue";
import HintList from "@/components/HintList.vue";

export default {
  name: "BlitzActiveQuestion",
  components: {BlitzAnswerInfo, InfoTextDialog, HintList},
  data () {
    return {
      openInfo: false,
      currentInput: '',
      showAnswerInfo: {
        show: false,
        answerIsCorrect: false
      }
    }
  },
  computed: {
    ...mapState({
      activeQuestion: state => state.team.activeQuestion
    })
  },
  methods: {
    validateAnswer (e) {
      console.log('validateAnswer in blitz question')
      if (e.keyCode !== 13) return

      let correctAnswer = (
        this.$store.state.team.remainAnswers.filter(
          an => an.text.trim().toLowerCase() === this.currentInput.trim().toLowerCase()
        )
      )

      if (correctAnswer.length) {
        correctAnswer = correctAnswer[0]
        let bonusPoints = 0
        if (correctAnswer.rare) {
          bonusPoints = 1
        }

        this.$store.dispatch('team/sendBlitzAnswer',
          {
            answerText: correctAnswer.text,
            bonusPoints: bonusPoints
          }
        )

        this.showAnswerInfo = {show: true, answerIsCorrect: true}
        this.currentInput = ''
      } else {
        this.showAnswerInfo = {show: true, answerIsCorrect: false}
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

.blitz-active-question {
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

    .blitz-text {
      background: rgba(29, 110, 194, .6);
      padding: .2em 1em;
      > span {
        font-size: .8em;
      }
    }

    .answers-count {
      display: flex;
      align-items: center;

      > div {
        margin-left: .5em;
        height: 2em;
        width: 2em;
        @include flexCentered();
        border-radius: globalDefaults.$smallBorderRadius;
        background-color: #42cc42;

        > span {
          font-weight: bold;
          font-size: 1.1em;
        }
      }
    }
  }
}

.inner-color {
  color: white;
}
</style>