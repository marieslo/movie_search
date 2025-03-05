<template>
  <div class="search-bar">
    <v-text-field
      v-model="searchTerm"
      label="Search for Movies or Series"
      @input="onSearch"
      outlined
      dense
      placeholder="e.g., Star Wars, Inception"
      class="search-input"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const searchTerm = ref('');

    // Emit search term to the parent component when search input changes
    const onSearch = () => {
      emit('search', searchTerm.value);
    };

    return {
      searchTerm,
      onSearch,
    };
  },
});
</script>

<style scoped>
.search-bar {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.search-input {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 25px;
}
</style>