<template>
  <hints-dialog
    v-if="dialog.show && (dialog.type === 'hintList')"
    :question="dialog.question"
    @changeText="changeHintText"
    @changeTime="changeTimeHint"
    @remove="removeHint"
    @close="clearDialog"
  />
  <question-answer-dialog
    v-if="dialog.show && (dialog.type === 'answer')"
    :question="dialog.question"
    @addAnswer="addAnswer"
    @close="clearDialog"
  />
  <question-hint-dialog
    v-if="dialog.show && (dialog.type === 'hint')"
    :question="dialog.question"
    @addHint="addHint"
    @close="clearDialog"
  />
  <div class="game-form" @click="hideInputs">
    <div class="form-elements">
      <div class="separate-fields">
        <div class="error" v-if="error">
          <p>{{ error }}</p>
        </div>
        <input type="text" v-model="game.name" placeholder="Название игры">
      </div>
      <div class="teams">
        <p class="title">Команды</p>
        <div class="team" v-for="team in game.team_set" :key="team.pk" v-if="game.team_set.length">
          <p
            class="team-name"
            v-if="teamInput !== team.pk"
            @click.stop="teamInput = team.pk"
          >{{ team.name }}</p>
          <input class="team-input" type="text" v-else v-model="team.name" @keyup.enter="teamInput = false">
          <div class="delete-team-block" @click="removeTeam(team)">
            <img src="@/assets/x.png" class="delete-team-img">
          </div>
        </div>
        <div class="empty" v-else>
          <p>Здесь будут появляться созданные вами комманды</p>
        </div>

        <button
          class="add-button"
          @click="addItem(game.team_set, {name: 'Новая команда'})"
        >Добавить команду</button>
      </div>
      <div class="questions">
        <p class="title">Вопросы</p>
        <div
          class="question"
          draggable="true"
          @dragstart="dragStart"
          @dragover.prevent=""
          @dragleave.prevent=""
          @dragenter.prevent=""
          @dragend.prevent="dragEnd"
          @drop.prevent="dragDrop"
          v-for="ques in game.question_set.sort(sortCompare('order'))"
          v-if="game.question_set.length"
          :key="ques.pk"
          :data-ques-pk="ques.pk"
        >
          <p
            class="ques-text-el"
            v-if="questionInput !== ques.pk"
            @click.stop="questionInput = ques.pk"
          >{{ ques.text }}</p>

          <textarea
            class="ques-text-el"
            v-else v-model="ques.text"
            @keyup.enter="closeQuestionInput(ques)"
          />

          <div class="delete-ques-block" @click="removeQuestion(ques)">
            <img class="delete-ques-img" src="@/assets/x.png">
          </div>

          <div class="question-answers">
            <div data-color="default" class="ques-answer" v-for="answer in ques.correct_answers">
              <span class="answer-text">{{ answer.text }}</span>
              <img
                class="delete-answer-img"
                src="@/assets/x.png"
                @click.stop="removeAnswer(ques, answer)"
              >
            </div>
          </div>

          <div class="bottom-controls">
            <!--Выбор типа вопроса-->
            <div class="question-choose">
              <div
                class="default-option"
                :data-isactive="ques.question_type === 'default' ? 'true' : 'false'"
                @click="ques.question_type = 'default'"
              >
                <p class="type-option">Обычный</p>
              </div>
              <div
                class="blitz-option"
                :data-isactive="ques.question_type === 'blitz' ? 'true' : 'false'"
                @click="ques.question_type = 'blitz'"
              >
                <p class="type-option">Блитц</p>
              </div>
            </div>
            <button
              class="add-button add-answer"
              @click.stop="showDialog(ques, 'answer')"
            >Добавить ответ</button>
          </div>

          <div class="bottom-controls">
            <button
              class="add-button add-hint"
              @click.stop="showDialog(ques, 'hintList')"
            >Смотреть подсказки</button>

            <button
              class="add-button add-hint"
              @click.stop="showDialog(ques, 'hint')"
            >Добавить подсказку</button>
          </div>
        </div>
        <div class="empty" v-else>
          <p>Здесь будут появляться созданные вами вопросы</p>
        </div>

        <button
          class="add-button add-ques"
          @click="
          addItem(
              game.question_set, {
                text: 'Новый вопрос',
                correct_answers: [],
                hints: [],
                question_type: 'default'
              }, true
            )
          "
        >Добавить вопрос</button>
      </div>
    </div>
    <div class="form-buttons">
      <button class="save-button" @click="saveGame">Сохранить</button>
      <button class="cancel-button" @click="$emit('cancel')">Отмена</button>
    </div>
  </div>
</template>

<script>
import {ax} from "@/api/defaults";

import QuestionAnswerDialog from "@/components/UI/dialogs/QuestionAnswerDialog";
import QuestionHintDialog from "@/components/UI/dialogs/QuestionHintDialog";
import HintsDialog from "@/components/UI/dialogs/HintsDialog.vue";
import TimePicker from "@/components/TimePicker";

import game from '@/mixins/addMethods/game'
import gameFormValidation from "@/mixins/validators/gameFormValidation";
import draggable from "@/mixins/addData/draggable";
import sort from "@/mixins/addMethods/sort";
import searchParent from "@/mixins/addMethods/searchParent";
import gamesCookie from "@/mixins/addMethods/gamesCookie";
import dialogMixin from '@/mixins/addData/dialogMixin'

