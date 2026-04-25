import {useState} from 'react';
import './MovieSearch.css';
import MovieCard from'./MovieCard.js';
import MovieDetails from './MovieDetails.js'
function MovieSearch(){
    const [search,setSearch] = useState("");
    const [movies , setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedMovie , setselectedMovie] = useState(null);
    async function getMovies(search){
        setHasSearched(true);
        if(search.trim() === ""){
            setMovies([]);
            return;
        }
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?apikey=a46aa13b&s=${search}`);
        const data = await response.json();
        console.log(data);
        if(data.Response === "False"){
            setMovies([]);
        }else{
        setMovies(data.Search);
        }
        setLoading(false);
    }
    async function getselectedmoviedetails(imdbID){
        const response = await fetch(`https://www.omdbapi.com/?apikey=a46aa13b&i=${imdbID}`);
        const data = await response.json();
        console.log(data);
        if(data.Response === "False"){
            setselectedMovie(null);
        }else{
            setselectedMovie(data);
        }
    }
    return(
      <div className = "movie-container">
     {selectedMovie ? (
           <MovieDetails selectedMovie={selectedMovie} onBack = {() => setselectedMovie(null)}/>
        ):
      (
        <>
        <input type = "text" value = {search} onChange = {(e) => setSearch(e.target.value)}/>
      <button onClick={() => getMovies(search)}> Search</button>
      {loading && <p> Loading </p>}
      {hasSearched && !loading && movies.length === 0 && (
             <p>No movies found</p>
     )}
      <div className = "movie-grid" >
        {movies.map(movie => (
            <MovieCard movie = {movie} onSelect = {getselectedmoviedetails}/> 
        ))} 
        </div> 
        </>
        )}
      
      </div>
    );
}
export default MovieSearch;