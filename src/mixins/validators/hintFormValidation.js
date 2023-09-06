export default {
  data () {
    return {
      error: ''
    }
  },
  methods: {
    validateHint (hint) {
      console.log(hint)
      if (hint.appear_after === '00:00:00') {
        this.error = 'Время, для появления вопроса, должно быть обязательно установлено.'
      } else if (hint.text === '') {
        this.error = 'Подсказка должна обязательно содержать текст'
      } else {
        return true
      }
    }
  }
}