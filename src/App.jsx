import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
    const [category, setCategory] = useState(1);

    return (
        <div className="bg-gray-900 min-h-screen text-white flex justify-center">
            {/* Container with max width 85% */}
            <div className="w-full max-w-full xl:max-w-[100%]">
                <Header selectedCategory={category} onCategoryChange={setCategory} />
                <Home category={category} />
            </div>
        </div>
    );
}

export default App;
