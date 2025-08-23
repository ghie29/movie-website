import { useNavigate } from "react-router-dom";

export default function CategorySelector({ selected }) {
    const navigate = useNavigate();

    const categories = {
        1: "Censored",
        2: "Uncensored",
        3: "Uncensored Leaked",
        4: "Amateur",
        5: "Chinese AV",
        7: "English Sub"
    };

    return (
        <div className="flex space-x-3 p-5 overflow-x-auto">
            {Object.entries(categories).map(([key, name]) => (
                <button
                    key={key}
                    onClick={() => navigate(`/${encodeURIComponent(name)}`)}
                    className={`px-4 py-2 rounded ${selected == key
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-700 text-white"
                        }`}
                >
                    {name}
                </button>
            ))}
        </div>
    );
}
