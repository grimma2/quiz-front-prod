export default {
  data () {
    return {
      dragElement: null
    }
  },
  methods: {
    dragStart (e) {
      this.dragElement = this.searchParent('question', e.target)
      this.dragElement.style.opacity = 0
      console.log(e.target.classList[0])
    },
    dragEnd (e) {
      this.dragElement.style.opacity = 1
    },
    dragDrop (e) {
      let dragHTML = this.dragElement
      let dragEnterHTML = this.searchParent('question', e.target)
      let dragElement = (
        this.game.question_set.filter(qs => String(qs.pk) === dragHTML.dataset.quesPk)
      )[0]

      let dragEnterElement = (
        this.game.question_set.filter(qs => String(qs.pk) === dragEnterHTML.dataset.quesPk)
      )[0]

      let copyEnterEl = {...dragEnterElement}
      let copyEl = {...dragElement}
      dragElement.order = copyEnterEl.order
      dragEnterElement.order = copyEl.order
    }
  }
}