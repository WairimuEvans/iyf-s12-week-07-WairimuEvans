const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

export function renderTasks(tasks, onToggle, onDelete) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const label = document.createElement("label");
    label.className = "task-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      onToggle(task.id);
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    if (task.completed) {
      taskText.classList.add("completed");
    }

    label.append(checkbox, taskText);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", () => {
      onDelete(task.id);
    });

    listItem.append(label, deleteButton);
    taskList.appendChild(listItem);
  });
}

export function getTaskInput() {
  return taskInput.value.trim();
}

export function clearTaskInput() {
  taskInput.value = "";
  taskInput.focus();
}

export function showMessage(message) {
  emptyMessage.textContent = message;
  emptyMessage.hidden = false;
}
