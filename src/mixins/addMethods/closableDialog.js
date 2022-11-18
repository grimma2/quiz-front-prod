export default {
  methods: {
    close (e) {
      if (!this.$el.contains(e.target)) {
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