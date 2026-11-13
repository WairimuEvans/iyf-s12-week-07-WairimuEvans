const NOTES_KEY = "week7_notes";

const form = document.querySelector("#note-form");
const input = document.querySelector("#note-text");
const list = document.querySelector("#notes-list");

const status = document.createElement("p");
status.setAttribute("role", "status");
form.after(status);

function readNotes() {
    try {
        const savedNotes = JSON.parse(
            localStorage.getItem(NOTES_KEY) ?? "[]"
        );

        return Array.isArray(savedNotes)
            ? savedNotes.filter((note) => typeof note === "string")
            : [];
    } catch (error) {
        console.error("Unable to read notes:", error);
        status.textContent = "Unable to load saved notes.";
        return [];
    }
}

let notes = readNotes();

function renderNotes() {
    list.replaceChildren();

    if (notes.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No notes saved yet.";
        list.append(emptyMessage);
        return;
    }

    notes.forEach((note) => {
        const item = document.createElement("li");
        item.textContent = note;
        list.append(item);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = input.value.trim();

    if (!note) {
        status.textContent = "Write a note before saving.";
        return;
    }

    const updatedNotes = [...notes, note];

    try {
        localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));

        notes = updatedNotes;
        input.value = "";
        renderNotes();

        status.textContent = "Note saved successfully.";
    } catch (error) {
        console.error("Unable to save note:", error);
        status.textContent = "Unable to save your note.";
    }
});

renderNotes();
