const form = document.querySelector("#contact-form");
const fields = form.querySelectorAll("input, textarea");
const status = document.querySelector("#form-status");

fields.forEach((field) => {
    const savedValue = sessionStorage.getItem(`contact_${field.name}`);
    if (savedValue !== null) field.value = savedValue;

    field.addEventListener("input", () => {
        sessionStorage.setItem(`contact_${field.name}`, field.value);
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    fields.forEach((field) => sessionStorage.removeItem(`contact_${field.name}`));
    form.reset();
    status.textContent = "Form submitted. Saved session data cleared.";
});