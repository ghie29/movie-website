import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetail() {
    const { slugAndCategory } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    // URL format: id-typeName
    const [id, category] = slugAndCategory.split("-");

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(
                    `https://avdbapi.com/api.php/provide/vod?ac=detail&ids=${id}`
                );
                const data = await res.json();
                setMovie(data.list?.[0] || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchMovie();
    }, [id]);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (!movie) return <p className="text-center mt-20">Movie not found.</p>;

    // Extract video link
    const videoUrl = movie.episodes?.server_data?.Full?.link_embed;

    return (
        <div className="px-4 md:px-8 lg:px-16 py-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
                ← Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Poster */}
                <div className="col-span-1">
                    <img
                        src={movie.poster_url}
                        alt={movie.name}
                        className="rounded-xl shadow-lg w-full object-cover"
                    />
                </div>

                {/* Details */}
                <div className="col-span-2 space-y-4">
                    <h1 className="text-2xl md:text-4xl font-bold text-yellow-400">
                        {movie.name}
                    </h1>
                    <p className="text-gray-300">{movie.description || "No description."}</p>

                    <div className="text-sm text-gray-400 space-y-1">
                        <p><span className="text-yellow-500">Code:</span> {movie.movie_code}</p>
                        <p><span className="text-yellow-500">Type:</span> {movie.type_name}</p>
                        <p><span className="text-yellow-500">Year:</span> {movie.year}</p>
                        <p><span className="text-yellow-500">Actors:</span> {movie.actor?.join(", ")}</p>
                        <p><span className="text-yellow-500">Director:</span> {movie.director?.join(", ")}</p>
                    </div>

                    {/* Player */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Player</h2>
                        {videoUrl ? (
                            <iframe
                                src={videoUrl}
                                className="w-full h-[400px] rounded-xl shadow-lg"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <p className="text-gray-400">No video available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
