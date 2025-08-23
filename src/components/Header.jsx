import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

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

                    {/* 🔍 Search Bar (desktop only) */}
                    <div className="hidden md:flex items-center bg-gray-800 rounded-full overflow-hidden ml-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search by title or code..."
                            className="px-3 py-2 bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none"
                        />
                        <FiSearch className="mx-3 text-yellow-500" />
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
                    {/* Search (mobile) */}
                    <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search..."
                            className="flex-1 px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        />
                        <FiSearch className="mx-3 text-yellow-500" />
                    </div>

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
