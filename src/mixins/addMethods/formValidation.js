export default {
  methods: {
    isValid () {
      if (!this.game.name) {
        console.log(`Поле "Название игры" не может быть пустым`)
        this.error = `Поле "Название игры" не может быть пустым`
      } else if (!this.game.users_in_team_lim || this.game.users_in_team_lim < 0) {
        this.error = (
          `Поле "Лимит человек в одной комманде" не может быть пустым и должно быть больше ноля`
        )
      } else if (this.game.question_time === '00:00' || this.game.question_time === '00:00:00' ||  !this.game.question_time) {
        this.error = `Поле "Время на один вопрос" не может быть пустым`
      } else {
        if (this.isForeignKeyValid()) return true
      }
    },
    isForeignKeyValid () {
      for (let team of this.game.team_set) {
        if (!team.name) {
          this.error = `Название команды не может быть пустым`
          return
        }
      }

      for (let question of this.game.question_set) {
        if (!question.text) {
          this.error = `Текст вопроса не может быть пустым`
          return
        } else if (!question.correct_answers.length) {
          this.error = `У каждого вопроса должен быть хотя бы один ответ`
          return
        }
      }

      if (!this.game.team_set.length) {
        console.log(`В игре должна быть хотя бы одна команда`)
        this.error = `В игре должна быть хотя бы одна команда`
      } else if (!this.game.question_set.length) {
        console.log(`В игре должен быть хотя бы один вопрос`)
        this.error = `В игре должен быть хотя бы один вопрос`
      } else {
        return true
      }
    }
  },
}