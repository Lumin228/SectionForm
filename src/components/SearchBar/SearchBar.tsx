import css from './SearchBar.module.css';

interface SearchBarProps {
    onSubmit: (topic: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {

    const handleSubmit = (formData: FormData) => {
        const topic = formData.get('query') as string;
        onSubmit(topic);
    }

    return (
        <header className={css.header}>
            <div className={css.container}>
                <a
                    className={css.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by ME
                </a>
                <form className={css.form} action={handleSubmit}>
                    <input
                        className={css.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={css.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>

    );
}

export default SearchBar;