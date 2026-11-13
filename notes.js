const NOTES_KEY = "week7_notes";
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-text");
const list = document.querySelector("#notes-list");

function readNotes() {
    try {
        const savedNotes = JSON.parse(localStorage.getItem(NOTES_KEY) ?? "[]");
        return Array.isArray(savedNotes) ? savedNotes : [];
    } catch {
        return [];
    }
}

let notes = readNotes();

function renderNotes() {
    list.replaceChildren();
    notes.forEach((note) => {
        const item = document.createElement("li");
        item.textContent = note;
        list.append(item);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = input.value.trim();
    if (!note) return;
    notes = [...notes, note];
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    input.value = "";
    renderNotes();
});

renderNotes();