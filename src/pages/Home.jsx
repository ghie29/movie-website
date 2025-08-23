import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";


export default function Home({ category }) {
    const { movies, loading } = useMovies(category);
    const displayedMovies = movies.slice(0, 30);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    // Take top 5 movies for the hero slider
    const featuredMovies = displayedMovies.slice(0, 5);

    return (
        <div className="space-y-10">
            {/* Movie Grid */}
            <section className="p-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {displayedMovies.map((movie) => (
                    <MovieCard
                        key={movie.vod_id || movie.id}
                        movie={{
                            title: movie.vod_name,
                            poster: movie.vod_pic,
                        }}
                    />
                ))}
            </section>
        </div>
    );
}

// Helper function for category names
function getCategoryName(category) {
    const categories = {
        1: "Censored",
        2: "Uncensored",
        3: "Uncensored Leaked",
        4: "Amateur",
        5: "Chinese AV",
        7: "English Sub",
    };
    return categories[category] || "Unknown";
}
