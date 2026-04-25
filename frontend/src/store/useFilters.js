import { useEffect, useMemo, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { loadFilters, saveFilters, resetFilters } from "../utils/storage";

export function useFilters() {
    const [filters, setFilters] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const [editName, setEditName] = useState("");
    const [editText, setEditText] = useState("");

    const [copied, setCopied] = useState(false);
    const [copiedName, setCopiedName] = useState("");
    const [lastCopiedId, setLastCopiedId] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [text, setText] = useState("");

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
        }, 300);

        return () => clearTimeout(t);
    }, [filters, loaded]);

    async function handleReset() {
        const data = await resetFilters();
        setFilters(data);
    }

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
        setCopiedName(name);
        setLastCopiedId(id);

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

    return {
        filters,
        filtered,
        loaded,

        search,
        setSearch,

        editingId,
        setEditingId,
        confirmDeleteId,
        setConfirmDeleteId,

        editName,
        setEditName,
        editText,
        setEditText,

        name,
        setName,
        text,
        setText,

        copied,
        copiedName,
        lastCopiedId,

        showForm,
        setShowForm,

        addFilter,
        deleteFilter,
        startEdit,
        saveEdit,
        handleCopy,
        handleDragEnd,
        handleReset,
    };
}