<template>
  <div class="time-picker">
    <span>Время, через котрое появляется</span>
    <div class="time-picker-container">
      <div class="minutes" @click.stop="showMinutes = true">
        <span>{{ minutes }}</span>
        <div class="value-list" v-if="showMinutes">
          <p class="value" v-for="value in values" :key="value" @click.stop="setValue(value, 'minutes')">{{ value }}</p>
        </div>
      </div>
      <p class="d-dot">
        <span>:</span>
      </p>
      <div class="seconds" @click.stop="showSeconds = true">
        <span>{{ seconds }}</span>
        <div class="value-list" v-if="showSeconds">
          <p class="value" v-for="value in values" :key="value" @click.stop="setValue(value, 'seconds')">{{ value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimePicker",
  props: {
    object: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      values: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
        '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
        '51', '51', '53', '54', '55', '56', '57', '58', '59'
      ],
      showMinutes: false,
      showSeconds: false,
      minutes: '00',
      seconds: '00'
    }
  },
  methods: {
    outsideClick (e) {
      this.showMinutes = false
      this.showSeconds = false
    },
    setValue (value, type) {
      if (type === 'minutes') {
        // send already parsed time to update
        this.minutes = value
        this.$emit('changeTime', `00:${this.minutes}:${this.seconds}`, this.object.pk)
        this.showMinutes = false
      } else {
        this.seconds = value
        this.$emit('changeTime', `00:${this.minutes}:${this.seconds}`, this.object.pk)
        this.showSeconds = false
      }
    }
  },
  mounted () {
    if (!this.object.appear_after) return
    let times = this.object.appear_after.split(':')

    // take second element as minutes and third element as seconds because we fetch data like
    // {hours}:{minutes}:{seconds} but we need only {minutes}:{seconds}
    this.minutes = times[1]
    this.seconds = times[2]

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
  display: flex;
  align-items: center;
}

.time-picker-container {
  margin-left: .5em;
  display: grid;
  grid-template-columns: 2em .1em 2em;
  grid-auto-rows: 2em;
  grid-column-gap: .5em;

  .d-dot {
    @include flexCentered();
  }

  .seconds, .minutes {
    border: 1px solid #c4c2bd;
    border-radius: globalDefaults.$smallBorderRadius;
    background-color: #c4c2bd;
    @include flexCentered();

    .value-list {
      background-color: white;
      position: absolute;
      margin-top: 17em;
      width: 2.5em;
      height: 15em;
      overflow-y: scroll;

      .value {
        padding: .5em 0 .5em .3em;

        &:hover {
          color: white;
          background-color: #2f2fec;
        }
      }
    }
  }
}
</style>