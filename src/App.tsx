import css from './App.module.css';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { searchMovie } from './searchFunc';
import type { Movie } from './types/movie';
import SearchBar from './components/SearchBar/SearchBar';
import MovieModal from './components/MovieModal/MovieModal';
import MovieGrid from './components/MovieGrid/MovieGrid';
import { useQuery } from '@tanstack/react-query';


function App() {
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>('');
  const [modalInfo, setModalInfo] = useState<Movie | undefined>();
  const [page, setPage] = useState<number>(1);


  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['movies', topic, page],
    queryFn: () => searchMovie({ topic, page }),
    enabled: topic.length > 0
  });




  const openModal = (e: number) => {
    setModalInfo(data.results.find(movie => movie.id === e));
    setModalStatus(true);
  }
  const closeModal = () => {
    setModalStatus(false);
  }




  return (
    <>
      <SearchBar onSubmit={setTopic} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading movies</p>}
      {data && data.results.length > 0 && (<MovieGrid list={data.results} onClick={openModal} />)}
      {data && data.results.length > 0 && (
        <ReactPaginate
        pageCount={data.total_pages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
      )}
      {modalStatus && <MovieModal onClose={closeModal} info={modalInfo} />}
      


    </>
  );
}

export default App;
