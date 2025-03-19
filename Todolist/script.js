function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(taskText = null, isNew = true) {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");
    let text = taskText || taskInput.value;
    if (text === "") return;

    if(isNew) {
        let tasks = getTasks();
        tasks.push(text);
        saveTasks(tasks);
    }

    let li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow space-x-4";

    
    let span = document.createElement("span");
    span.className = "flex-1 cursor-pointer text-gray-800 font-medium";
    span.textContent = text;
    
    let input = document.createElement("input");
    input.type = "text";
    input.value = text;
    input.className = "hidden flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500";
    
    let updateButton = document.createElement("button");
    updateButton.textContent = "update";
    updateButton.className = "hidden bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition space-4";
    updateButton.onclick = function() {
        if (input.value.trim() !== "") {
            let updatedTasks = getTasks();
            let index = updatedTasks.indexOf(span.textContent);
            if (index !== -1) {
                updatedTasks[index] = input.value;
                saveTasks(updatedTasks);
            }
            span.textContent = input.value;
        }
        input.classList.add("hidden");
        updateButton.classList.add("hidden");
        span.classList.remove("hidden");
    };

    span.onclick = function() {
        input.classList.remove("hidden");
        updateButton.classList.remove("hidden");
        span.classList.add("hidden");
        input.focus();
    };

    let deleteButton = document.createElement("button");
    deleteButton.className = "text-red-500 hover:text-red-700 text-xl";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        let updatedTasks = getTasks().filter(task => task !== span.textContent);
        saveTasks(updatedTasks);
        li.remove();
    };
    
    li.appendChild(span);
    li.appendChild(input);
    li.appendChild(updateButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    if (!taskText) taskInput.value = "";
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = getTasks();
    tasks.forEach(task => addTask(task , false));
}
window.onload = loadTasks();

