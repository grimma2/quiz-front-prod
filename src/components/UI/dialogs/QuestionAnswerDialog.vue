<template>
  <div class="question-answer-dialog">
    <div class="dialog">
      <p class="title">Добавить ответ на вопрос</p>
      <p class="ques-text">{{ questionText }}</p>
      <form @submit.stop="$emit('addAnswer', answer, isRare)">
        <input name="ques-text-input" type="text" v-model="answer">
        <div class="checkbox">
          <input id="ques-is-rare" type="checkbox" v-model="isRare">
          <label for="ques-is-rare">Редкий</label>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionAnswerDialog",
  data () {
    return {
      answer: '',
      isRare: false
    }
  },
  props: {
    questionText: {
      type: String,
      required: true
    },
    questionPk: {
      type: String,
      required: true
    }
  },
  methods: {
    close (e) {
      let el = document.querySelector('div.dialog')
      if (!el.contains(e.target)) {
        this.$emit('close')
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.close)
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount () {
    document.removeEventListener('click', this.close)
    document.body.style.overflow = 'auto'
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

.question-answer-dialog {
  @include flexCentered();
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(151, 246, 246, 0.5);

  .dialog {
    border: 1px solid #1b1b1b;
    border-radius: globalDefaults.$smallBorderRadius;
    width: 20em;
    display: grid;
    grid-template-columns: 100%;
    grid-row-gap: $globalPadding;
    background-color: white;
    padding: $globalPadding;

    .title {
      font-weight: bold;
      font-size: 1.1em;
    }
    .ques-text {
      word-wrap: break-word;
    }

    form {
      display: grid;
      grid-template-columns: 100%;
      grid-row-gap: $globalPadding;

      button {
        @include button(#0ede0e);
      }

      .checkbox {
        margin-left: .2em;
      }
    }
  }
}
</style>