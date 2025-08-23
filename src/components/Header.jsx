import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function Header({
    selectedCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange
}) {
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
        <header className="text-white fixed top-0 left-0 w-full z-50 
                      bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                      shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between px-6 py-4 max-w-full lg:max-w-[80%] mx-auto">

                {/* Logo */}
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
                    <span className="text-yellow-500">MY</span>AVWORLD
                </h1>

                {/* Desktop Categories */}
                <div className="hidden md:flex space-x-3 items-center">
                    {Object.entries(categories).map(([key, name]) => (
                        <button
                            key={key}
                            onClick={() => onCategoryChange(key)}
                            className={`px-3 py-2 rounded-lg text-sm md:text-md font-medium transition-all duration-300 ${selectedCategory == key
                                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-md"
                                    : "bg-transparent text-white hover:text-yellow-400"
                                }`}
                        >
                            {name}
                        </button>
                    ))}

                    {/* Avatar */}
                    <div className="mx-2 text-yellow-500">
                        <FaUserCircle size={28} />
                    </div>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded-md hover:bg-gray-700/40 transition"
                    >
                        {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-900/95 shadow-inner 
                        px-6 pb-6 flex flex-col space-y-3 animate-slide-down">

                    {/* Categories (mobile) */}
                    {Object.entries(categories).map(([key, name]) => (
                        <button
                            key={key}
                            onClick={() => {
                                onCategoryChange(key);
                                setMenuOpen(false);
                            }}
                            className={`px-4 py-2 rounded-lg text-left text-sm font-medium transition-all ${selectedCategory == key
                                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-md"
                                    : "bg-transparent text-white hover:text-yellow-400"
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
