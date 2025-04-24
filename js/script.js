const currentDay = document.getElementById("currentDay");
const currentDate = document.getElementById("currentDate");
const inputTask = document.getElementById("inputTask");
const addTaskButton = document.getElementById("addButton");


// Current List
const tasksList = [
    {
        id: 1,
        task: "Run for 1 hour"
    },
    {
        id: 2,
        task: "Walk with dog"
    }
    
];

// Stored list in localStorage
const storedLists = localStorage.setItem("tasks",JSON.stringify(tasksList));

// Add Item

addTaskButton.addEventListener(() => {

    // Task input Value
    const task = inputTask.value;

    // Check for Error

    // Get current list from localStorage or make a new array if empty

    // New incrementing id

    // New task

    // new item to the list

    // store updated list back in the localStorage

    // Clear input field

    // Show task
})