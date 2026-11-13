import { describe, expect, it } from "vitest";
import {
    addTodo,
    countActiveTodos,
    deleteTodo,
    filterTodos,
    toggleTodo,
} from "./todo-logic.js";

const sampleTodos = [
    { id: 1, text: "Read", completed: false },
    { id: 2, text: "Code", completed: true },
];

describe("addTodo", () => {
    it("adds a trimmed task without changing the original array", () => {
        const original = [...sampleTodos];
        const result = addTodo(original, "  Learn JavaScript  ", 3, "2026-11-13T00:00:00.000Z");
        expect(result).toHaveLength(3);
        expect(result[2].text).toBe("Learn JavaScript");
        expect(original).toEqual(sampleTodos);
        expect(result).not.toBe(original);
    });

    it("does not add empty text", () => {
        expect(addTodo(sampleTodos, "   ")).toEqual(sampleTodos);
    });
});

describe("toggleTodo", () => {
    it("toggles the matching task", () => {
        expect(toggleTodo(sampleTodos, 1)[0].completed).toBe(true);
    });

    it("leaves the list unchanged when the id does not exist", () => {
        expect(toggleTodo(sampleTodos, 99)).toEqual(sampleTodos);
    });
});

describe("deleteTodo", () => {
    it("removes a matching task", () => {
        expect(deleteTodo(sampleTodos, 1)).toEqual([sampleTodos[1]]);
    });

    it("handles an empty list", () => {
        expect(deleteTodo([], 1)).toEqual([]);
    });
});

describe("filterTodos and countActiveTodos", () => {
    it("returns active and completed tasks separately", () => {
        expect(filterTodos(sampleTodos, "active")).toEqual([sampleTodos[0]]);
        expect(filterTodos(sampleTodos, "completed")).toEqual([sampleTodos[1]]);
    });

    it("counts active tasks", () => {
        expect(countActiveTodos(sampleTodos)).toBe(1);
    });
});
