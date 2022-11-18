<template>
  <div class="game-create">
    <game-form @cancel="$router.push({path: `/games`})"/>
  </div>
</template>

<script>
import GameForm from "@/components/GameForm";

export default {
  name: "GameCreate",
  components: {GameForm}
}
</script>

<style scoped>

</style>