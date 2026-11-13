import { getFromStorage, saveToStorage } from "./storage.js";
import { addTodo, deleteTodo, toggleTodo } from "./todo-logic.js";

const TODOS_KEY = "week7_todos";
const FILTER_KEY = "week7_filter";
const THEME_KEY = "week7_theme";

const state = {
    todos: getFromStorage(TODOS_KEY, []),
    filter: getFromStorage(FILTER_KEY, "all"),
    theme: getFromStorage(THEME_KEY, "light"),
};

const listeners = new Set();

function publish() {
    saveToStorage(TODOS_KEY, state.todos);
    saveToStorage(FILTER_KEY, state.filter);
    saveToStorage(THEME_KEY, state.theme);
    listeners.forEach((listener) => listener(getState()));
}

export function getState() {
    return {
        todos: [...state.todos],
        filter: state.filter,
        theme: state.theme,
    };
}

export function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function createTodo(text) {
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
    if (!allowedFilters.includes(filter)) return;
    state.filter = filter;
    publish();
}

export function changeTheme(theme) {
    state.theme = theme === "dark" ? "dark" : "light";
    publish();
}
