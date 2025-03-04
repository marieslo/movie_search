<template>
  <div class="home-container">
    <v-text-field
      v-model="searchTerm"
      label="Search for Movies or Series"
      @input="runSearch"
      class="search-input"
      outlined
    />
    <v-btn @click="loadMore" class="load-more-btn" outlined>Load More</v-btn>
    <div ref="container" class="movie-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const searchTerm = ref('');
    const container = ref<HTMLElement | null>(null);
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    let page = 1;

    const runSearch = async (term: string) => {
      searchTerm.value = term;
      await performRequest();
    };

    const loadMore = async () => {
      page++;
      await performRequest();
    };

    const performRequest = async () => {
      try {
        const response = await axios.get('https://www.omdbapi.com/', {
          params: {
            apikey: apiKey,
            type: 'movie',
            s: searchTerm.value,
            page,
          },
        });

        if (response.data.Response === 'True' && response.data.Search) {
          if (container.value) {
            container.value.innerHTML = '';
            response.data.Search.forEach((item: any) => {
              const movieDiv = document.createElement('div');
              movieDiv.classList.add('movie');

              const movieImage = document.createElement('img');
              movieImage.setAttribute('src', item.Poster || 'path/to/default/image.jpg');
              movieDiv.appendChild(movieImage);

              const movieTitle = document.createElement('h3');
              movieTitle.textContent = item.Title;
              movieDiv.appendChild(movieTitle);

              container.value!.appendChild(movieDiv);
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(() => {
      if (container.value) {
        runSearch('Star Wars');
      }
    });

    return {
      searchTerm,
      runSearch,
      loadMore,
      container,
    };
  },
});
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-input {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 20px;
}

.load-more-btn {
  display: block;
  margin: 0 auto 40px;
  background-color: #9d052e;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.load-more-btn:hover {
  background-color: #c01543;
  transform: translateY(-5px);
  cursor: pointer;
}

.movie-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}


@media (min-width: 1200px) {
  .movie-container {
    gap: 30px;
  }
}

.movie {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.movie img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.movie h3 {
  text-align: center;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

</style>