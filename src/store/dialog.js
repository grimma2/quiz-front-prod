export const dialog = {
  state: () => ({
    moveDialog: {
      show: false,
      needToCall: null,
      needToPassArgs: [],
      text: ''
    }
  }),
  mutations: {
    setMoveDialog (state, {needToCall, needToPassArgs, text}) {
      if (needToCall) {
        state.moveDialog.needToCall = needToCall
        state.moveDialog.needToPassArgs = needToPassArgs
        state.moveDialog.text = text
        state.moveDialog.show = true
      } else {
        state.moveDialog.needToCall = needToCall
        state.moveDialog.needToPassArgs = needToPassArgs
        state.moveDialog.text = text
        state.moveDialog.show = false
      }
    }
  },
  namespaced: true
}
