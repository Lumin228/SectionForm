import './App.css'
import { useEffect, useState } from 'react';
import { searchMovie } from './searchFunc';
import type { Movie } from './types/movie';
import SearchBar from './components/SearchBar/SearchBar';
import MovieModal from './components/MovieModal/MovieModal';
import MovieGrid from './components/MovieGrid/MovieGrid';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");

  useEffect(() => {
    async function load() {
      const data = await searchMovie(topic);
      setMovies(data.results);
      console.log(data.results);
    }

    load();
  }, [topic]);


  return (
    <>
      <SearchBar onSubmit={setTopic} />
      {movies.length > 0 ? <MovieGrid list={movies} /> : null}
      {modalOpen == true ? <MovieModal /> : null}
    </>
  );
}

export default App;
