<template>
  <div class="hints-dialog">
    <div class="dialog">
      <div class="question-hints">

        <div data-color="default" class="ques-hint" v-for="hint in question.hints" :key="hint.pk">
          <textarea
            class="hint-text"
            v-if="editHint.pk === hint.pk"
            v-model="editHint.text"
            @keyup.enter="changeHint"
          />
          <span class="hint-text answer-text" v-else @click.stop="editHint = hint">{{ hint.text }}</span>

          <div class="hint-delete-control">
            <img
              class="hint-delete-img"
              src="@/assets/x.png"
              @click.stop="removeHint(hint)"
            >
          </div>

          <div class="time-picker-container">
            <time-picker
              :object="hint"
              @changeTime="changeTime"
            />
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimePicker from '@/components/TimePicker.vue'

export default {
  name: 'HintsDialog',
  components: {TimePicker},
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editHint: {}
    }
  },
  methods: {
    removeHint (hint) {
      console.log(hint)
      this.$emit('remove', hint)
    },
    changeHint () {
      this.$emit('changeText', this.editHint)
      this.editHint = {}
    },
    changeTime(time, pk) {
      this.$emit('changeTime', time, pk)
    },
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

.hints-dialog {
  @include flexCentered();
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(151, 246, 246, 0.5);

  .dialog {
    background-color: white;
    overflow-y: scroll;
    border: 1px solid black;
    border-radius: globalDefaults.$smallBorderRadius;
    width: 18em;
    min-height: 50%;
    padding: $globalPadding;

    .question-hints {
      height: 100%;
      display: grid;
      grid-template-columns: 100%;
      grid-row-gap: 1.5em;

      .ques-hint {
        display: flex;
        flex-wrap: wrap;
        row-gap: 1em;
        justify-content: space-between;

        .hint-text {
          width: 95%;
        }

        .answer-text {
          word-wrap: break-word;
        }

        .time-picker-container {
          display: flex;
          align-items: center;
        }

        .hint-delete-control {
          width: 5%;
          height: 1em;

          img {
            height: 100%;
            widows: 100%;
          }
        }
      }
    }
  }
}
</style>