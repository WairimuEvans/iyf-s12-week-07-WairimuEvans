import { getFromStorage, saveToStorage } from "./storage.js";
import { addTodo, deleteTodo, toggleTodo } from "./todo-logic.js";

const TODOS_KEY = "week7_todos";
const FILTER_KEY = "week7_filter";
const THEME_KEY = "week7_theme";

function loadTodos() {
    const savedTodos = getFromStorage(TODOS_KEY, []);

    if (!Array.isArray(savedTodos)) {return [];}

    return savedTodos.filter((todo) => {
        return (
            todo &&
            Number.isFinite(todo.id) &&
            typeof todo.text === "string" &&
            typeof todo.completed === "boolean"
        );
    });
}

function loadFilter() {
    const savedFilter = getFromStorage(FILTER_KEY, "all");
    const allowedFilters = ["all", "active", "completed"];

    return allowedFilters.includes(savedFilter) ? savedFilter : "all";
}

function loadTheme() {
    const savedTheme = getFromStorage(THEME_KEY, "light");

    return savedTheme === "dark" ? "dark" : "light";
}

const state = {
    todos: loadTodos(),
    filter: loadFilter(),
    theme: loadTheme()
};

const listeners = new Set();

function publish() {
    saveToStorage(TODOS_KEY, state.todos);
    saveToStorage(FILTER_KEY, state.filter);
    saveToStorage(THEME_KEY, state.theme);

    listeners.forEach((listener) => {
        listener(getState());
    });
}

export function getState() {
    return {
        todos: state.todos.map((todo) => ({ ...todo })),
        filter: state.filter,
        theme: state.theme
    };
}

export function subscribe(listener) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function createTodo(text) {
    if (typeof text !== "string" || !text.trim()) {return;}

    state.todos = addTodo(state.todos, text);
    publish();
}

export function changeTodoStatus(id) {
    state.todos = toggleTodo(state.todos, id);
    publish();
}

export function removeTodo(id) {
    state.todos = deleteTodo(state.todos, id);
    publish();
}

export function changeFilter(filter) {
    const allowedFilters = ["all", "active", "completed"];

    if (!allowedFilters.includes(filter)) {return;}

    state.filter = filter;
    publish();
}

export function changeTheme(theme) {
    state.theme = theme === "dark" ? "dark" : "light";
    publish();
}
