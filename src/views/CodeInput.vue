<template>
  <img class="back-button-arrow" @click="back" src="@/assets/right-arrow.png">
  <div class="code-input">
    <form @submit.stop="submitCode">
      <input class="input" v-model="code" type="text" placeholder="Введите код команды">
      <p class="error-text" v-if="error">
        <span class="inner-error">{{ error }}</span>
      </p>
    </form>
  </div>
</template>

<script>
import back from "@/mixins/addMethods/back";

export default {
  name: "CodeInput",
  mixins: [back],
  data () {
    return {
      code: '',
      error: ''
    }
  },
  methods: {
    validateCode() {
      const SYMBOLS_IN_CODE = 5
      if (this.code.length !== SYMBOLS_IN_CODE) {
        this.error = `Код должен состоять из ${SYMBOLS_IN_CODE} символов`
      }
    },
    async submitCode() {
      this.validateCode()
      this.$router.push({path: `/play/team/${this.code}`})
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";


.input {
  @include defaultInput();
}

.code-input {
  @include flexCentered();
  min-height: 100vh;

  //form {
  //  width: $elementsWidth;
  //}
}

.error-text {
  margin-top: 1em;
  padding: .5em .8em;
  border-radius: globalDefaults.$smallBorderRadius;
  @include flexCentered();
  background-color: #c70c0c;
  width: 100%;

  .inner-error {
    color: wheat;
  }
}
</style>