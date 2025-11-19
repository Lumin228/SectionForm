import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';
import { useEffect } from 'react';

interface MovieModalProps {
    onClose: () => void;
    info: Movie;
}


function MovieModal({ onClose, info }: MovieModalProps) {

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);


    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
            <div className={css.modal}>
                <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/w500${info.backdrop_path}`}
                    alt={info.title}
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{info.title}</h2>
                    <p>{info.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {info.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {info.vote_average}
                    </p>
                </div>
            </div>
        </div>, document.body
    );
}

export default MovieModal;  