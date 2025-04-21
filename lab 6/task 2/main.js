let tasks = [];
let sortKey = "createdAt";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const sortSelect = document.getElementById("sort-select");

const generateId = () => Math.random().toString(36).substr(2, 9);

// Створення задачі
const addTask = (text) => {
    tasks.push({
        id: generateId(),
        text,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });
    renderList();
};

// Видалення
const deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    renderList();
};

// Завершення
const toggleTask = (id) => {
    tasks = tasks.map(t =>
        t.id === id
            ? { ...t, completed: !t.completed, updatedAt: Date.now() }
            : t
    );
    renderList();
};

// Редагування
const editTask = (id) => {
    const li = document.querySelector(`li[data-id="${id}"]`);
    const span = li.querySelector("span");
    const controls = li.querySelector(".controls");

    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";

    span.replaceWith(input);
    controls.innerHTML = `
        <button class="save">Зберегти</button>
        <button class="cancel">Скасувати</button>
    `;

    input.focus();

    controls.querySelector(".save").onclick = () => {
        const newText = input.value.trim();
        if (newText) {
            tasks = tasks.map(t =>
                t.id === id ? { ...t, text: newText, updatedAt: Date.now() } : t
            );
        }
        renderList();
    };

    controls.querySelector(".cancel").onclick = () => {
        renderList();
    };

    input.onkeydown = (e) => {
        if (e.key === "Enter") controls.querySelector(".save").click();
        if (e.key === "Escape") controls.querySelector(".cancel").click();
    };
};

// Сортування
const sortTasks = (taskList) => {
    const tasksCopy = [...taskList];
    if (sortKey === "createdAt") {
        tasksCopy.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sortKey === "updatedAt") {
        tasksCopy.sort((a, b) => b.updatedAt - a.updatedAt);
    } else if (sortKey === "completed") {
        tasksCopy.sort((a, b) => Number(a.completed) - Number(b.completed));
    }
    return tasksCopy;
};

// Рендеринг списку
const renderList = () => {
    taskList.innerHTML = "";
    const sortedTasks = sortTasks(tasks);
    sortedTasks.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
          <span>${task.text}</span>
          <div class="controls">
            <button class="edit">Редагувати</button>
            <button class="delete">Видалити</button>
          </div>
        `;
        taskList.appendChild(li);
    });
};

// Обробка подій
taskList.onclick = (e) => {
    const li = e.target.closest("li");
    const id = li?.dataset.id;
    if (!id) return;

    if (e.target.matches(".delete")) {
        deleteTask(id);
    } else if (e.target.matches(".edit")) {
        editTask(id);
    } else if (e.target.tagName === "SPAN") {
        toggleTask(id);
    }
};

taskForm.onsubmit = (e) => {
    e.preventDefault();
    if (taskInput.value.trim()) {
        addTask(taskInput.value.trim());
        taskInput.value = "";
    }
};

sortSelect.onchange = (e) => {
    sortKey = e.target.value;
    renderList();
};

renderList();
