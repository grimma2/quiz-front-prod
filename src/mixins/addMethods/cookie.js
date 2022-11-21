export default {
  methods: {
    cookiesIsExists (name, content) {
      if (document.cookie.includes(`${name}=${content}`)) return true
    },
    removeCookie() {
      document.cookie = 'inGame=1; Max-Age=-99999999;'
      this.$store.commit('team/setLeaderBoard', {})
    }
  }
}