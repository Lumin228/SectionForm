import './App.css'
import { useEffect, useState } from 'react';
import { searchMovie } from './searchFunc';
import type { Movie } from './types/movie';
import SearchBar from './components/SearchBar/SearchBar';
import MovieModal from './components/MovieModal/MovieModal';
import MovieGrid from './components/MovieGrid/MovieGrid';


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [modalInfo, setModalInfo] = useState<Movie>();
  const [page, setPage] = useState<number>(1);

  const openModal = (e: number) => {
    setModalInfo(movies.find(movie => movie.id === e));
    setModalStatus(true);
  }
  const closeModal = () => {
    setModalStatus(false);
  }

  useEffect(() => {
    async function load() {
      const data = await searchMovie(topic, page);
      setMovies(data.results);
      console.log(data.results);
    }

    load();
  }, [topic]);




  return (
    <>
      <SearchBar onSubmit={setTopic} />
      {movies.length > 0 ? <MovieGrid list={movies} onClick={openModal} /> : null}
      {modalStatus && <MovieModal onClose={closeModal} info={modalInfo} />}
    </>
  );
}

export default App;
