<template>
  <div class="home-container">
    <SearchBar @search="handleSearch" />
    <v-btn @click="loadMore" class="load-more-btn" outlined>Load More</v-btn>
    <div ref="container" class="movie-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import axios from 'axios';
import SearchBar from './SearchBar.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchBar,
  },
  setup() {
    const searchTerm = ref('');
    const container = ref<HTMLElement | null>(null);
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    let page = 1;

    watch(searchTerm, async () => {
      page = 1;
      await performRequest();
    });

    const handleSearch = (term: string) => {
      searchTerm.value = term;
      page = 1; // Reset to first page when user starts a new search
      performRequest();
    };

    const loadMore = async () => {
      page++;  // Increment page number to fetch next set of results
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
            if (page === 1) {
              container.value.innerHTML = ''; 
            }
            response.data.Search.forEach((item: any) => {
              const movieDiv = document.createElement('div');
              movieDiv.classList.add('movie');

              const movieImage = document.createElement('img');
              movieImage.setAttribute('src', item.Poster || 'path/to/default/image.jpg');
              movieDiv.appendChild(movieImage);

              const movieTitle = document.createElement('h3');
              movieTitle.textContent = item.Title;
              movieDiv.appendChild(movieTitle);

              const movieYear = document.createElement('p');
              movieYear.textContent = `Year: ${item.Year}`;
              movieDiv.appendChild(movieYear);

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
        handleSearch(searchTerm.value);
      }
    });

    return {
      searchTerm,
      handleSearch,
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
  text-align: center;
}

.load-more-btn {
  display: block;
  margin: 0 auto;
  background-color: #9d052e;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: 1px solid #9d052e;
}

.load-more-btn:hover {
  background-color: #c01543;
  transform: translateY(-5px);
  cursor: pointer;
}

.movie-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .movie-container {
    gap: 20px !important;
  }

  .load-more-btn {
    width: 100%;
  }
}

.movie {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.movie:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.movie img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.movie h3 {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #333;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.movie p {
  font-size: 0.9rem;
  color: #555;
  margin: 5px 0;
}

.movie a {
  text-decoration: none;
  color: #9d052e;
  margin-top: 10px;
}

.movie a:hover {
  text-decoration: underline;
}
</style>