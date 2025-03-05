<template>
  <div class="app-container">
    <Header @search="handleSearch" />
    <HomeView :searchTerm="searchTerm" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import HomeView from './components/HomeView.vue';

const searchTerm = ref('');


const handleSearch = (term: string) => {
  searchTerm.value = term;
};
</script>

<style scoped>
</style>
