import { CirclePlus, X } from "lucide-react";

function SearchBar({ value, onChange, onToggleAdd, toggleRef }) {
    return (
        <div className="flex gap-2 py-3">
            <div className="relative flex-1">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2 pr-10 rounded-lg border border-slate-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {value && (
                    <button
                        onClick={() => onChange("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-700"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <button
                ref={toggleRef}
                onClick={onToggleAdd}
                className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
            >
                <CirclePlus size={20} />
            </button>
        </div>
    );
}

export default SearchBar;