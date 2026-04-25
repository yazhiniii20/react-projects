import './MovieSearch.css'
function MovieCard({movie,onSelect}){
 return(
    <div key = {movie.imdbID} className = "movie-card"  onClick = {() => onSelect(movie.imdbID)}>
                <h3> {movie.Title}</h3>
                <h4> {movie.Year} </h4>
                <img src = {movie.Poster} alt = {movie.Title} onError={(e) => {
    e.target.src = "https://placehold.net/400x400.png";
  }}/>
            </div>  
 );
}
export default MovieCard;