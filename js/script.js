const currentDay = document.getElementById("currentDay");
const currentDate = document.getElementById("currentDate");
const inputTask = document.getElementById("inputTask");
const addTaskButton = document.getElementById("addButton");


// Current List
const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Item

addTaskButton.addEventListener("click",() => {

    // Task input Value
    const task = inputTask.value;

    // Check for Error
    if(task === ""){
        alert("Check your input!");
        return;
    }

    // incrementing id check exist or not
    const newId = tasksList.length > 0 ? Math.max(...tasksList.map(item => item.id)) + 1 : 1;

    // New task
    const newItem = {
        id : newId,
        name : task
    }

    
    // new item to the list
    tasksList.push(newItem);
    
    // store updated list back in the localStorage
    localStorage.setItem("tasks", JSON.stringify(tasksList));

    // Clear input field
    task.value = "";

    // Show task
    console.log(tasksList);
})