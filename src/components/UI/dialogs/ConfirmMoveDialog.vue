<template>
  <div class="confirm-move-dialog">
    <div class="dialog-container">
      <div class="dialog">
        <p>{{ text }}</p>
        <div class="buttons">
          <button class="confirm" @click.stop="makeMove">Да</button>
          <button class="close" @click.stop="$emit('close')">Нет</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmMoveDialog",
  props: {
    text: {
      type: String,
      required: true
    },
    needToCall: {
      type: Function,
      required: true
    },
    needToPassArgs: {
      type: Array,
      default: []
    }
  },
  methods: {
    makeMove () {
      this.needToCall(...this.needToPassArgs)
      this.$emit('close')
    },
    close (e) {
      let el = document.querySelector('.confirm-move-dialog > .dialog-container > div.dialog')
      if (!el.contains(e.target)) {
        this.$emit('close')
      }
    },
  },
  mounted () {
    document.addEventListener('click', this.close)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.close)
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

.dialog-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(182, 169, 169, 0.6);
  @include flexCentered();

  .dialog {
    width: 16em;
    background-color: white;
    padding: .5em;
    border: 1px solid black;
    border-radius: globalDefaults.$smallBorderRadius;

    p {
      text-align: center;
      word-break: break-word;
    }

    .buttons {
      margin-top: 1em;
      display: grid;
      grid-template-columns: repeat(2, calc(50% - 1em));
      grid-column-gap: 2em;

      .confirm {
        justify-self: end;
        @include button(green)
      }

      .close {
        justify-self: start;
        @include button(red)
      }
    }
  }
}
</style>