export default {
  name: "GameForm",
  components: {TimePicker, QuestionAnswerDialog, QuestionHintDialog, HintsDialog},
  mixins: [game, gameFormValidation, draggable, sort, searchParent, gamesCookie, dialogMixin],
  data () {
    return {
      game: {
        question_set: [],
        team_set: [],
      },
      teamInput: '',
      questionInput: '',
      error: ''
    }
  },
  methods: {
    removeTeamInput (e) {
      if (e.keyCode === 13) this.teamInput = false
    },
    removeQuestionInput (e) {
      if (e.keyCode === 13) this.questionInput = false
    },
    removeTeam(team) {
      this.game.team_set = this.game.team_set.filter(tm => tm.pk !== team.pk)
    },
    removeQuestion(question) {
      this.game.question_set = this.game.question_set.filter(qs => qs.pk !== question.pk)
    },
    removeAnswer(question, answer) {
      question.correct_answers = question.correct_answers.filter(an => an !== answer)
    },
    addItem (array, fields, addOrder=false) {
      let pushObject;
      if (addOrder) {
        let order = this.game.question_set.length ? this.game.question_set.slice(-1)[0].order + 1 : 1
        pushObject = {...fields, pk: String(new Date()), order: order}
      } else {
        pushObject = {...fields, pk: String(new Date())}
      }
      array.push(pushObject)
    },
    getSaveURL () {
      if (this.$route.params.pk) {
        return 'game/update/'
      } else {
        return 'game/create/'
      }
    },
    async saveGame () {
      if (!this.isValid()) return
      try {
        console.log(this.game)
        const response = await ax.post(this.getSaveURL(), this.game)
        if (!this.$route.params.pk) {
          this.$store.commit('game/setGamesPks', [...this.$store.state.game.gamesPks, response.data.pk])
          await this.setGames(this.$store.state.game.gamesPks)
          console.log('after setGames in saveGame')
        }
        console.log(response.data)
        this.$router.push({path: `/game/${response.data.pk}`})
      } catch (e) {
        console.log(e)
      }
    },
    hideInputs (e) {
      let rootElement = document.querySelector('div.game-form > div.form-elements')
      let teamInput = rootElement.querySelector('.teams > .team > input.team-input')
      let questionInput = rootElement.querySelector('.questions > .question > textarea')

      if (teamInput) {
        if (!teamInput.contains(e.target)) {
          this.teamInput = ''
        }
      }

      if (questionInput) {
        if (!questionInput.contains(e.target)) {
          this.questionInput = ''
        }
      }
    },
    closeQuestionInput (question) {
      question.text = question.text.trim()
      this.questionInput = ''
    }
  },
  async mounted () {
    let gamePk = this.$route.params.pk
    if (!gamePk) return
    if (!await this.hasInGames(gamePk)) window.history.back()
    if (gamePk) {
      this.game = await this.fetchGame(gamePk)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";
@import "@/scss/answers.scss";

$teamRow: 2.5em;
$xSize: 1.2em;

.add-button {
  @include button(#0ede0e);
}

.form-elements {
  @include pageElement();
  min-height: 1px;
  display: grid;
  align-items: start;
}

.separate-fields {
  @include fullElementGrid();

  .error {
    width: calc(100% - 2em);
    border-radius: globalDefaults.$smallBorderRadius;
    padding: .5em 1em;
    background: rgba(78, 5, 5, .5);

    p {
      color: white;
      word-break: break-word;
    }
  }

  input[type="text"], input[type="number"] {
    width: 15em;
    padding-left: .3em;
    height: 1.5em;
  }

  .question-time-container {
    display: flex;
    align-items: center;
    input {
      margin-left: .5em;
    }
  }
  //@include separateBorder();
}

.teams {
  @include fullElementGrid();

  .team {
    border: 1px solid #1b1b1b;
    border-radius: globalDefaults.$smallBorderRadius;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .3em;

    input, p {
      width: calc(100% - $teamRow - 1.5em);
    }

    .delete-team-block {
      height: $teamRow;
      width: $teamRow;
      @include flexCentered();
      img {
        height: $xSize;
        width: $xSize;
      }
    }
    //@include separateBorder();
  }
}

.questions {
  @include fullElementGrid();

  .question {
    border: 1px solid black;
    border-radius: globalDefaults.$smallBorderRadius;
    padding: .5em;
    display: grid;
    grid-template-columns: calc(100% - $xSize - .25em) calc($xSize - .25em);
    grid-column-gap: .25em;
    grid-row-gap: .5em;

    .ques-text-el {
      grid-row: 1/3;
      word-wrap: break-word;
    }

    .delete-ques-block {
      img {
        height: $xSize;
        width: $xSize;
      }
    }

    .question-answers {
      grid-column: 1/3;
    }

    .bottom-controls {
      grid-column: 1/3;
      display: flex;
      justify-content: space-between;

      .question-choose {
        width: 10em;
        padding: .3em;
        border-radius: globalDefaults.$smallBorderRadius;
        background: grey;
        display: grid;
        grid-template-columns: repeat(2, calc(50% - .25em));
        grid-column-gap: .5em;

        > div {
          border-radius: globalDefaults.$smallBorderRadius;
          @include flexCentered();
        }

        > div[data-isactive="true"] {
          background-color: yellow;
        }

        > div[data-isactive="false"] {
          p {
            color: white;
          }
        }
      }
    }

/*     button {
      width: 8em;
    } */
  }
}

.title {
  font-weight: bold;
}

.form-buttons {
  width: 97.5vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 10em 10em;
  grid-column-gap: 1em;
  padding-bottom: .5em;

  .save-button {
    @include button(#0ede0e);
  }

  .cancel-button {
    @include button(red);
  }
}

.empty {
  border: 3px dashed black;
  border-radius: globalDefaults.$smallBorderRadius;
  padding: 1em .5em;
}
</style>
