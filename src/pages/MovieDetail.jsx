import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetail() {
    const { slug } = useParams(); // matches /:slug
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const categories = [1, 2, 3, 4, 5, 7]; // your categories

    useEffect(() => {
        async function fetchMovie() {
            setLoading(true);
            try {
                let foundMovie = null;

                // Search each category until we find the movie
                for (const cat of categories) {
                    const res = await fetch(
                        `https://avdbapi.com/api.php/provide1/vod?ac=detail&t=${cat}`
                    );
                    const data = await res.json();

                    if (data.list) {
                        foundMovie = data.list.find(
                            (m) => m.movie_code?.toLowerCase() === slug.toLowerCase()
                        );
                        if (foundMovie) break;
                    }
                }

                if (foundMovie) {
                    setMovie({
                        title: foundMovie.vod_name || slug,
                        movie_code: foundMovie.movie_code,
                        link_embed:
                            foundMovie.episodes?.server_data?.Full?.link_embed ||
                            `https://upload18.com/play/index/${foundMovie.movie_code}`,
                        description: foundMovie.vod_blurb || "No description available",
                        year: foundMovie.vod_year || "Unknown",
                        actors: Array.isArray(foundMovie.actor) ? foundMovie.actor : [],
                        directors: Array.isArray(foundMovie.director)
                            ? foundMovie.director
                            : [],
                    });
                } else {
                    // fallback if not found
                    setMovie({
                        title: slug,
                        movie_code: slug,
                        link_embed: `https://upload18.com/play/index/${slug}`,
                        actors: [],
                        directors: [],
                        description: "No description available",
                        year: "Unknown",
                    });
                }
            } catch (err) {
                console.error(err);
                setMovie({
                    title: slug,
                    movie_code: slug,
                    link_embed: `https://upload18.com/play/index/${slug}`,
                    actors: [],
                    directors: [],
                    description: "No description available",
                    year: "Unknown",
                });
            } finally {
                setLoading(false);
            }
        }

        if (slug) fetchMovie();
    }, [slug]);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (!movie) return <p className="text-center mt-20">Movie not found.</p>;

    return (
        <div className="px-4 md:px-8 lg:px-16 py-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
                ← Back
            </button>

            <div className="w-full relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                    src={movie.link_embed}
                    className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                    allowFullScreen
                />
            </div>

            <h1 className="mt-4 text-2xl font-bold text-yellow-400">
                {movie.title}{" "}
                <span className="text-gray-400 text-sm">({movie.movie_code})</span>
            </h1>

            <p className="text-gray-300 mt-2">{movie.description}</p>

            {movie.actors.length > 0 && (
                <p className="text-gray-400 mt-1">
                    <strong>Actors:</strong> {movie.actors.join(", ")}
                </p>
            )}

            {movie.directors.length > 0 && (
                <p className="text-gray-400 mt-1">
                    <strong>Directors:</strong> {movie.directors.join(", ")}
                </p>
            )}

            <p className="text-gray-400 mt-1">
                <strong>Year:</strong> {movie.year}
            </p>
        </div>
    );
}
