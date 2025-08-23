import { useState, useEffect } from "react";

// 🔹 Helper function: fetch movies with pagination
async function fetchMoviesByCategory(category = 1, page = 1, pageSize = 24) {
    const res = await fetch(
        `https://avdbapi.com/api.php/provide1/vod?ac=detail&t=${category}&pg=${page}&pagesize=${pageSize}`
    );
    const data = await res.json();

    return {
        movies: data.list || [],
        hasMore: data.page < data.pagecount, // true if more pages exist
        pageCount: data.pagecount || 1,      // total available pages
        currentPage: data.page || page,      // current page (API may return it)
    };
}

// 🔹 Hook: Single category movies (with pagination + prefetch)
export function useMovies(category = 1, page = 1, pageSize = 24) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        fetchMoviesByCategory(category, page, pageSize)
            .then(({ movies, hasMore, pageCount }) => {
                if (!cancelled) {
                    setMovies(movies);
                    setHasMore(hasMore);
                    setPageCount(pageCount);

                    // 🔹 Prefetch next page in background
                    if (hasMore) {
                        fetchMoviesByCategory(category, page + 1, pageSize).catch(() => { });
                    }
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    console.error(err);
                    setMovies([]);
                    setHasMore(false);
                    setPageCount(1);
                }
            })
            .finally(() => !cancelled && setLoading(false));

        return () => {
            cancelled = true;
        };
    }, [category, page, pageSize]);

    return { movies, loading, hasMore, pageCount };
}

// 🔹 Hook: All categories combined (first page only for each category)
export function useAllMovies(pageSize = 24) {
    const categories = [1, 2, 3, 4, 5, 7];
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function fetchAll() {
            setLoading(true);
            try {
                const results = await Promise.all(
                    categories.map((cat) => fetchMoviesByCategory(cat, 1, pageSize))
                );

                if (!cancelled) {
                    setAllMovies(results.map((r) => r.movies).flat());
                }
            } catch (err) {
                if (!cancelled) {
                    console.error(err);
                    setAllMovies([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchAll();
        return () => {
            cancelled = true;
        };
    }, [pageSize]);

    return { allMovies, loading };
}
