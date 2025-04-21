// Получаем необходимые элементы DOM
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const taskList = document.getElementById('task-list');
const addTaskInput = document.getElementById('add-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const newTaskBtn = document.getElementById('new-task-btn');
const tasksProgressBar = document.getElementById('tasks-progress-bar');
const tasksProgressText = document.getElementById('tasks-progress-text');

// Состояние приложения
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Функция для переключения сайдбара
toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Функция для сохранения задач в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTasksProgress();
}

// Функция для обновления прогресса задач
function updateTasksProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    
    tasksProgressBar.style.width = `${progressPercentage}%`;
    tasksProgressText.textContent = `Выполнено ${completedTasks} из ${totalTasks} задач`;
}

// Функция для создания элемента задачи
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    
    const taskText = document.createElement('span');
    taskText.className = `task-text ${task.completed ? 'completed' : ''}`;
    taskText.textContent = task.text;
    
    const categorySpan = document.createElement('span');
    categorySpan.className = `task-category cat-${task.category || 'work'}`;
    categorySpan.textContent = task.category || 'Работа';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.border = 'none';
    deleteBtn.style.background = 'none';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.color = '#888';
    
    // Обработчики событий
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        taskText.classList.toggle('completed', task.completed);
        saveTasks();
    });
    
    deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t !== task);
        li.remove();
        saveTasks();
    });
    
    // Сборка элемента
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(categorySpan);
    li.appendChild(deleteBtn);
    
    return li;
}

// Функция для добавления новой задачи
function addTask(text, category = 'work') {
    if (!text.trim()) return;
    
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        category: category,
        createdAt: new Date()
    };
    
    tasks.push(newTask);
    taskList.appendChild(createTaskElement(newTask));
    saveTasks();
    addTaskInput.value = '';
}

// Обработчики событий для добавления задач
addTaskBtn.addEventListener('click', () => {
    addTask(addTaskInput.value);
});

addTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(addTaskInput.value);
    }
});

newTaskBtn.addEventListener('click', () => {
    addTaskInput.focus();
});

// Инициализация приложения
function initApp() {
    // Загрузка существующих задач
    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
    updateTasksProgress();
    
    // Обработчики для навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Обработчики для календаря
    document.querySelectorAll('.calendar-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Здесь будет логика навигации по календарю
            console.log('Calendar navigation clicked');
        });
    });
    
    document.querySelectorAll('.view-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.view-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            // Здесь будет логика переключения видов календаря
            console.log('Calendar view changed');
        });
    });
}

// Запуск приложения
initApp(); 
