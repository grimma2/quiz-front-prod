<template>
  <div class="time-picker">
    <div class="minutes" @click="showMinutes = !showMinutes">
      <span>{{ minutes }}</span>
      <div class="value-list" v-if="showMinutes" :ref="'minutes-list'">
        <p class="value" v-for="value in values" :key="value" @click="minutes = value">{{ value }}</p>
      </div>
    </div>
    <p class="d-dot">
      <span>:</span>
    </p>
    <div class="seconds" @click="showSeconds = !showSeconds">
      <span>{{ seconds }}</span>
      <div class="value-list" v-if="showSeconds" :ref="'seconds-list'">
        <p class="value" v-for="value in values" :key="value" @click="seconds = value">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimePicker",
  data () {
    return {
      minutes:  '00',
      seconds: '00',
      values: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
        '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
        '51', '51', '53', '54', '55', '56', '57', '58', '59'
      ],
      showMinutes: false,
      showSeconds: false
    }
  },
  methods: {
    outsideClick (e) {
      console.log(this.$refs)
    }
  },
  mounted () {
    document.addEventListener('click', this.outsideClick)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.outsideClick)
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";
@import "@/scss/style.scss";

.time-picker {
  display: grid;
  grid-template-columns: 3em .1em 3em;
  grid-auto-rows: 3em;
  grid-column-gap: .5em;

  .d-dot {
    @include flexCentered();
  }

  .seconds + .minutes {
    border: 1px solid #c4c2bd;
    border-radius: globalDefaults.$smallBorderRadius;
    background-color: #c4c2bd;

    .value-list {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 3em;
      height: 7em;
      overflow: scroll;

      .value {
        padding: .1em .3em .3em 0;

        &:hover {
          color: white;
          background-color: #2f2fec;
        }
      }
    }
  }
}
</style>