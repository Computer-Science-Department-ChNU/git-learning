let addButton = document.getElementById('add-btn');
let inputTask = document.getElementById('inputTask');
let sortSelect = document.getElementById('sortSelect');
let taskList = document.getElementById('taskList');

let tasks = [];

addButton.addEventListener('click', () => {
    let content = inputTask.value.trim();
    if (content !== '') {
        const task = {
            id: Date.now(),
            text: content,
            done: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        tasks.push(task);
        inputTask.value = '';
        renderTasks();
    }
});

sortSelect.addEventListener('change', () => {
    renderTasks();
});

function renderTasks() {
   taskList.innerHTML = '';

   let sortedTasks = [...tasks];
   const sortBy = sortSelect.value;

   if (sortBy === 'created') {
       sortedTasks.sort((a, b) => a.createdAt - b.createdAt);
   } else if (sortBy === 'updated') {
       sortedTasks.sort((a, b) => a.updatedAt - b.updatedAt);
   } else if (sortBy === 'status') {
       sortedTasks.sort((a, b) => a.done - b.done);
   }
    sortedTasks.forEach(task => {
        taskList.innerHTML += `
            <li class="task ${task.done ? 'done' : ''}" id="task-${task.id}">
                <input type="text" value="${task.text}" readonly />
                <button class="done-btn" onclick="toggleDone(${task.id})">Виконано</button>
                <button class="edit-btn" onclick="editTask(${task.id}, this)">Редагувати</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Видалити</button>
            </li>
        `;
    });
}

function toggleDone(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.done = !task.done;
        task.updatedAt = new Date();
        renderTasks();
    }
}

function editTask(id, btn) {
    const li = document.getElementById(`task-${id}`);
    const input = li.querySelector('input');
    const task = tasks.find(t => t.id === id);

    if (input.readOnly) {
        input.readOnly = false;
        input.focus();
        btn.textContent = 'Зберегти';
    } else {
        input.readOnly = true;
        if (task) {
            task.text = input.value.trim();
            task.updatedAt = new Date();
        }
        btn.textContent = 'Редагувати';
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}