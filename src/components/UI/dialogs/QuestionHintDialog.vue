<template>
  <div class="question-dialog">
    <div class="dialog">
      <span class="error" v-if="error">{{ error }}</span>
      <p class="title">Добавить подсказку</p>
      <p class="ques-text">{{ question.text }}</p>
      <form @submit.stop>
        <input name="ques-text-input" type="text" v-model="hint.text">
        <button type="button" @click="addHint(hint)">Сохранить</button>
      </form>

      <time-picker :object="hint" @changeTime="changeTime"/>
    </div>
  </div>
</template>

<script>
import TimePicker from '@/components/TimePicker.vue'

import hintFormValidation from '@/mixins/validators/hintFormValidation'

export default {
  name: "QuestionHintDialog",
  components: {TimePicker},
  mixins: [hintFormValidation],
  data () {
    return {
      hint: {
        text: '',
        appear_after: '00:00:00'
      }
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
    },
    addHint (hint) {
      if (this.validateHint(hint)) {
        this.$emit('addHint', hint)
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
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

.error {
  border: 1px solid red;
  border-radius: globalDefaults.$smallBorderRadius;
  background-color: red;
  color: white;
  padding: .3em;
  word-break: break-word;
}
</style>