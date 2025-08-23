import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useMovies, useAllMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // ✅ Always call both hooks
    const { movies: categoryMovies, loading: loadingCategory } = useMovies(
        selectedCategory === "all" ? null : selectedCategory
    );
    const { allMovies, loading: loadingAll } = useAllMovies();

    // ✅ Decide dataset
    const baseMovies = selectedCategory === "all" ? allMovies : categoryMovies;

    // ✅ Apply search
    const filteredMovies = baseMovies.filter(
        (movie) =>
            movie.vod_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.vod_id?.toString().includes(searchQuery.toLowerCase())
    );

    // ✅ Slice to 24 (your preferred)
    const displayedMovies = filteredMovies.slice(0, 24);

    // ✅ Handle loading state
    const loading =
        selectedCategory === "all" ? loadingAll : loadingCategory;

    return (
        <div className="space-y-10">
            {/* 🌟 Header with category + search connected */}
            <Header
                selectedCategory={selectedCategory}
                onCategoryChange={(cat) => setSelectedCategory(cat)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* 🔍 Premium Search Bar */}
            <div className="pt-10">   {/* ⬅ bumped from mt-20 to mt-36 */}
                <div className="max-w-2xl mx-auto px-6 py-6 text-center">
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
                            <FiSearch size={20} />
                        </button>
                    </form>
                </div>
            </div>


            {/* 🎬 Movie Grid */}
            {loading ? (
                <p className="text-center mt-10">Loading...</p>
            ) : displayedMovies.length > 0 ? (
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
            ) : (
                <p className="text-center text-gray-400 mt-6">
                    No results found for{" "}
                    <span className="text-yellow-500">{searchQuery}</span>
                </p>
            )}
        </div>
    );
}

// Helper function (kept for later use if you want pretty labels)
function getCategoryName(category) {
    const categories = {
        1: "Censored",
        2: "Uncensored",
        3: "Uncensored Leaked",
        4: "Amateur",
        5: "Chinese AV",
        7: "English Sub",
    };
    return categories[category] || "All";
}
