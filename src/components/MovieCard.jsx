import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    // Always use slug from movie_code, fallback to vod_remarks if missing
    const slug = (movie.slug || movie.vod_remarks || movie.vod_id)
        .toString()
        .toLowerCase();

    return (
        <Link to={`/${slug}`}>
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
                <img
                    src={movie.vod_pic}
                    alt={movie.vod_name}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = import.meta.env.VITE_POSTER_FALLBACK;
                    }}
                />
                <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-gray-200 truncate">
                        {movie.vod_name}
                    </h3>
                </div>
            </div>
        </Link>
    );
}
