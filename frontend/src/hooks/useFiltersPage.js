import { useEffect, useMemo, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export function useFiltersPage(filters, setFilters) {
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

    // outside click
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

    return {
        // state
        editingId,
        confirmDeleteId,
        editName,
        editText,
        name,
        text,
        search,
        copied,
        copiedName,
        lastCopiedId,
        showForm,

        // refs
        formRef,
        toggleRef,

        // setters
        setEditName,
        setEditText,
        setName,
        setText,
        setSearch,
        setShowForm,
        setEditingId,
        setConfirmDeleteId,

        // actions
        addFilter,
        deleteFilter,
        startEdit,
        saveEdit,
        handleCopy,
        handleDragEnd,

        // derived
        filtered,
    };
}