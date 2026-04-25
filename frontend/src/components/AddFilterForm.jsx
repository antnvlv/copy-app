import { Check, X } from "lucide-react";

function AddFilterForm({ name, text, setName, setText, addFilter, close }) {
    return (
        <div className="flex mb-3 p-3 rounded-lg bg-slate-900 border border-slate-700">

            <input
                className="flex-1 min-w-0 px-3 py-2 rounded bg-slate-800 mr-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="flex-1 min-w-0 px-3 py-2 rounded bg-slate-800 mr-2"
                placeholder="Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex gap-2 flex-shrink-0">
                <button onClick={addFilter} className="p-2 bg-green-700 rounded">
                    <Check size={16} />
                </button>

                <button onClick={close} className="p-2 bg-gray-700 rounded">
                    <X size={16} />
                </button>
            </div>

        </div>
    );
}

export default AddFilterForm;