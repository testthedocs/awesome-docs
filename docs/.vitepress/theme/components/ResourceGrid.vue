<template>
  <div class="resource-grid">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Grid container for EnhancedLink components
</script>

<style scoped>
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

@media (max-width: 768px) {
  .resource-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1024px) {
  .resource-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}
</style>
