"use strict";

// SHARED STORAGE HELPERS

function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Unable to save ${key}:`, error);
        return false;
    }
}

function loadData(key, fallbackValue) {
    try {
        const savedValue = localStorage.getItem(key);

        return savedValue === null
            ? fallbackValue
            : JSON.parse(savedValue);
    } catch (error) {
        console.error(`Unable to load ${key}:`, error);
        return fallbackValue;
    }
}

function updateStatus(message) {
    document.querySelector("#general-status").textContent = message;
}

// DAY 1: THEME PERSISTENCE

const themeToggle = document.querySelector("#theme-toggle");
const themeStatus = document.querySelector("#theme-status");

function applyTheme(theme) {
    document.body.dataset.theme = theme;

    themeStatus.textContent = `Current theme: ${theme}`;
    themeToggle.textContent =
        theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
}

function initializeTheme() {
    const savedTheme = loadData("daily-theme", "light");
    const theme = savedTheme === "dark" ? "dark" : "light";

    applyTheme(theme);
}

themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    if (saveData("daily-theme", newTheme)) {
        applyTheme(newTheme);
    } else {
        themeStatus.textContent = "Unable to save your theme preference.";
    }
});

initializeTheme();

// DAY 2: RECENT SEARCHES

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchHistory = document.querySelector("#search-history");
const searchHistorySection = document.querySelector("#search-history-section");
const searchResult = document.querySelector("#search-result");

let recentSearches = loadData("recent-searches", []);

if (!Array.isArray(recentSearches)) {
    recentSearches = [];
} else {
    recentSearches = recentSearches.filter(
        (item) => typeof item === "string"
    );
}

function displaySearchHistory() {
    searchHistory.replaceChildren();

    searchHistorySection.hidden = recentSearches.length === 0;

    recentSearches.forEach((searchTerm) => {
        const item = document.createElement("li");
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = searchTerm;

        button.addEventListener("click", () => {
            searchInput.value = searchTerm;
            performSearch(searchTerm);
            searchHistorySection.open = false;
        });

        item.append(button);
        searchHistory.append(item);
    });
}

function performSearch(searchTerm) {
    const cleanedTerm = searchTerm.trim();

    if (!cleanedTerm) {
        searchResult.textContent = "Enter a search term.";
        return;
    }

    recentSearches = recentSearches.filter(
        (item) => item.toLowerCase() !== cleanedTerm.toLowerCase()
    );

    recentSearches.unshift(cleanedTerm);
    recentSearches = recentSearches.slice(0, 5);

    if (saveData("recent-searches", recentSearches)) {
        displaySearchHistory();
        searchResult.textContent = `You searched for: ${cleanedTerm}`;
    } else {
        searchResult.textContent = "Unable to save your search history.";
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    performSearch(searchInput.value);
    searchInput.value = "";
});

displaySearchHistory();

// DAY 3: FORM AUTO-SAVE

const autosaveForm = document.querySelector("#autosave-form");
const autosaveStatus = document.querySelector("#autosave-status");
const formResult = document.querySelector("#form-result");

const autosaveKey = "daily-form-data";

let autosaveInterval = null;

function collectFormData() {
    return {
        name: autosaveForm.elements.namedItem("name").value,
        email: autosaveForm.elements.namedItem("email").value,
        message: autosaveForm.elements.namedItem("message").value
    };
}

function restoreFormData() {
    const savedData = loadData(autosaveKey, null);

    if (!savedData || typeof savedData !== "object") {return;}

    autosaveForm.elements.namedItem("name").value =
        typeof savedData.name === "string" ? savedData.name : "";

    autosaveForm.elements.namedItem("email").value =
        typeof savedData.email === "string" ? savedData.email : "";

    autosaveForm.elements.namedItem("message").value =
        typeof savedData.message === "string" ? savedData.message : "";

    autosaveStatus.textContent = "Previous form data restored.";
}

function autoSaveForm() {
    if (saveData(autosaveKey, collectFormData())) {
        autosaveStatus.textContent =
            `Last saved: ${new Date().toLocaleTimeString()}`;
    } else {
        autosaveStatus.textContent = "Unable to save form data.";
    }
}

function startAutosave() {
    if (autosaveInterval !== null) {return;}

    autosaveInterval = setInterval(autoSaveForm, 5000);
}

function stopAutosave() {
    if (autosaveInterval === null) {return;}

    clearInterval(autosaveInterval);
    autosaveInterval = null;
}

function clearSavedDraft() {
    try {
        localStorage.removeItem(autosaveKey);
        autosaveStatus.textContent = "Saved form data cleared.";
        return true;
    } catch (error) {
        console.error("Unable to clear saved form data:", error);
        autosaveStatus.textContent = "Unable to clear saved form data.";
        return false;
    }
}

restoreFormData();
startAutosave();

autosaveForm.addEventListener("input", () => {
    autoSaveForm();
    startAutosave();
});

autosaveForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!autosaveForm.reportValidity()) {return;}

    if (!clearSavedDraft()) {
        formResult.textContent =
            "Submission completed, but saved data could not be cleared.";
        return;
    }

    stopAutosave();
    autosaveForm.reset();

    formResult.textContent = "Form submitted successfully.";
});

autosaveForm.addEventListener("reset", () => {
    clearSavedDraft();
    stopAutosave();
    formResult.textContent = "Form fields cleared.";
});


// DAY 4: REFACTOR CHALLENGE

const refactorForm = document.querySelector("#refactor-form");

const refactorOriginal = document.querySelector("#refactor-original");
const refactorImproved = document.querySelector("#refactor-improved");
const refactorReflection = document.querySelector("#refactor-reflection");

const refactorCheckboxes = refactorForm.querySelectorAll(
    'input[name="refactor-check"]'
);

function collectRefactorData() {
    return {
        original: refactorOriginal.value,
        improved: refactorImproved.value,
        reflection: refactorReflection.value,
        checklist: Array.from(refactorCheckboxes).map(
            (checkbox) => checkbox.checked
        )
    };
}

function restoreRefactorData() {
    const savedData = loadData("day-4-refactor", null);

    if (!savedData) {return;}

    refactorOriginal.value = savedData.original || "";
    refactorImproved.value = savedData.improved || "";
    refactorReflection.value = savedData.reflection || "";

    refactorCheckboxes.forEach((checkbox, index) => {
        checkbox.checked = Boolean(savedData.checklist?.[index]);
    });
}

refactorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = collectRefactorData();

    if (!data.original.trim() || !data.improved.trim()) {
        updateStatus("Enter both your original and improved code.");
        return;
    }

    if (saveData("day-4-refactor", data)) {
        updateStatus("Day 4 refactoring work saved.");
    } else {
        updateStatus("Unable to save your refactoring work.");
    }
});

restoreRefactorData();

// DAY 5: CODE REVIEW

const reviewForm = document.querySelector("#review-form");
const reviewImprovements = document.querySelector("#review-improvements");

const reviewCheckboxes = reviewForm.querySelectorAll(
    'input[name="review-check"]'
);

function collectReviewData() {
    return {
        checklist: Array.from(reviewCheckboxes).map(
            (checkbox) => checkbox.checked
        ),
        improvements: reviewImprovements.value
    };
}

function restoreReviewData() {
    const savedData = loadData("day-5-review", null);

    if (!savedData) {return;}

    reviewCheckboxes.forEach((checkbox, index) => {
        checkbox.checked = Boolean(savedData.checklist?.[index]);
    });

    reviewImprovements.value = savedData.improvements || "";
}

reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = collectReviewData();

    if (!data.improvements.trim()) {
        updateStatus("Write your improvement list before submitting.");
        return;
    }

    if (saveData("day-5-review", data)) {
        updateStatus("Day 5 code review saved.");
    } else {
        updateStatus("Unable to save your code review.");
    }
});

restoreReviewData();
