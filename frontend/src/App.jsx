import Navbar from "./components/Navbar";
import FiltersPage from "./pages/FiltersPage";

function App() {
    return (
        <div className="min-h-screen bg-slate-950 flex justify-center text-gray-200">
            <div className="w-full max-w-2xl p-6">
                <Navbar />
                <FiltersPage />
            </div>
        </div>
    );
}

export default App;