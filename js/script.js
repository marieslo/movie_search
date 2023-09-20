class IMDBSearch {
    ​
        constructor(options) {
            this.apiKey = options.apiKey;
            this.page = 1;
            this.searchTerm = '';
            this.searchType = 'series';
    ​
            this.elementContainer = document.getElementById(options.containerId);
        }
    ​
        async runSearch(term) {
    ​
            this.searchTerm = encodeURI(term);
    ​
            this.performRequest();
        }
    ​
        async getNext() {
    ​
            this.page++;
    ​
            this.performRequest();
        }
    ​
        async getPrev() {
    ​
            if (this.page > 1) {
                this.page--;
            }
    ​
            this.performRequest();
        }
    ​
        async performRequest() {
    ​
            const response = await fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&type=${this.searchType}&s=${this.searchTerm}&page=${this.page}`);
            const results = await response.json();
    ​
            for (let item of results.Search) {
                let listItem;
                if (this.searchType == 'movie') {
                    listItem = new MovieItem(item);
                } else {
                    listItem = new SeriesItem(item);
                }
    ​
                this.elementContainer.appendChild(listItem.createElement());
            }
        }
    }
    ​
    class ListItem {
    ​
        constructor(itemData) {
            this.id = itemData.imdbID;
            this.poster = itemData.Poster;
            this.title = itemData.Title;
            this.year = itemData.Year;
        }
    }
    ​
    class MovieItem extends ListItem {
    ​
        show() {
            console.log(`Movie name: ${this.title}, year of release: ${this.year}`)
        }
    ​
        createElement() {
    ​
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
    ​
            const movieImage = document.createElement('img');
            movieImage.setAttribute('src', this.poster);
            movieDiv.appendChild(movieImage);
    ​
            const movieTitle = document.createElement('h3');
            movieTitle.textContent = this.title;
            movieDiv.appendChild(movieTitle);
    ​
            movieDiv.addEventListener('click', () => this.show())
    ​
            return movieDiv;
        }
    }
    ​
    class SeriesItem extends ListItem {
    ​
        show() {
            console.log(`Movie name: ${this.title}, year of release: ${this.year}`)
        }
    ​
        createElement() {
    ​
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
    ​
            const movieTitle = document.createElement('h3');
            movieTitle.textContent = this.title;
            movieDiv.appendChild(movieTitle);
    ​
            movieDiv.addEventListener('click', () => this.show())
    ​
            return movieDiv;
        }
    }
    ​
    const search = new IMDBSearch({
        apiKey: '87dd0709',
        containerId: 'container'
    });
    ​
    search.runSearch('spider');