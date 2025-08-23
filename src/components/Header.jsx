import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { categoryName } = useParams();

    // ✅ Slugs instead of spaces
    const categories = {
        1: { name: "Censored", slug: "Censored" },
        2: { name: "Uncensored", slug: "Uncensored" },
        3: { name: "Uncensored Leaked", slug: "Uncensored-Leaked" },
        4: { name: "Amateur", slug: "Amateur" },
        5: { name: "Chinese AV", slug: "Chinese-AV" },
        7: { name: "English Sub", slug: "English-Sub" },
    };

    const handleCategoryClick = (slug) => {
        navigate(`/${slug}`);
        setMenuOpen(false);
    };

    return (
        <header className="text-white fixed top-0 left-0 w-full z-50 
                      bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                      shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between px-6 py-4 max-w-full lg:max-w-[80%] mx-auto">

                {/* Logo */}
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
                    <a href="/"><span className="text-yellow-500">MY</span>AVWORLD</a>
                </h1>

                {/* Desktop Categories */}
                <div className="hidden md:flex space-x-3 items-center">
                    {Object.entries(categories).map(([key, { name, slug }]) => (
                        <button
                            key={key}
                            onClick={() => handleCategoryClick(slug)}
                            className={`px-3 py-2 rounded-lg text-sm md:text-md font-medium transition-all duration-300 ${categoryName === slug
                                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-md"
                                    : "bg-transparent text-white hover:text-yellow-400"
                                }`}
                        >
                            {name}
                        </button>
                    ))}

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
                    {Object.entries(categories).map(([key, { name, slug }]) => (
                        <button
                            key={key}
                            onClick={() => handleCategoryClick(slug)}
                            className={`px-4 py-2 rounded-lg text-left text-sm font-medium transition-all ${categoryName === slug
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
