import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import FiltersPage from "./pages/FiltersPage";
import { loadFilters, saveFilters, resetFilters } from "./utils/storage";

function App() {
    const [page, setPage] = useState("filters");
    const [filters, setFilters] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await loadFilters();
            setFilters(data);
            setLoaded(true);
        })();
    }, []);

    useEffect(() => {
        if (!loaded) return;

        const t = setTimeout(() => {
            saveFilters(filters);
        }, 400);

        return () => clearTimeout(t);
    }, [filters, loaded]);

    async function handleReset() {
        const data = await resetFilters();
        setFilters(data);
    }

    if (!loaded) {
        return <div className="text-white p-6">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-gray-200 flex justify-center">
            <div className="w-full max-w-2xl p-6">
                <Navbar page={page} setPage={setPage} onReset={handleReset} />

                {page === "filters" && (
                    <FiltersPage filters={filters} setFilters={setFilters} />
                )}
            </div>
        </div>
    );
}

export default App;