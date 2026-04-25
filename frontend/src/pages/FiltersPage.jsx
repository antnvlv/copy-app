import SearchBar from "../components/SearchBar";
import AddFilterForm from "../components/AddFilterForm";
import FilterItem from "../components/FilterItem";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { useFiltersPage } from "../hooks/useFiltersPage";

function FiltersPage({ filters, setFilters }) {
    const f = useFiltersPage(filters, setFilters);

    return (
        <div className="text-gray-200">

            {f.copied && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-gray-900/90 border border-gray-700 px-3 py-1.5 rounded-md text-sm z-50">
                    Copied: <span className="text-white">{f.copiedName}</span>
                </div>
            )}

            <div className="sticky top-[58px] z-40 bg-slate-950">
                <div className="max-w-2xl mx-auto px-4 py-1">

                    <SearchBar
                        value={f.search}
                        onChange={f.setSearch}
                        onToggleAdd={() => f.setShowForm((v) => !v)}
                        toggleRef={f.toggleRef}
                    />

                    {f.showForm && (
                        <div ref={f.formRef}>
                            <AddFilterForm
                                name={f.name}
                                text={f.text}
                                setName={f.setName}
                                setText={f.setText}
                                addFilter={f.addFilter}
                                close={() => f.setShowForm(false)}
                            />
                        </div>
                    )}
                </div>

                <div className="h-px bg-slate-800" />
            </div>

            <div className="max-w-2xl mx-auto px-4 pb-6 pt-3">

                {f.filtered.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        No filters found
                    </div>
                ) : (
                    <DndContext collisionDetection={closestCenter} onDragEnd={f.handleDragEnd}>
                        <SortableContext
                            items={f.filtered.map((i) => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="flex flex-col gap-2">
                                {f.filtered.map((item) => (
                                    <FilterItem
                                        key={item.id}
                                        item={item}
                                        isEditing={f.editingId === item.id}
                                        isConfirming={f.confirmDeleteId === item.id}
                                        isLastCopied={f.lastCopiedId === item.id}
                                        startEdit={f.startEdit}
                                        saveEdit={f.saveEdit}
                                        deleteFilter={f.deleteFilter}
                                        handleCopy={f.handleCopy}
                                        setConfirmDeleteId={f.setConfirmDeleteId}
                                        setEditingId={f.setEditingId}
                                        editName={f.editName}
                                        editText={f.editText}
                                        setEditName={f.setEditName}
                                        setEditText={f.setEditText}
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