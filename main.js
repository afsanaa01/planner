let taskInput = document.querySelector("#task-input");
let deadlineInput = document.querySelector("#deadline-input");
let addTaskButton = document.querySelector("#add-task");
let tasksWrapper = document.querySelector("#task-wrapper");
let deleteButtons = document.querySelector("#delete-buttons");
let reset = document.querySelector("#reset");
let deleteSelected = document.querySelector("#delete-selected");
let infoOfTask;
let info;

if (localStorage.getItem("infoOfTask") != null) {
    info = JSON.parse(localStorage.getItem("infoOfTask"));
    for (const item of info) {
        let newLi = document.createElement("li");
        newLi.classList.add("list-group-item");
        newLi.innerText = item.taskValue;
        newLi.addEventListener("click", function () {
            this.classList.toggle("active");
        });

        let newSpan = document.createElement("span");
        newSpan.classList.add("badge", "rounded-pill", "bg-success");
        newSpan.innerText = item.deadlineValue;

        newLi.append(newSpan);
        tasksWrapper.append(newLi);
        deleteButtons.classList.remove("d-none");
    }
}

else
{
    localStorage.setItem("infoOfTask",JSON.stringify([]));
}


taskInput.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        addTask();
    }
});


deadlineInput.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        addTask();
    }
});

addTaskButton.addEventListener("click", function () {
    addTask();
});

function addTask() {
    let deadlineValue = deadlineInput.value;
    let taskValue = taskInput.value.trim();
    if (taskValue == "" || deadlineValue == "") {
        alert("You cant add an empty task.");
        return;
    }

    infoOfTask = {
        taskValue: taskValue,
        deadlineValue : deadlineValue,
    }
    info.push(infoOfTask);
    localStorage.setItem("infoOfTask", JSON.stringify(info));

    let newLi = document.createElement("li");
    newLi.classList.add("list-group-item");

    newLi.innerText = info[info.length - 1].taskValue;
    newLi.addEventListener("click", function () {
        this.classList.toggle("active");
    });

    let newSpan = document.createElement("span");
    newSpan.classList.add("badge", "rounded-pill", "bg-success");
    newSpan.innerText = info[info.length - 1].deadlineValue;

    newLi.append(newSpan);
    tasksWrapper.append(newLi);
    taskInput.value = "";
    deadlineInput.value = "";

    deleteButtons.classList.remove("d-none");
}

reset.addEventListener("click", function () {
    deleteButtons.classList.add("d-none");
    tasksWrapper.innerHTML = "";
    localStorage.clear();
});

deleteSelected.addEventListener("click", function () {
    deleteSelectedTasks();
});

document.addEventListener("keyup", function (e) {
    if (e.keyCode == 8 && e.ctrlKey == true) {
        deleteSelectedTasks();
    }
});

function deleteSelectedTasks() {
    for (const item of document.querySelectorAll(".list-group-item.active")) {
        item.remove();
        localStorage.remove(item)
    }
    if (document.querySelectorAll(".list-group-item").length == 0) {
        deleteButtons.classList.add("d-none");
    }
}

window.addEventListener("blur", () => {
    document.querySelector("title").innerHTML = "You have multiple tasks to do!";
});

window.addEventListener("focus", () => {
    document.querySelector("title").innerHTML = "Welcome!";
});

function msToMin(time) {
    return Math.round(time / 60000);
}