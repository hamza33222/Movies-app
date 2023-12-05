import {useEffect, useState}from 'react';
import './App.css';
import MovieCard from './MovieCard';
import searchIcoon from './search.svg';

// 316cd3cf
const API_URL = 'http://www.omdbapi.com?apikey=316cd3cf';
const movie1 = {
  "Title": "Amzaing Spiderman Syndrome" ,
  "Year" : "2012" ,
  "imbdID" : "tt2586634",
  "Type" :"movie",
  "Poster" : "N/A"
}
const App =() =>{
  //create a new state
  const [movies,setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`); //this will call our api
    const data = await response.json();

    setMovies(data.Search);
    }
  useEffect(()=>{
    searchMovies('spiderman');
    
  },[]);//we kept those sq brackets empty because we want this hook to run only one
    return (
        <div className='app'>
          <h1>Movie Gallery</h1>
          <div className='search'>
            <input 
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            />
            <img 
              src={searchIcoon}
              alt='search'
              onClick = {()=>searchMovies(searchTerm)}
              />
          </div>
          {
            movies?.length > 0
            ? (
              <div className='container'>
             {movies.map((movie)=>(
              <MovieCard movie={movie} />
             ))}
          </div>
            ):(
              <div className='empty'>
                <h2>No Movies found</h2>
                </div>
            )
          }
          
        </div>
    );
}
export default App;