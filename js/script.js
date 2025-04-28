const currentDay = document.getElementById("currentDay");
const currentDate = document.getElementById("currentDate");
const inputTask = document.getElementById("inputTask");
const addTaskButton = document.getElementById("addButton");
const displayTask = document.getElementById("tasks");


// Default Lists
const defaultLists = [
    {
        id: 1,
        name: "Read Textbook Chapter 1",
        done: false
    },
    {
        id: 2,
        name: "Sing a song",
        done: false

    }
]

// Check if "tasks" is in localStorage
if(!localStorage.getItem("tasks")){
    localStorage.setItem("tasks",JSON.stringify(defaultLists));
}


// Add Item
addTaskButton.addEventListener("click",() => {

    const tasksList = JSON.parse(localStorage.getItem("tasks") || []);

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
        name : task,
        done: false
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

    displayTask.innerHTML = "";

    tasksList.forEach((element) => {
        const textStyle = element.done ? "text-decoration: line-through;" : "";

        displayTask.innerHTML += `
            <div class="task">
                <p id="task-text-${element.id}" style="${textStyle}">${element.name}</p>
                <div class="task" style="gap: 10px;">
                    <input type="checkbox" id="checkbox-${element.id}" ${element.done ? "checked" : ""}>
                    <p id="delete-${element.id}" style="cursor:pointer;">Delete</p>
                </div>
                
            </div>
        `;
    });

    // After all checkboxes are rendered, add event listeners
    tasksList.forEach((element) => {
        const checkBox = document.getElementById(`checkbox-${element.id}`);
        const text = document.getElementById(`task-text-${element.id}`);
        const deleteButton = document.getElementById(`delete-${element.id}`);

        checkBox.addEventListener("change", () => {
            element.done = checkBox.checked;

            // Update text style
            text.style.textDecoration = element.done ? "line-through" : "none";

            // Save back to localStorage
            localStorage.setItem("tasks", JSON.stringify(tasksList));
        });

        deleteButton.addEventListener("click", () => {
            // Find index from array
            const tasksIndex = tasksList.findIndex((item) => item.id === element.id);
            
            // Check if it's available
            if(taskIndex !== -1){
                tasksList.splice(taskIndex,1);
            }

            localStorage.setItem("tasks", JSON.stringify(tasksList));

            showTasks();
        })
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
    let dd = ""
    if(numDay >= 11 && numDay <= 13){
        dd = `${numDay}th`
    }else if(numDay.slice(-1) == 1){
        dd = `${numDay}st`;
    }else if(numDay.slice(-1) == 2){
        dd = `${numDay}nd`;
    }else if(numDay.slice(-1) == 3){
        dd = `${numDay}rd`;
    }else{
        dd = `${numDay}th`;
    }
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const yyyy = today.getFullYear();
    currentDate.innerText = `${dd} ${months[parseInt(mm,10)]} ${yyyy}`;
}




getDate();
showTasks();
