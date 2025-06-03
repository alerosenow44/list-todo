document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearAllBtn = document.getElementById('clearAllBtn');

    // Carica i task dal Local Storage all'avvio
    loadTasks();

    // Aggiungi un nuovo task
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });

    // Elimina tutti i task
    clearAllBtn.addEventListener('click', clearAllTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">❌</button>
        `;

        // Completa/elimina task
        li.querySelector('span').addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    }

    function clearAllTasks() {
        if (confirm('Vuoi eliminare tutti i task?')) {
            taskList.innerHTML = '';
            localStorage.removeItem('tasks');
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn">❌</button>
            `;
            if (task.completed) li.classList.add('completed');

            li.querySelector('span').addEventListener('click', function() {
                li.classList.toggle('completed');
                saveTasks();
            });

            li.querySelector('.delete-btn').addEventListener('click', function() {
                li.remove();
                saveTasks();
            });

            taskList.appendChild(li);
        });
    }
});