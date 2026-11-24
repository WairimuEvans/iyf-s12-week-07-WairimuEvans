import { afterEach, describe, expect, it, vi } from "vitest";
import {
    getFromStorage,
    removeFromStorage,
    saveToStorage,
} from "./storage.js";

function createStorageMock(initialEntries = {}) {
    const values = new Map(Object.entries(initialEntries));

    return {
        getItem: vi.fn((key) => values.get(key) ?? null),
        setItem: vi.fn((key, value) => values.set(key, String(value))),
        removeItem: vi.fn((key) => values.delete(key)),
    };
}

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("storage helpers", () => {
    it("saves values as JSON", () => {
        const storage = createStorageMock();
        vi.stubGlobal("localStorage", storage);

        expect(saveToStorage("tasks", [{ id: 1 }])).toBe(true);
        expect(storage.setItem).toHaveBeenCalledWith(
            "tasks",
            '[{"id":1}]'
        );
    });

    it("returns the fallback when a key is missing", () => {
        vi.stubGlobal("localStorage", createStorageMock());

        expect(getFromStorage("missing", [])).toEqual([]);
    });

    it("parses stored JSON", () => {
        vi.stubGlobal(
            "localStorage",
            createStorageMock({ tasks: '[{"id":1}]' })
        );

        expect(getFromStorage("tasks", [])).toEqual([{ id: 1 }]);
    });

    it("returns the fallback when stored JSON is malformed", () => {
        vi.stubGlobal(
            "localStorage",
            createStorageMock({ tasks: "{invalid" })
        );
        vi.spyOn(console, "warn").mockImplementation(() => {});

        expect(getFromStorage("tasks", [])).toEqual([]);
    });

    it("removes a stored value", () => {
        const storage = createStorageMock({ tasks: "[]" });
        vi.stubGlobal("localStorage", storage);

        expect(removeFromStorage("tasks")).toBe(true);
        expect(storage.removeItem).toHaveBeenCalledWith("tasks");
    });

    it("returns false when storage is unavailable", () => {
        vi.stubGlobal("localStorage", {
            removeItem() {
                throw new Error("Storage unavailable");
            },
        });
        vi.spyOn(console, "error").mockImplementation(() => {});

        expect(removeFromStorage("tasks")).toBe(false);
    });
});
