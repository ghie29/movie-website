import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // install react-icons if not installed

export default function Header({ selectedCategory, onCategoryChange }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const categories = {
        1: "Censored",
        2: "Uncensored",
        3: "Uncensored Leaked",
        4: "Amateur",
        5: "Chinese AV",
        7: "English Sub"
    };

    return (
        <header className="text-white">
            {/* Top Row: Logo + Hamburger / Buttons */}
            <div className="flex items-center justify-between p-5">
                <h1 className="text-2xl font-bold">MYAVWORLD</h1>

                {/* Desktop Buttons */}
                <div className="hidden md:flex space-x-3">
                    {Object.entries(categories).map(([key, name]) => (
                        <button
                            key={key}
                            onClick={() => onCategoryChange(key)}
                            className={`px-4 py-2 rounded whitespace-nowrap ${selectedCategory == key
                                    ? "bg-yellow-500 text-black"
                                    : "bg-gray-700 text-white"
                                }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="flex flex-col space-y-2 px-5 pb-5 md:hidden">
                    {Object.entries(categories).map(([key, name]) => (
                        <button
                            key={key}
                            onClick={() => {
                                onCategoryChange(key);
                                setMenuOpen(false); // close menu after selection
                            }}
                            className={`px-4 py-2 rounded text-left whitespace-nowrap ${selectedCategory == key
                                    ? "text-black"
                                    : "text-white"
                                }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
}
