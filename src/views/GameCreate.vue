<template>
  <img class="back-button-arrow" @click="back" src="@/assets/right-arrow.png">
  <div class="game-create">
    <game-form @cancel="$router.push({path: `/games`})"/>
  </div>
</template>

<script>
import GameForm from "@/components/GameForm";
import back from "@/mixins/addMethods/back";

export default {
  name: "GameCreate",
  components: {GameForm},
  mixins: [back]
}
</script>

<style scoped>

</style>