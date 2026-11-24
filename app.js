import {
    changeFilter,
    changeTheme,
    changeTodoStatus,
    createTodo,
    getState,
    removeTodo,
    subscribe,
} from "./state.js";
import { render, showFeedback } from "./ui.js";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const themeToggle = document.querySelector("#theme-toggle");
const filterNavigation = document.querySelector(".filters");

subscribe(render);
render(getState());

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (!text) {
        showFeedback("Enter a task before adding it.");
        return;
    }
    createTodo(text);
    todoInput.value = "";
    showFeedback("Task added.");
    todoInput.focus();
});

todoList.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (!action) {return;}
    const item = event.target.closest("[data-id]");
    if (!item) {return;}
    const id = Number(item.dataset.id);
    if (action === "delete") {
        removeTodo(id);
        showFeedback("Task deleted.");
    }
});

todoList.addEventListener("change", (event) => {
    if (event.target.dataset.action !== "toggle") {return;}
    const item = event.target.closest("[data-id]");
    if (item) {changeTodoStatus(Number(item.dataset.id));}
});

filterNavigation.addEventListener("click", (event) => {
    const filter = event.target.dataset.filter;
    if (filter) {changeFilter(filter);}
});

themeToggle.addEventListener("click", () => {
    changeTheme(getState().theme === "light" ? "dark" : "light");
});
