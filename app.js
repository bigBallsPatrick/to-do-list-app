const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("task");
const addTask = document.getElementById("addTask");

const delIndex = document.getElementById("delIndex");
const delTask = document.getElementById("delTask");
const delAll = document.getElementById("delAll");

// Inicjalizacja zadań z localStorage
document.addEventListener("DOMContentLoaded", function() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(function(taskText) {
            if (!czyZadanieIstnieje(taskText)) {
                dodajZadanie(taskText);
            }   
        });
    }
});

function zapiszZadaniaDoLocalStorage() {
    const tasks = Array.from(taskList.children).map(function(task) {
        return task.querySelector("span").textContent;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function dodajZadanie(taskText) {
    let newTask = document.createElement("li");

    let delTaskButton = document.createElement("button");
    delTaskButton.textContent = "Usuń";
    delTaskButton.classList.add("delTaskButton");

    let noTagButton = document.createElement("button");
    noTagButton.textContent = "Wykonane";
    noTagButton.classList.add("noTagButton");

    noTagButton.addEventListener("click", function() {
        if (noTagButton.textContent === "Wykonane") {
            let completeTask = newTask.querySelector("span");
            completeTask.style.color = "green";
            noTagButton.textContent = "Cofnij wykonanie";
        } else {
            let completeTask = newTask.querySelector("span");
            completeTask.style.color = "";
            noTagButton.textContent = "Wykonane";
        }
        zapiszZadaniaDoLocalStorage();
    });

    delTaskButton.addEventListener("click", function() {
        usunZadanie(newTask);
    });

    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    newTask.appendChild(noTagButton);
    newTask.appendChild(taskSpan);
    newTask.appendChild(delTaskButton);

    taskList.appendChild(newTask);

    zapiszZadaniaDoLocalStorage();
}

// Dodawanie zadań
addTask.addEventListener("click", function() {
    let newTaskText = taskInput.value;
    if (newTaskText) {
        dodajZadanie(newTaskText);
        taskInput.value = ""; // Czyszczenie pola input po dodaniu zadania
    };
});

taskInput.addEventListener("keydown", function(event) {
    let newTaskText = taskInput.value;
    if (event.key === "Enter") {
        dodajZadanie(newTaskText);
        taskInput.value = ""; // Czyszczenie pola input po dodaniu zadania
    }
});


// Usuwanie zadań
function usunZadanie(taskToRemove) {
    taskList.removeChild(taskToRemove);
    zapiszZadaniaDoLocalStorage();
}

delAll.addEventListener("click", function() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Opcjonalnie, możesz również wyczyścić dane w localStorage
    localStorage.removeItem("tasks");
});

function czyZadanieIstnieje(taskText) {
    const tasks = Array.from(taskList.children).map(function(task) {
        return task.querySelector("span").textContent;
    });
    return tasks.includes(taskText);
}

// Inicjalizacja zadań z localStorage
document.addEventListener("DOMContentLoaded", function() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(function(taskText) {
            if (!czyZadanieIstnieje(taskText)) {
                dodajZadanie(taskText);
            };
        });
    }
});


