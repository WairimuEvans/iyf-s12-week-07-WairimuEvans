export function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Unable to save ${key} to localStorage:`, error);
        return false;
    }
}

export function getFromStorage(key, defaultValue = null) {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null) return defaultValue;
        return JSON.parse(storedValue);
    } catch (error) {
        console.warn(`Unable to read ${key} from localStorage:`, error);
        return defaultValue;
    }
}

export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Unable to remove ${key} from localStorage:`, error);
        return false;
    }
}
