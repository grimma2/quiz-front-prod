<template>
  <div class="question-dialog">
    <div class="dialog">
      <p class="title">Добавить ответ на вопрос</p>
      <p class="ques-text">{{ question.text }}</p>
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
    question: {
      type: Object,
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
@use "@/scss/addDataDialog";
</style>