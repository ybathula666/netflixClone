import './App.css';
import Row from './Row';
import requests from './requests';
import React from 'react';
import Banner from './Banner'
import Nav  from './Nav';

function App() {
  return (
    <div className="App">
      {/* Nav Bar */}
      {/* Banner */}
     <Nav /> 
      <Banner />
     <h1 className= "logoHeader" ></h1>
     <Row title="NETFLIX Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow ={true}/> 
     <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow ={false}/> 
     <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/> 
     <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/> 
  <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/> 
  <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
  <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/> 
  <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
   
   
   
   
    
    </div>
  );
}

export default App;
