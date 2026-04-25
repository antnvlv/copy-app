import { Copy, Pencil, Trash2, Check, X, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function FilterItem({
                        item,
                        isEditing,
                        isConfirming,
                        isLastCopied,
                        startEdit,
                        saveEdit,
                        deleteFilter,
                        handleCopy,
                        setConfirmDeleteId,
                        setEditingId,
                        editName,
                        editText,
                        setEditName,
                        setEditText,
                    }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group flex items-center justify-between p-3 rounded-lg border transition overflow-hidden
            ${
                isLastCopied
                    ? "border-emerald-500 bg-emerald-900/20 ring-1 ring-emerald-500"
                    : "border-slate-700 bg-slate-900 hover:bg-slate-800 hover:border-slate-500"
            }`}
        >
            {isEditing ? (
                <>
                    <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 min-w-0 px-2 py-1 rounded bg-slate-800 border border-slate-600 mr-2"
                    />

                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 min-w-0 px-2 py-1 rounded bg-slate-800 border border-slate-600 mr-2"
                    />

                    <div className="flex gap-2 flex-shrink-0">
                        <button
                            onClick={() => saveEdit(item.id)}
                            className="p-2 rounded bg-green-700 hover:bg-green-600"
                        >
                            <Check size={16} />
                        </button>

                        <button
                            onClick={() => setEditingId(null)}
                            className="p-2 rounded bg-gray-700 hover:bg-gray-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-2 min-w-0 overflow-hidden">

                        <div
                            {...attributes}
                            {...listeners}
                            className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-500 hover:text-white"
                        >
                            <GripVertical size={16} />
                        </div>

                        <span className="font-medium truncate">
                            {item.name}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                        {isConfirming ? (
                            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded">
                                <span className="text-xs text-gray-400">Delete?</span>

                                <button
                                    onClick={() => deleteFilter(item.id)}
                                    className="p-1 rounded bg-red-700 hover:bg-red-600"
                                >
                                    <Check size={14} />
                                </button>

                                <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="p-1 rounded bg-gray-600 hover:bg-gray-500"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-1 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                                <button
                                    onClick={() => startEdit(item)}
                                    className="p-2 rounded hover:bg-slate-700"
                                >
                                    <Pencil size={16} />
                                </button>

                                <button
                                    onClick={() => setConfirmDeleteId(item.id)}
                                    className="p-2 rounded hover:bg-red-700/40"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => handleCopy(item.text, item.id, item.name)}
                            className={`p-2 rounded transition
                            ${
                                isLastCopied
                                    ? "bg-emerald-500"
                                    : "bg-emerald-700 hover:bg-emerald-600"
                            }`}
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default FilterItem;