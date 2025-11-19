import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
    list: Movie[],
    onClick: (e: number) => void
}


function MovieGrid({ list, onClick }: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {list.map((movie) => (<li key={movie.id} >
                <div className={css.card} onClick={() => onClick(movie.id)}>
                    <img
                        className={css.image}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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