import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // ✅ Import the footer
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";

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
                    </Routes>
                </div>

                {/* ✅ Premium Footer */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
