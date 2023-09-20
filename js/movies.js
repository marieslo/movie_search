window.addEventListener('load', init);


function init() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    searchButton.addEventListener('click', () => {
        runSearch(searchInput.value)
    });
}
// https://www.omdbapi.com/ ? apikey=87dd0709 & type=movie & s=spider
async function runSearch(searchTerm) {

    const innerContainer = getElementById("innre-container")
    innerContainer.innerHTML = "";
    
    const response = await fetch('https://www.omdbapi.com/?apikey=87dd0709&type=movie&s=' + searchTerm);
    const result = await response.json();
    
    
    for (let movie of result.Search) {

        const movieElement = createMovie(movie)
        console.log(movieElement)
    }
}


function createMovie(movie) {
    const  movieDiv = document.createElement ("div");
    movieDiv.classList.add ("movie")

    const movieImage = document.createElement("img");
    movieImage.setAttribute("src", moviePoster);
    movieDiv.appendChild(movieImage);

    const movieTitle = document.createElement ("h3");
    movieTitle.textContent - movieTitle;
    movieDiv.appendChild(movieImage)

}








