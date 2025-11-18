import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';



function MovieGrid({ list }: { list: Movie[] }) {
    return (
        <ul className={css.grid}>
            {list.map((movie) => (<li key={movie.id}>
                <div className={css.card}>
                    <img
                        className={css.image}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title}
                        loading="lazy"
                    />
                    <h2 className={css.title}>{movie.title}</h2>
                </div>
            </li>))}
            
        </ul>

    );
}

export default MovieGrid;