import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import MovieDetail from "./pages/MovieDetail";

function App() {
    return (
        <Router>
            <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center">
                <div className="w-full max-w-full xl:max-w-[80%] flex-grow">
                    <Header />

                    <Routes>
                        {/* Home page */}
                        <Route path="/" element={<Home />} />

                        {/* Dynamic category pages */}
                        <Route path="/:categoryName/:page" element={<CategoryPage />} />
                        <Route path="/:categoryName" element={<CategoryPage />} />

                        {/* Movie detail page (use slug instead of id) */}
                        <Route path="/:slug" element={<MovieDetail />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
