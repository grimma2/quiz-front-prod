export default {
  methods: {
    cookiesIsExists (name) {
      let cookies = document.cookie

      let firstCondition = cookies.includes(`; ${name}=`)
      let secondCondition = cookies.match(/inGame=(.*); /)

      if (firstCondition || secondCondition) return true
    },
    removeCookie() {
      document.cookie = 'inGame=1; Max-Age=-99999999;'
      this.$store.commit('team/setLeaderBoard', {})
    }
  }
}