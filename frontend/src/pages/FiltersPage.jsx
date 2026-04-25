import { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import AddFilterForm from "../components/AddFilterForm";
import FilterItem from "../components/FilterItem";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function FiltersPage({ filters, setFilters }) {
    const [editingId, setEditingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const [editName, setEditName] = useState("");
    const [editText, setEditText] = useState("");

    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const [search, setSearch] = useState("");
    const [copied, setCopied] = useState(false);
    const [copiedName, setCopiedName] = useState("");
    const [lastCopiedId, setLastCopiedId] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const formRef = useRef(null);
    const toggleRef = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (!showForm) return;

            if (
                formRef.current?.contains(e.target) ||
                toggleRef.current?.contains(e.target)
            ) return;

            setShowForm(false);
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [showForm]);

    function addFilter() {
        if (!name.trim() || !text.trim()) return;

        setFilters((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                name: name.trim(),
                text: text.trim(),
            },
        ]);

        setName("");
        setText("");
    }

    function deleteFilter(id) {
        setFilters((prev) => prev.filter((f) => f.id !== id));
        setConfirmDeleteId(null);
    }

    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditText(item.text);
    }

    function saveEdit(id) {
        setFilters((prev) =>
            prev.map((f) =>
                f.id === id
                    ? { ...f, name: editName.trim(), text: editText.trim() }
                    : f
            )
        );

        setEditingId(null);
    }

    function handleCopy(text, id, name) {
        navigator.clipboard.writeText(text);

        setCopied(true);
        setLastCopiedId(id);
        setCopiedName(name);

        setTimeout(() => setCopied(false), 1200);
    }

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return filters.filter((f) =>
            f.name.toLowerCase().includes(q)
        );
    }, [filters, search]);

    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setFilters((items) => {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);

            return arrayMove(items, oldIndex, newIndex);
        });
    }

    return (
        <div className="text-gray-200">

            {copied && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-gray-900/90 border border-gray-700 px-3 py-1.5 rounded-md text-sm z-50">
                    Copied: <span className="text-white">{copiedName}</span>
                </div>
            )}

            <div className="sticky top-[58px] z-40 bg-slate-950">
                <div className="max-w-2xl mx-auto px-4 py-1">

                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        onToggleAdd={() => setShowForm((v) => !v)}
                        toggleRef={toggleRef}
                    />

                    {showForm && (
                        <div ref={formRef}>
                            <AddFilterForm
                                name={name}
                                text={text}
                                setName={setName}
                                setText={setText}
                                addFilter={addFilter}
                                close={() => setShowForm(false)}
                            />
                        </div>
                    )}
                </div>

                <div className="h-px bg-slate-800" />
            </div>

            <div className="max-w-2xl mx-auto px-4 pb-6 pt-3">

                {filtered.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        No filters found
                    </div>
                ) : (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={filtered.map((f) => f.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="flex flex-col gap-2">
                                {filtered.map((item) => (
                                    <FilterItem
                                        key={item.id}
                                        item={item}
                                        isEditing={editingId === item.id}
                                        isConfirming={confirmDeleteId === item.id}
                                        isLastCopied={lastCopiedId === item.id}
                                        startEdit={startEdit}
                                        saveEdit={saveEdit}
                                        deleteFilter={deleteFilter}
                                        handleCopy={handleCopy}
                                        setConfirmDeleteId={setConfirmDeleteId}
                                        setEditingId={setEditingId}
                                        editName={editName}
                                        editText={editText}
                                        setEditName={setEditName}
                                        setEditText={setEditText}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
}

export default FiltersPage;