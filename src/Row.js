import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import './Row.css';
import movieTrailer from 'movie-trailer'



const base_url = "http://image.tmdb.org/t/p/original/";


function Row({ title, fetchUrl, isLargeRow}) {

  //props arguments received

  const [trailerUrl, setTrailerUrl] = useState("");
  const [movies, setMovies] = useState([]);
  // useState is a REACT hook-- > a functional piece of code
  // movies will be the state? We will set the movies into 'movies' using setMovies()



  useEffect(() => {
    // will run every time a row is loaded.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results); //accessing the api request's result data
      //this 'set's the movie date returned from the requests into the movies state variable
      //'movies' now holds the movie api request arrays
      return request;
    }
    fetchData();
  }, [fetchUrl]); //[] argument will run useEffect each time the argument changes (a dependency)
  //  the contents of dependency will always be the 'outside data'. In this case, fetchUrl is from outside this code segment
  
    const opts ={
        height: "390",
        width:"100%",
        playerVars:{
            autoplay: 1
        }
    };// css styling options for YouTube hosting


    const handleClick= (movie) => {
        // VVV if trailerUrl is already set, theres a video already being hosted. So, set it to empty so that we can clear the trailer window.
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.title || "")  //movieTrailer() is built in YouTube import function
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
                //ex:  https://www.youtube.com/watch?v=-cMqr9HpZ-Y
                // urlParams.get('v') will return whatever v =
                //  -> in this case, v equals cMqr9HpZ-Y, so cMqr9HpZ-Y will be returned
                console.log(urlParams.get("v"));
            


            })
            .catch(error => console.log(error));
        }//checking if trailer was found & displaying it if it was, else handle & show error

    };
  
  //console.log(movies);

  return (
    
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img 
          key={movie.id}
          //each poster will have a unique id: the movie.id element of the api request array
          className= {isLargeRow ? "a_row_poster" : "a_row_banner" } 
          //if isLargeRow = true, then css class name is "a_row-poster", else, css class name is "backdrop_path"
          onClick= {() => handleClick(movie)}
          src={`${base_url}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`
        }   // using " ` " to surround a string in which we want dynamic arguments
          //source of image is the local base url + movie.poster_path if large image= true or movie_backdrop_path is not large image=false
          alt={movie.name}/>
        ))}
        
        {/* Above, we mapped the movies state variable to 'movie' as a key and 'key, 'className' , 'src' and 'alt' as the values*/}
        {/*     -> 'movies' is locally declared and is a placeholder/representative of each movie item in the 'movies' state varible nested array.
                        each 'movie' will be an entry in the 'movies' array */}
      </div>
      {/* container for posters ^^^ */}
            {/* youtube trailer hosting here */} 
            {trailerUrl && < YouTube videoId={trailerUrl} opts={opts}></YouTube> }  
            {/*  ^^^ syntax means, when we have a trailerUrl, then execute this code (hosting code)  with  "trailerUrl" as YoutTube argument*/ }                    




    </div>
  );
}

export default Row;
//exporting allows us to use this component in other files
