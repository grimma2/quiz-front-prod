<template>
  <div class="game-edit">
    <game-form @cancel="$router.push({path: `/game/${$route.params.pk}`})"/>
  </div>
</template>

<script>
import GameForm from "@/components/GameForm";

export default {
  name: "GameEdit",
  components: {GameForm},
}
</script>

<style scoped>

</style>