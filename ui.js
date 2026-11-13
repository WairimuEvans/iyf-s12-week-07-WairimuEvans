import { countActiveTodos, filterTodos } from "./todo-logic.js";

const todoList = document.querySelector("#todo-list");
const todoCount = document.querySelector("#todo-count");
const todoFeedback = document.querySelector("#todo-feedback");
const filterButtons = document.querySelectorAll("[data-filter]");

export function render(state) {
    const { todos, filter, theme } = state;

    // Apply the selected theme.
    document.documentElement.dataset.theme = theme;

    // Update the active filter button.
    filterButtons.forEach((button) => {
        button.setAttribute(
            "aria-pressed",
            String(button.dataset.filter === filter)
        );
    });

    // Display only tasks matching the selected filter.
    const visibleTodos = filterTodos(todos, filter);

    todoList.replaceChildren();

    if (visibleTodos.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent =
            filter === "completed"
                ? "No completed tasks."
                : filter === "active"
                    ? "No active tasks."
                    : "No tasks yet. Add your first task!";
        todoList.append(emptyMessage);
    }

    visibleTodos.forEach((todo) => {
        const item = document.createElement("li");
        item.className = "todo-item";
        item.dataset.id = todo.id;

        if (todo.completed) {
            item.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.dataset.action = "toggle";
        checkbox.setAttribute(
            "aria-label",
            `Mark ${todo.text} as ${todo.completed ? "active" : "completed"}`
        );

        const taskText = document.createElement("span");
        taskText.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.dataset.action = "delete";
        deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);

        item.append(checkbox, taskText, deleteButton);
        todoList.append(item);
    });

    // Update the remaining task count.
    const remainingTasks = countActiveTodos(todos);
    todoCount.textContent =
        `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"} remaining`;
}

export function showFeedback(message) {
    todoFeedback.textContent = message;
}
