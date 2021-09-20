import React, { useEffect, useState } from 'react'

import axios from './axios'
import requests from './requests';
import './Banner.css'


function Banner() {

        const [movie, setMovie] = useState([]); //state variable that will be responsible for random movie that gets selected for the page banner


        // useEffect is a piece of code which runs based on a given condition.
        //   - in our case, this code needs to run each time the banner header loads
        //   = since we will be calling on an external api, it needs to be asynchronous => async   
        useEffect(() => {

            async function fetchData(){
                const request= await axios.get(requests.fetchNetflixOriginals);

                var moviesArray= request.data.results;
                //moviesArray will be array of results from the api request

                var randomMovieIndex = (Math.random()* moviesArray.length -1);
                // random index number from 0 -> len(MovieArray)

                setMovie(moviesArray[Math.floor(randomMovieIndex)]);
                //this line will set the state variable 'movie' to a random movie withing the array of Netflix Original Movie array from the earlier request

                return request;

            }
            fetchData();

        }, []);

        console.log( movie);
        
        function truncate(str, n){
            return str?.length > n? str.substr(0, n-1) + " ... ": str;
            // this will take a string an numeric argument, and will return
            //  - substring of the string with length of the numeric arg passed
            //        followed by ellipses 
            // ex:  "Hello this is the show which is being truncated ... "
        }



        return(
            <header className="page_banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}> 
             { /* this header is the Background Image banner for the page.
               --> css styling done here explicitly. ${movie?} --> '?' will be for debugging/handling if something is wrong with the movie argument
                    -> the url is enclosed in ` ` NOT ' ' .
                        -> ` ` is used wherever ${variable} os used
             */}
            {/* seperate header and div in order to accomodate different css styling*/}
                <div className="page_banner_contents">
                    <h1 className="banner_title">
                        {movie?.title || movie?.name || movie?.original_name}
                        {/* this is same as 'if not found, or if not found' statements */}
                        {/* we need to do this because the api can label the name of the movie with any of the above labels */}
                        {/* this is called 'optional chaining' */}
                        <div className="banner_buttons">
                            <button className="banner_button">Play</button>
                            <button className="banner_button">My List</button>
                        </div>
                        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
                    </h1>
                    {/*title */ }
                    {/* div > 2 buttons */ }
                    {/* description */ }

                </div>
                
                <div className="banner-fadeBottom">
                    {/* empty div with at bottom of the [age banner with gradient css styling */ }
                    {/*  The div is a black gradient, which allows for polished look where the page banner flows into the row components */ }
                        
                </div>
                


            </header>
        )


}
export default Banner