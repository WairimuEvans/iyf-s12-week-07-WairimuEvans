const form = document.querySelector("#contact-form");
const fields = form.querySelectorAll("input, textarea");
const status = document.querySelector("#form-status");

function saveField(field) {
    try {
        sessionStorage.setItem(
            `contact_${field.name}`,
            field.value
        );

        status.textContent = "Changes saved for this session.";
    } catch (error) {
        console.error("Unable to save form field:", error);
        status.textContent = "Unable to save your changes.";
    }
}

function restoreFields() {
    fields.forEach((field) => {
        try {
            const savedValue = sessionStorage.getItem(
                `contact_${field.name}`
            );

            if (savedValue !== null) {
                field.value = savedValue;
            }
        } catch (error) {
            console.error("Unable to restore form field:", error);
            status.textContent = "Unable to restore saved form data.";
        }
    });
}

function clearSavedFields() {
    fields.forEach((field) => {
        try {
            sessionStorage.removeItem(`contact_${field.name}`);
        } catch (error) {
            console.error("Unable to clear saved field:", error);
        }
    });
}

fields.forEach((field) => {
    field.addEventListener("input", () => {
        saveField(field);
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    clearSavedFields();
    form.reset();

    status.textContent =
        "Form submitted. Saved session data cleared.";
});

restoreFields();
