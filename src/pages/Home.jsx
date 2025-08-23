import { useState } from "react";
import { useMovies, useAllMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    // categories now include both name + slug
    const categories = {
        1: { name: "Censored", slug: "Censored" },
        2: { name: "Uncensored", slug: "Uncensored" },
        3: { name: "Uncensored Leaked", slug: "Uncensored-Leaked" },
        4: { name: "Amateur", slug: "Amateur" },
        5: { name: "Chinese AV", slug: "Chinese-AV" },
        7: { name: "English Sub", slug: "English-Sub" },
    };

    // fetch all movies (only needed if searching)
    const { allMovies = [], loading: loadingAll } = useAllMovies();

    // filter globally if search is active
    const globalFiltered = allMovies.filter(
        (movie) =>
            movie.vod_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.vod_id?.toString().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Fixed Header */}
            <Header />

            <div className="pt-8 px-6">
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto py-6 text-center">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 tracking-wide">
                        Search any <span className="text-yellow-500">Japan AV</span>
                    </h2>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex items-center bg-gray-800 rounded-full shadow-lg overflow-hidden"
                    >
                        <input
                            type="text"
                            placeholder="Type keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 font-semibold hover:opacity-90 transition"
                        >
                            🔍
                        </button>
                    </form>
                </div>

                {/* If searching: show global results */}
                {searchQuery ? (
                    <div className="mb-10">
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-500 mb-3">
                            Search Results
                        </h3>
                        {loadingAll ? (
                            <p>Loading...</p>
                        ) : globalFiltered.length > 0 ? (
                            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {globalFiltered.slice(0, 24).map((movie) => (
                                    <MovieCard
                                        key={movie.vod_id ?? movie.id}
                                        movie={{ title: movie.vod_name, poster: movie.vod_pic }}
                                    />
                                ))}
                            </section>
                        ) : (
                            <p className="text-gray-400">No results found</p>
                        )}
                    </div>
                ) : (
                    // Otherwise: show per-category previews
                    Object.entries(categories).map(([key, { name, slug }]) => {
                        const { movies = [], loading } = useMovies(key);
                        const displayedMovies = movies.slice(0, 4);

                        return (
                            <div key={key} className="mb-10">
                                {/* Category Header */}
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg md:text-xl font-semibold text-yellow-500">
                                        <Link to={`/${slug}`} className="hover:text-yellow-400 transition">
                                            {name}
                                        </Link>
                                    </h3>
                                    <Link
                                        to={`/${slug}`}
                                        className="text-sm text-gray-300 hover:text-yellow-400 transition"
                                    >
                                        View All →
                                    </Link>
                                </div>

                                {/* Movie Cards */}
                                {loading ? (
                                    <p>Loading...</p>
                                ) : displayedMovies.length > 0 ? (
                                    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {displayedMovies.map((movie) => (
                                            <MovieCard
                                                key={movie.vod_id ?? movie.id}
                                                movie={{ title: movie.vod_name, poster: movie.vod_pic }}
                                            />
                                        ))}
                                    </section>
                                ) : (
                                    <p className="text-gray-400">No results found</p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
