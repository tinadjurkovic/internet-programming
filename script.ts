interface MovieData {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  plot: string;
  cast: string[]; // Update the cast type to string[]
  oscars: number;
}

type MovieSorter = (first: MovieData, second: MovieData) => number;

document.addEventListener("DOMContentLoaded", siteCode);

let movies: MovieData[] = [];

async function siteCode() {
  try {
    const data = await loadData();
    movies = data.movies;
    displayMovies(movies);

    const titleSort = document.getElementById("sort-title")!;
    titleSort.addEventListener("click", sortByTitle);

    const idSort = document.getElementById("sort-id")!;
    idSort.addEventListener("click", sortById);

    const yearSort = document.getElementById("sort-year")!;
    yearSort.addEventListener("click", sortByYear);

    const genreFilter = document.getElementById("genre-filter-select") as HTMLSelectElement;
    genreFilter.addEventListener("change", () => {
      const selectedGenre = genreFilter.value;
      filterMoviesByGenre(selectedGenre);
    });
    
    const oscarsSort = document.getElementById("sort-oscars")!;
    oscarsSort.addEventListener("click", sortByOscars);

    const actorFilterInput = document.getElementById("actor-filter-input") as HTMLSelectElement;
  actorFilterInput.addEventListener("input", () => {
  const actorName = actorFilterInput.value.trim();
  filterMoviesByActor(actorName);
});


  } catch (error) {
    console.error("Error loading movie data:", error);
  }
}

const loadData = async () => {
  const response = await fetch('./movies.json');
  if (!response.ok) {
    throw new Error("Response Not OK");
  }

  const data = await response.json();
  return data;
}

const titleSorter: MovieSorter = (first, second) => first.title.localeCompare(second.title);
const idSorter: MovieSorter = (first, second) => first.id - second.id;

const sortByTitle = () => {
  const sortedMovies = movies.slice().sort((a, b) => titleSorter(a, b));
  displayMovies(sortedMovies);
}

const sortById = () => {
  const sortedIds = movies.slice().sort((a, b) => idSorter(a, b));
  displayMovies(sortedIds);
}

const sortByYear = () => {
  const sortedYears = movies.slice().sort((a, b) => a.year - b.year);
  displayMovies(sortedYears);
}

const displayMovies = (movies: MovieData[]) => {
  const container = document.getElementById("movie-container")!;
  container.innerHTML = "";

const oscarsSort = document.getElementById("sort-oscars")!;
oscarsSort.addEventListener("click", sortByOscars);
  for (const movie of movies) {
    const movieRow = generateMovieRow(movie);
    container.appendChild(movieRow);
  }
}

const generateMovieRow = (movie: MovieData) => {
  const row = document.createElement("div");
  row.classList.add("movie-table");

  const idCell = createMovieCell("ID", movie.id);
  const titleCell = createMovieCell("Title", movie.title);
  const directorCell = createMovieCell("Director", movie.director);
  const yearCell = createMovieCell("Year", movie.year);
  const genreCell = createMovieCell("Genre", movie.genre);
  const plotCell = createMovieCell("Plot", movie.plot);
  const castCell = createMovieCell("Cast", movie.cast.join(", "));
  const oscarsCell = createMovieCell("Oscars", movie.oscars);
  

  row.appendChild(idCell);
  row.appendChild(titleCell);
  row.appendChild(directorCell);
  row.appendChild(yearCell);
  row.appendChild(genreCell);
  row.appendChild(plotCell);
  row.appendChild(castCell);
  row.appendChild(oscarsCell);

  return row;
}

const createMovieCell = (header: string, content: string | number) => {
  const cell = document.createElement("div");
  cell.classList.add("movie-data", `movie-${header.toLowerCase()}`);
  cell.innerHTML = `<strong>${header}:</strong> ${content}`;
  return cell;
}

function filterMoviesByGenre(selectedGenre: string) {
  if (selectedGenre === "") {
    displayMovies(movies);
  } else {
    const filteredMovies = movies.filter((movie) => {
      const movieGenres = movie.genre.split(',').map((genre) => genre.trim());
      return movieGenres.includes(selectedGenre);
    });
    displayMovies(filteredMovies);
  }
}

function filterMoviesByActor(actorName: string) {
  const filteredMovies = movies.filter((movie) => {
    let hasActor = false;
    for (const castMember of movie.cast) {
      const [actor, role] = castMember.split(" as ");
      if (actor.toLowerCase().includes(actorName.toLowerCase())) {
        hasActor = true;
        break; // No need to check other cast members for this movie
      }
    }
    return hasActor;
  });
  displayMovies(filteredMovies);
}



const sortByOscars = () => {
  const sortedOscars = movies.slice().sort((a, b) => a.oscars - b.oscars);
  displayMovies(sortedOscars);
}


