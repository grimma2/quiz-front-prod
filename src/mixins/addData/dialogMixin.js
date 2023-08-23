export default {
  data () {
    return {
      dialog: {
        show: false,
        type: '',
        question: ''
      }
    }
  },
  methods: {
    showDialog (question, type) {
      this.dialog.question = question
      this.dialog.show = true
      this.dialog.type = type
    },
    addAnswer (answer, isRare) {
      let question = this.game.question_set.filter(
        qs => qs.pk === this.dialog.question.pk
      )

      question[0].correct_answers.push({text: answer, rare: isRare})
      this.clearDialog()
    },
    addHint (hint) {
      let question = this.game.question_set.filter(
        qs => qs.pk === this.dialog.question.pk
      )

      // hint represent in DB like separate model and need its own pk
      question[0].hints.push({...hint, pk: String(new Date())})
      this.clearDialog()
    },
    changeTimeHint (newTime, hintPk) {
      this.dialog.question.hints.filter(ht => ht.pk === hintPk)[0].appearAfter = newTime
    },
    changeHintText (hint) {
      this.dialog.question.hints.filter(ht => ht.pk === hint.pk)[0].text = hint.text
    },
    removeHint (hint) {
      this.questionFotHints = (
        this.dialog.question.filter(ht => ht.pk !== hint.pk)
      )
    },
    clearDialog () {
      console.log('clear dialog')
      this.dialog = {}
    }
  }
}