export default {
  methods: {
    searchParent (parentClass, element) {
      console.log('searchParent.............')
      while (![...element.classList].filter(cl => cl === parentClass).length) {
        element = element.parentElement
      }
      console.log(element)

      return element
    }
  }
}