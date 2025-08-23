import { useState, useEffect } from "react";

export default function useMovies(category = 1) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://avdbapi.com/api.php/provide1/vod?ac=detail&t=${category}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.list || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [category]);

    return { movies, loading };
}
