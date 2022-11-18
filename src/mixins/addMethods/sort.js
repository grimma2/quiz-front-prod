export default {
  methods: {
    sortCompare (key) {
      console.log('sort')
      return (a, b) => {
        if (a[key] < b[key]){
          return -1;
        }
        if (a[key] > b[key]){
          return 1;
        }
        return 0;
      }
    }
  }
}