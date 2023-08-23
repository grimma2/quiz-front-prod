<template>
  <div class="question-dialog">
    <div class="dialog">
      <p class="title">Добавить ответ на вопрос</p>
      <p class="ques-text">{{ question.text }}</p>
      <form @submit.stop="$emit('addHint', hint)">
        <input name="ques-text-input" type="text" v-model="hint.text">
        <button type="submit">Сохранить</button>
      </form>

      <time-picker :object="hint" @changeTime="changeTime"/>
    </div>
  </div>
</template>

<script>
import TimePicker from '@/components/TimePicker.vue'

export default {
  name: "QuestionHintDialog",
  components: {TimePicker},
  data () {
    return {
      hint: {
        text: '',
        appear_after: '00:00:00'
      },
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
    },
    changeTime (appearAfter, _) {
      this.hint.appear_after = appearAfter
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