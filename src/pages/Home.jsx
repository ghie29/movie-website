import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";

export default function Home({ category }) {
    const { movies, loading } = useMovies(category);
    const [searchQuery, setSearchQuery] = useState(""); // ✅ Added search state
    const displayedMovies = movies.slice(0, 24);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            alert(`Searching for: ${searchQuery}`);
            // 🚀 Replace with your real search logic
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    // Take top 5 movies for hero/featured slider if needed
    const featuredMovies = displayedMovies.slice(0, 5);

    return (
        <div className="space-y-10">
            {/* 🔍 Premium Search Bar */}
            <div className="mt-20">
                <div className="max-w-2xl mx-auto px-6 py-6 text-center">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 tracking-wide">
                        Search any <span className="text-yellow-500">Japan AV</span>
                    </h2>
                    <form
                        onSubmit={handleSearch}
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
                            <FiSearch size={20} />
                        </button>
                    </form>
                </div>
            </div>

            {/* 🎬 Movie Grid */}
            <section className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 mt-6">
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
