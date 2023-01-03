<template>
  <img class="back-button-arrow" @click="back" src="@/assets/right-arrow.png">
  <div class="game-edit">
    <game-form @cancel="$router.push({path: `/game/${$route.params.pk}`})"/>
  </div>
</template>

<script>
import GameForm from "@/components/GameForm";
import back from "@/mixins/addMethods/back";

export default {
  name: "GameEdit",
  components: {GameForm},
  mixins: [back]
}
</script>

<style scoped>

</style>