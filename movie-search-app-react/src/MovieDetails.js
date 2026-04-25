import './MovieSearch.css'
function MovieDetails({selectedMovie,onSelect,onBack}){
  return(
    <div className = "movie-details">
               <h2> {selectedMovie.Title} </h2>
               <img src={selectedMovie.Poster} alt="selectedMovie.Title"/>
                <p>  {selectedMovie.Plot} </p>
                <p>Year : {selectedMovie.Year}</p>
        <button onClick = {onBack}> Back </button>
     </div>
  );
}
export default MovieDetails;