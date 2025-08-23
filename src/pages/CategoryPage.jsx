import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovies, useAllMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

export default function CategoryPage() {
    const { categoryName, page: pageParam } = useParams();
    const navigate = useNavigate();

    const page = parseInt(pageParam || "1", 10);
    const [searchQuery, setSearchQuery] = useState("");

    const categories = {
        1: { name: "Censored", slug: "Censored" },
        2: { name: "Uncensored", slug: "Uncensored" },
        3: { name: "Uncensored Leaked", slug: "Uncensored-Leaked" }, // 👈 fix: no space
        4: { name: "Amateur", slug: "Amateur" },
        5: { name: "Chinese AV", slug: "Chinese-AV" },               // 👈 also changed
        7: { name: "English Sub", slug: "English-Sub" },             // 👈 also changed
    };

    // 🔹 Find category key by slug
    const categoryKey = Object.keys(categories).find(
        (key) => categories[key].slug === categoryName
    );

    // Fetch movies (with pagination)
    const {
        movies: categoryMovies,
        loading: loadingCategory,
        hasMore,
        pageCount,   // ✅ available from useMovies
    } = useMovies(categoryKey ?? null, page, 25);

    const { allMovies, loading: loadingAll } = useAllMovies(25);

    const baseMovies = categoryKey ? categoryMovies : allMovies;

    // 🔹 Filter movies by search
    const filteredMovies = baseMovies.filter(
        (movie) =>
            movie.vod_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.vod_id?.toString().includes(searchQuery.toLowerCase())
    );

    const loading = categoryKey ? loadingCategory : loadingAll;

    // 🔹 Pagination UI generator
    const renderPagination = () => {
        const pages = [];
        const current = page;
        const last = hasMore ? current + 10 : current; // assume +10 prefetch or replace with API total
        const isMobile = window.innerWidth < 768; // md breakpoint

        let range = isMobile ? 1 : 2; // show fewer neighbors on mobile

        for (let i = 1; i <= last; i++) {
            if (
                i === 1 || // always show first
                i === last || // always show last
                (i >= current - range && i <= current + range) // show neighbors
            ) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => navigate(`/${categoryName}/${i}`)}
                        className={`px-3 py-2 rounded-lg font-semibold transition ${i === current
                                ? "bg-yellow-500 text-black"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {i}
                    </button>
                );
            } else if (
                (i === current - (range + 1) && current - (range + 1) > 1) ||
                (i === current + (range + 1) && i < last)
            ) {
                pages.push(
                    <span key={`dots-${i}`} className="px-2 text-gray-400">
                        …
                    </span>
                );
            }
        }

        return (
            <div className="flex justify-center gap-2 mt-8 flex-wrap">
                {/* Prev Button */}
                <button
                    onClick={() => navigate(`/${categoryName}/${current - 1}`)}
                    disabled={current === 1}
                    className={`px-3 py-2 rounded-lg font-semibold transition ${current === 1
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                >
                    ← Prev
                </button>

                {pages}

                {/* Next Button */}
                <button
                    onClick={() => navigate(`/${categoryName}/${current + 1}`)}
                    disabled={!hasMore}
                    className={`px-3 py-2 rounded-lg font-semibold transition ${!hasMore
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                >
                    Next →
                </button>
            </div>
        );
    };


    return (
        <div className="space-y-10">
            <Header />

            <div className="pt-8">
                {/* Search Bar */}
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
                            🔍
                        </button>
                    </form>
                </div>

                {/* Movie Grid */}
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : filteredMovies.length > 0 ? (
                    <>
                        <section className="p-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2">
                            {filteredMovies.map((movie) => (
                                <MovieCard
                                    key={movie.vod_id ?? movie.id}
                                    movie={{ title: movie.vod_name, poster: movie.vod_pic }}
                                />
                            ))}
                        </section>

                        {/* Pagination */}
                        {renderPagination()}
                    </>
                ) : (
                    <p className="text-center text-gray-400 mt-6">
                        No results found for{" "}
                        <span className="text-yellow-500">{searchQuery}</span>
                    </p>
                )}
            </div>
        </div>
    );
}
