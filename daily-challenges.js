"use strict";

// STORAGE HELPERS

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
        const savedData = localStorage.getItem(key);

        return savedData === null
            ? fallbackValue
            : JSON.parse(savedData);
    } catch (error) {
        console.error(`Unable to load ${key}:`, error);
        return fallbackValue;
    }
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
    const validTheme =
        savedTheme === "dark" ? "dark" : "light";

    applyTheme(validTheme);
}

themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";

    if (saveData("daily-theme", newTheme)) {
        applyTheme(newTheme);
    } else {
        themeStatus.textContent = "Unable to save theme preference.";
    }
});

initializeTheme();

// DAY 2: RECENT SEARCHES

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchHistory = document.querySelector("#search-history");
const searchResult = document.querySelector("#search-result");

let recentSearches = loadData("recent-searches", []);

if (!Array.isArray(recentSearches)) {
    recentSearches = [];
}

function displaySearchHistory() {
    searchHistory.replaceChildren();

    recentSearches.forEach((searchTerm) => {
        const listItem = document.createElement("li");
        const historyButton = document.createElement("button");

        historyButton.type = "button";
        historyButton.textContent = searchTerm;

        historyButton.addEventListener("click", () => {
            searchInput.value = searchTerm;
            performSearch(searchTerm);
        });

        listItem.append(historyButton);
        searchHistory.append(listItem);
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
        searchResult.textContent = "Unable to save search history.";
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

function collectFormData() {
    return {
        name: autosaveForm.elements.name.value,
        email: autosaveForm.elements.email.value,
        message: autosaveForm.elements.message.value
    };
}

function restoreFormData() {
    const savedFormData = loadData(autosaveKey, null);

    if (!savedFormData || typeof savedFormData !== "object") {
        return;
    }

    autosaveForm.elements.name.value = savedFormData.name || "";
    autosaveForm.elements.email.value = savedFormData.email || "";
    autosaveForm.elements.message.value = savedFormData.message || "";

    autosaveStatus.textContent = "Previous form data restored.";
}

function autoSaveForm() {
    const formData = collectFormData();

    if (saveData(autosaveKey, formData)) {
        autosaveStatus.textContent =
            `Last saved: ${new Date().toLocaleTimeString()}`;
    } else {
        autosaveStatus.textContent = "Unable to save form data.";
    }
}

restoreFormData();

// Automatically save form data every five seconds.
const autosaveInterval = setInterval(autoSaveForm, 5000);

autosaveForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!autosaveForm.reportValidity()) {
        return;
    }

    clearInterval(autosaveInterval);

    try {
        localStorage.removeItem(autosaveKey);

        autosaveForm.reset();
        formResult.textContent = "Form submitted successfully.";
        autosaveStatus.textContent = "Saved form data cleared.";
    } catch (error) {
        console.error("Unable to clear saved form data:", error);
        formResult.textContent = "Unable to clear saved form data.";
    }
});

autosaveForm.addEventListener("reset", () => {
    formResult.textContent = "Form fields cleared.";
});

// DAY 4: REFACTOR CHALLENGE

const refactorForm = document.querySelector("#refactor-form");

function validateRefactoring(originalCode, improvedCode) {
    if (!originalCode.trim() || !improvedCode.trim()) {
        throw new Error("Both original and improved code are required.");
    }

    return true;
}

refactorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const originalCode =
        document.querySelector("#refactor-original").value;

    const improvedCode =
        document.querySelector("#refactor-improved").value;

    try {
        validateRefactoring(originalCode, improvedCode);

        saveData("day-4-original", originalCode);
        saveData("day-4-improved", improvedCode);

        const reflection =
            document.querySelector("#refactor-reflection").value;

        saveData("day-4-reflection", reflection);

        document.querySelector("#general-status").textContent =
            "Day 4 refactoring work saved.";
    } catch (error) {
        console.error("Refactoring validation failed:", error);

        document.querySelector("#general-status").textContent =
            error.message;
    }
});

// DAY 5: WEATHER DASHBOARD CODE REVIEW

const reviewForm = document.querySelector("#review-form");
const reviewImprovements =
    document.querySelector("#review-improvements");

reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const improvements = reviewImprovements.value.trim();

    if (!improvements) {
        document.querySelector("#general-status").textContent =
            "Please write your improvement list.";
        return;
    }

    const reviewAnswers = Array.from(
        reviewForm.querySelectorAll('input[type="checkbox"]')
    ).map((checkbox) => checkbox.checked);

    const reviewData = {
        checklist: reviewAnswers,
        improvements
    };

    if (saveData("day-5-review", reviewData)) {
        document.querySelector("#general-status").textContent =
            "Day 5 code review saved.";
    } else {
        document.querySelector("#general-status").textContent =
            "Unable to save your code review.";
    }
});

// RESTORE DAY 4 AND DAY 5 WORK

function restoreReviewWork() {
    document.querySelector("#refactor-original").value =
        loadData("day-4-original", "");

    document.querySelector("#refactor-improved").value =
        loadData("day-4-improved", "");

    document.querySelector("#refactor-reflection").value =
        loadData("day-4-reflection", "");

    const savedReview = loadData("day-5-review", null);

    if (savedReview) {
        const reviewCheckboxes = reviewForm.querySelectorAll(
            'input[type="checkbox"]'
        );

        reviewCheckboxes.forEach((checkbox, index) => {
            checkbox.checked = Boolean(savedReview.checklist[index]);
        });

        reviewImprovements.value = savedReview.improvements || "";
    }
}

restoreReviewWork();
