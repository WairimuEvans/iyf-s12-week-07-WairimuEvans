"use strict";

// WEEK 7: DEBUGGING PRACTICE

// 1. Debugging variables
function calculateTotal(price, quantity) {
    const total = price * quantity;

    console.log("Price:", price);
    console.log("Quantity:", quantity);
    console.log("Total:", total);

    return total;
}

// 2. Debugging arrays
function displayTasks(tasks) {
    console.table(tasks);

    tasks.forEach((task, index) => {
        console.log(`Task ${index + 1}:`, task);
    });
}

// 3. Debugging errors
function divideNumbers(firstNumber, secondNumber) {
    if (secondNumber === 0) {
        throw new Error("Cannot divide by zero.");
    }

    return firstNumber / secondNumber;
}

// 4. Debugging execution flow
function runDebuggingExamples() {
    console.log("Debugging started.");

    console.group("Calculation");
    calculateTotal(100, 3);
    console.groupEnd();

    console.group("Task list");
    displayTasks(["Learn JavaScript", "Practice debugging"]);
    console.groupEnd();

    console.group("Division");

    try {
        console.log(divideNumbers(20, 4));
    } catch (error) {
        console.error(error.message);
    }

    console.groupEnd();

    console.log("Debugging completed.");
}

runDebuggingExamples();
