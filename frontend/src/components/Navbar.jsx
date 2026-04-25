import { Pin, PinOff, RotateCcw, Check, X } from "lucide-react";
import { useState } from "react";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";

function Navbar({ page, setPage, onReset }) {
    const [pinned, setPinned] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);

    async function togglePin() {
        try {
            const win = getCurrentWebviewWindow();
            const newValue = !pinned;

            await win.setAlwaysOnTop(newValue);
            setPinned(newValue);
        } catch (e) {
            console.error("Pin error:", e);
        }
    }

    function handleResetConfirm() {
        onReset();
        setConfirmReset(false);
    }

    return (
        <div className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 px-4 py-3">
            <div className="max-w-2xl mx-auto flex justify-between items-center">

                <button
                    onClick={() => setPage("filters")}
                    className={`px-3 py-1 rounded-lg transition ${
                        page === "filters"
                            ? "bg-indigo-600 text-white"
                            : "text-gray-400 hover:bg-slate-800"
                    }`}
                >
                    Filters
                </button>

                <div className="flex items-center gap-2">

                    {confirmReset ? (
                        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded">
                            <span className="text-xs text-gray-400 mr-1">
                                Reset?
                            </span>

                            <button
                                onClick={handleResetConfirm}
                                className="p-1 rounded bg-green-700 hover:bg-green-600"
                            >
                                <Check size={14} />
                            </button>

                            <button
                                onClick={() => setConfirmReset(false)}
                                className="p-1 rounded bg-gray-600 hover:bg-gray-500"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setConfirmReset(true)}
                            className="p-2 rounded-lg text-gray-400 hover:bg-slate-800 hover:text-white transition"
                            title="Reset filters"
                        >
                            <RotateCcw size={18} />
                        </button>
                    )}

                    <button
                        onClick={togglePin}
                        className={`relative p-2 rounded-lg transition-all duration-200 ${
                            pinned
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40 scale-105"
                                : "text-gray-400 hover:bg-slate-800 hover:text-white"
                        }`}
                        title="Always on top"
                    >
                        {pinned ? <Pin size={18} /> : <PinOff size={18} />}

                        {pinned && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        )}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Navbar;