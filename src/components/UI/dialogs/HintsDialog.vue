<template>
  <div class="hints-dialog">
    <div class="dialog">
      <div class="question-hints">

        <div data-color="default" class="ques-hint" v-for="hint in question.hints" :key="hint.pk">
          <textarea
            class="hint-textarea"
            v-if="editHint.pk === hint.pk"
            v-model="editHint.text"
            @keyup.enter="changeHint"
          />
          <span class="answer-text" v-else @click.stop="editHint = hint">{{ hint.text }}</span>

          <time-picker :object="hint" :object-type="'hint'" @changeTime="changeTime"/>

          <div class="hint-controls">
            <div class="hint-edit-control">
              <img
                class="hint-edit-img"
                src="@/assets/pen.png"
                @click.stop="removeHint(hint)"
              >
            </div>

            <div class="hint-delete-control">
              <img
                class="hint-delete-img"
                src="@/assets/x.png"
                @click.stop="editHint = hint"
              >
            </div>
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
    removeHint (e, hint) {
      console.log(hint)
      this.$emit('remove', hint.pk)
    },
    changeHint (e) {
      this.$emit('changeText', this.editHint)
    },
    changeTime(e, time, pk) {
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
    
</style>