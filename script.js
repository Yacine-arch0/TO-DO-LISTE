document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addTaskBtn = document.getElementById("add-task-btn");
    const clearAllBtn = document.getElementById("clear-all-btn");
    const taskList = document.getElementById("task-list");
    const totalTasks = document.getElementById("total-tasks");
    const completedTasks = document.getElementById("completed-tasks");

    // Charger les tâches depuis le localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Mettre à jour l'affichage
    const updateUI = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            li.className = task.completed ? "completed" : "";
            li.addEventListener("click", () => toggleTask(index));
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Supprimer";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteTask(index);
            });
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
        totalTasks.textContent = `Total : ${tasks.length}`;
        completedTasks.textContent = `Terminées : ${tasks.filter(task => task.completed).length}`;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Ajouter une tâche
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            updateUI();
        }
    };

    // Basculer l'état d'une tâche (terminée ou non)
    const toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateUI();
    };

    // Supprimer une tâche
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        updateUI();
    };

    // Supprimer toutes les tâches
    const clearAllTasks = () => {
        tasks = [];
        updateUI();
    };

    // Écouteurs d'événements
    addTaskBtn.addEventListener("click", addTask);
    clearAllBtn.addEventListener("click", clearAllTasks);
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });

    // Initialiser l'affichage
    updateUI();
});
