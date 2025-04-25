const currentDay = document.getElementById("currentDay");
const currentDate = document.getElementById("currentDate");
const inputTask = document.getElementById("inputTask");
const addTaskButton = document.getElementById("addButton");
const displayTask = document.getElementById("tasks");

// Default Lists
const defaultLists = [
    {
        id: 1,
        name: "Read Textbook Chapter 1"
    },
    {
        id: 2,
        name: "Sing a song"

    }
]

// Check if "tasks" is in localStorage
if(!localStorage.getItem("tasks")){
    localStorage.setItem("tasks",JSON.stringify(defaultLists));
}

// Declare tasksList globally to be accessed
const tasksList = JSON.parse(localStorage.getItem("tasks"));



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
    inputTask.value = "";

    // Show tasks
    showTasks();
})

// Display Tasks

const showTasks = () => {

    // Redeclare tasksList inside to make sure to get latest tasks
    const tasksList = JSON.parse(localStorage.getItem("tasks") || []);

    // Clear it first
    displayTask.innerHTML = "";

    // Show tasks
    tasksList.forEach(element => {
        displayTask.innerHTML += `
            <div class="task">
                <p>${element.name}</p>
                <input type="checkbox">
            </div>
        `
    });
}

const getDate = () => {
    const today = new Date();

    // Current Day
    const day = today.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    currentDay.innerText = daysOfWeek[day];

    // Current Date
    const numDay = String(today.getDate()).padStart(2, '0');
    if(numDay.slice(-1) == 1){
        var dd = `${numDay}st`;
    }else if(numDay.slice(-1) == 2){
        var dd = `${numDay}nd`;
    }else if(numDay.slice(-1) == 3){
        var dd = `${numDay}rd`;
    }else{
        var dd = `${numDay}th`;
    }
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    var yyyy = today.getFullYear();
    currentDate.innerText = `${dd} ${months[parseInt(mm,10)]} ${yyyy}`;
}

getDate();
showTasks();
