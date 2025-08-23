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
        if (!pageCount || pageCount <= 1) return null;

        const current = page;
        const last = pageCount;

        // 🔹 Desktop (your existing sliding window logic)
        const renderDesktopPages = () => {
            const pages = [];
            const maxPagesToShow = 5;

            let start = Math.max(1, current - Math.floor(maxPagesToShow / 2));
            let end = Math.min(last, start + maxPagesToShow - 1);

            if (end - start < maxPagesToShow - 1) {
                start = Math.max(1, end - maxPagesToShow + 1);
            }

            if (start > 1) {
                pages.push(
                    <button
                        key={1}
                        onClick={() => navigate(`/${categoryName}/1`)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${current === 1
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        1
                    </button>
                );
                if (start > 2) {
                    pages.push(<span key="dots-start" className="px-2 text-gray-400">…</span>);
                }
            }

            for (let i = start; i <= end; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => navigate(`/${categoryName}/${i}`)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${i === current
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {i}
                    </button>
                );
            }

            if (end < last) {
                if (end < last - 1) {
                    pages.push(<span key="dots-end" className="px-2 text-gray-400">…</span>);
                }
                pages.push(
                    <button
                        key={last}
                        onClick={() => navigate(`/${categoryName}/${last}`)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${current === last
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {last}
                    </button>
                );
            }

            return pages;
        };

        // 🔹 Mobile (compact: 1–3, current ±1, last 2–3)
        const renderMobilePages = () => {
            const pages = [];

            // First 3 pages
            for (let i = 1; i <= Math.min(3, last); i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => navigate(`/${categoryName}/${i}`)}
                        className={`px-3 py-1 rounded-lg font-semibold transition text-sm ${i === current
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {i}
                    </button>
                );
            }

            // Left dots
            if (current > 5) {
                pages.push(<span key="dots-left" className="px-2 text-gray-400">…</span>);
            }

            // Current -1, current, current +1
            for (let i = Math.max(4, current - 1); i <= Math.min(last - 1, current + 1); i++) {
                if (i > 3 && i < last) {
                    pages.push(
                        <button
                            key={i}
                            onClick={() => navigate(`/${categoryName}/${i}`)}
                            className={`px-3 py-1 rounded-lg font-semibold transition text-sm ${i === current
                                ? "bg-yellow-500 text-black"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            {i}
                        </button>
                    );
                }
            }

            // Right dots
            if (current < last - 3) {
                pages.push(<span key="dots-right" className="px-2 text-gray-400">…</span>);
            }

            // Last page only
            if (last > 3) {
                pages.push(
                    <button
                        key={last}
                        onClick={() => navigate(`/${categoryName}/${last}`)}
                        className={`px-3 py-1 rounded-lg font-semibold transition text-sm ${current === last
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {last}
                    </button>
                );
            }

            return pages;
        };


        return (
            <div className="mt-8 space-y-4">
                {/* Desktop */}
                <div className="hidden md:flex justify-center gap-2 flex-wrap">
                    <button
                        onClick={() => navigate(`/${categoryName}/${current - 1}`)}
                        disabled={current === 1}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${current === 1
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        ← Prev
                    </button>

                    {renderDesktopPages()}

                    <button
                        onClick={() => navigate(`/${categoryName}/${current + 1}`)}
                        disabled={current === last}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${current === last
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        Next →
                    </button>
                </div>

                {/* Mobile */}
                <div className="flex md:hidden justify-center gap-1 flex-wrap text-sm">
                    <button
                        onClick={() => navigate(`/${categoryName}/${current - 1}`)}
                        disabled={current === 1}
                        className={`px-2 py-1 rounded-lg font-semibold transition ${current === 1
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        ← Prev
                    </button>

                    {renderMobilePages()}

                    <button
                        onClick={() => navigate(`/${categoryName}/${current + 1}`)}
                        disabled={current === last}
                        className={`px-2 py-1 rounded-lg font-semibold transition ${current === last
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        Next →
                    </button>
                </div>
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
