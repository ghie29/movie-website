import { useState, useEffect } from "react";

// 🔹 Helper function (shared by both hooks)
async function fetchMoviesByCategory(category = 1) {
  const res = await fetch(
    `https://avdbapi.com/api.php/provide1/vod?ac=detail&t=${category}`
  );
  const data = await res.json();
  return data.list || [];
}

// 🔹 Hook: Single category movies
export function useMovies(category = 1) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMoviesByCategory(category)
      .then(setMovies)
      .catch((err) => {
        console.error(err);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return { movies, loading };
}

// 🔹 Hook: All categories combined
export function useAllMovies() {
  const categories = [1, 2, 3, 4, 5, 7];
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const results = await Promise.all(
          categories.map((cat) => fetchMoviesByCategory(cat))
        );
        setAllMovies(results.flat());
      } catch (err) {
        console.error(err);
        setAllMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { allMovies, loading };
}
