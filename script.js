var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener("DOMContentLoaded", siteCode);
var movies = [];
function siteCode() {
    return __awaiter(this, void 0, void 0, function () {
        var data, titleSort, idSort, yearSort, genreFilter_1, oscarsSort, actorFilterInput_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, loadData()];
                case 1:
                    data = _a.sent();
                    movies = data.movies;
                    displayMovies(movies);
                    titleSort = document.getElementById("sort-title");
                    titleSort.addEventListener("click", sortByTitle);
                    idSort = document.getElementById("sort-id");
                    idSort.addEventListener("click", sortById);
                    yearSort = document.getElementById("sort-year");
                    yearSort.addEventListener("click", sortByYear);
                    genreFilter_1 = document.getElementById("genre-filter-select");
                    genreFilter_1.addEventListener("change", function () {
                        var selectedGenre = genreFilter_1.value;
                        filterMoviesByGenre(selectedGenre);
                    });
                    oscarsSort = document.getElementById("sort-oscars");
                    oscarsSort.addEventListener("click", sortByOscars);
                    actorFilterInput_1 = document.getElementById("actor-filter-input");
                    actorFilterInput_1.addEventListener("input", function () {
                        var actorName = actorFilterInput_1.value.trim();
                        filterMoviesByActor(actorName);
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error loading movie data:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var loadData = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('./movies.json')];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Response Not OK");
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
var titleSorter = function (first, second) { return first.title.localeCompare(second.title); };
var idSorter = function (first, second) { return first.id - second.id; };
var sortByTitle = function () {
    var sortedMovies = movies.slice().sort(function (a, b) { return titleSorter(a, b); });
    displayMovies(sortedMovies);
};
var sortById = function () {
    var sortedIds = movies.slice().sort(function (a, b) { return idSorter(a, b); });
    displayMovies(sortedIds);
};
var sortByYear = function () {
    var sortedYears = movies.slice().sort(function (a, b) { return a.year - b.year; });
    displayMovies(sortedYears);
};
var displayMovies = function (movies) {
    var container = document.getElementById("movie-container");
    container.innerHTML = "";
    var oscarsSort = document.getElementById("sort-oscars");
    oscarsSort.addEventListener("click", sortByOscars);
    for (var _i = 0, movies_1 = movies; _i < movies_1.length; _i++) {
        var movie = movies_1[_i];
        var movieRow = generateMovieRow(movie);
        container.appendChild(movieRow);
    }
};
var generateMovieRow = function (movie) {
    var row = document.createElement("div");
    row.classList.add("movie-table");
    var idCell = createMovieCell("ID", movie.id);
    var titleCell = createMovieCell("Title", movie.title);
    var directorCell = createMovieCell("Director", movie.director);
    var yearCell = createMovieCell("Year", movie.year);
    var genreCell = createMovieCell("Genre", movie.genre);
    var plotCell = createMovieCell("Plot", movie.plot);
    var castCell = createMovieCell("Cast", movie.cast.join(", "));
    var oscarsCell = createMovieCell("Oscars", movie.oscars);
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(directorCell);
    row.appendChild(yearCell);
    row.appendChild(genreCell);
    row.appendChild(plotCell);
    row.appendChild(castCell);
    row.appendChild(oscarsCell);
    return row;
};
var createMovieCell = function (header, content) {
    var cell = document.createElement("div");
    cell.classList.add("movie-data", "movie-".concat(header.toLowerCase()));
    cell.innerHTML = "<strong>".concat(header, ":</strong> ").concat(content);
    return cell;
};
function filterMoviesByGenre(selectedGenre) {
    if (selectedGenre === "") {
        displayMovies(movies);
    }
    else {
        var filteredMovies = movies.filter(function (movie) {
            var movieGenres = movie.genre.split(',').map(function (genre) { return genre.trim(); });
            return movieGenres.includes(selectedGenre);
        });
        displayMovies(filteredMovies);
    }
}
function filterMoviesByActor(actorName) {
    var filteredMovies = movies.filter(function (movie) {
        for (var _i = 0, _a = movie.cast; _i < _a.length; _i++) {
            var castMember = _a[_i];
            var _b = castMember.split(" as "), actor = _b[0], role = _b[1];
            if (actor.toLowerCase().includes(actorName.toLowerCase())) {
                return true;
            }
        }
        return false;
    });
    displayMovies(filteredMovies);
}
var sortByOscars = function () {
    var sortedOscars = movies.slice().sort(function (a, b) { return a.oscars - b.oscars; });
    displayMovies(sortedOscars);
};
