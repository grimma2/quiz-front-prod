<template>
  <div class="info-text-dialog">
    <span>
      info text
    </span>
  </div>
</template>

<script>
import closableDialog from "@/mixins/addMethods/closableDialog";

export default {
  name: "InfoTextDialog",
  mixins: [closableDialog]
}
</script>

<style lang="scss" scoped>
@use "@/scss/globalDefaults";

.info-text-dialog {
  position: fixed;
  width: 5em;
  margin-left: globalDefaults.$questionWidth - 9em;
  margin-top: .5em;
  height: 5em;
  border: 1px solid black;
  border-radius: globalDefaults.$smallBorderRadius;
  padding: .5em;
  background-color: white;

  span {
    word-wrap: break-word;
  }
}
</style>