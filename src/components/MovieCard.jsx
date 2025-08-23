export default function MovieCard({ movie }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Movie Poster with fixed 16:9 aspect ratio */}
            <div className="w-full relative" style={{ paddingTop: '56.25%' }}>
                <img
                    src={movie.poster}
                    alt={movie.title}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>

            {/* Movie Title */}
            <div className="p-3">
                <h3 className="text-left text-sm font-semibold text-white line-clamp-2">
                    {movie.title}
                </h3>
            </div>
        </div>
    );
}
