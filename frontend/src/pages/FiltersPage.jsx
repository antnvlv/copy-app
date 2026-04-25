import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import SearchBar from "../components/SearchBar";
import AddFilterForm from "../components/AddFilterForm";
import FilterItem from "../components/FilterItem";

import { useFilters } from "../store/useFilters";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRef } from "react";

function FiltersPage() {
    const store = useFilters();

    const formRef = useRef(null);
    const toggleRef = useRef(null);

    useClickOutside([formRef, toggleRef], () => {
        store.setShowForm(false);
    }, store.showForm);

    return (
        <div className="text-gray-200">

            {store.copied && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-gray-900/90 px-3 py-1.5 rounded-md z-50">
                    Copied: {store.copiedName}
                </div>
            )}

            <div className="sticky top-[58px] z-40 bg-slate-950">
                <div className="max-w-2xl mx-auto px-4 py-1">

                    <SearchBar
                        value={store.search}
                        onChange={store.setSearch}
                        onToggleAdd={() => store.setShowForm(v => !v)}
                        toggleRef={toggleRef}
                    />

                    {store.showForm && (
                        <div ref={formRef}>
                            <AddFilterForm
                                name={store.name}
                                text={store.text}
                                setName={store.setName}
                                setText={store.setText}
                                addFilter={store.addFilter}
                                close={() => store.setShowForm(false)}
                            />
                        </div>
                    )}
                </div>

                <div className="h-px bg-slate-800" />
            </div>

            <div className="max-w-2xl mx-auto px-4 pt-3 pb-6">

                {!store.filtered.length ? (
                    <div className="text-center text-gray-500 py-10">
                        No filters
                    </div>
                ) : (
                    <DndContext onDragEnd={store.handleDragEnd} collisionDetection={closestCenter}>
                        <SortableContext
                            items={store.filtered.map(f => f.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="flex flex-col gap-2">
                                {store.filtered.map(item => (
                                    <FilterItem
                                        key={item.id}
                                        item={item}
                                        isEditing={store.editingId === item.id}
                                        isConfirming={store.confirmDeleteId === item.id}
                                        isLastCopied={store.lastCopiedId === item.id}
                                        startEdit={store.startEdit}
                                        saveEdit={store.saveEdit}
                                        deleteFilter={store.deleteFilter}
                                        handleCopy={store.handleCopy}
                                        setConfirmDeleteId={store.setConfirmDeleteId}
                                        setEditingId={store.setEditingId}
                                        editName={store.editName}
                                        editText={store.editText}
                                        setEditName={store.setEditName}
                                        setEditText={store.setEditText}
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