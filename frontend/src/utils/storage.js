import { Store } from "@tauri-apps/plugin-store";
import defaultFilters from "../data/defaultFilters.json";

let store;

async function getStore() {
    if (!store) {
        store = await Store.load("filters.json");
    }
    return store;
}

export async function loadFilters() {
    const store = await getStore();

    const data = await store.get("filters");

    if (!data) {
        await store.set("filters", defaultFilters);
        await store.save();
        return defaultFilters;
    }

    return data;
}

export async function saveFilters(filters) {
    const store = await getStore();

    await store.set("filters", filters);
    await store.save();
}

export async function resetFilters() {
    const store = await getStore();

    await store.set("filters", defaultFilters);
    await store.save();

    return defaultFilters;
}