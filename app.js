// Модель данных
let appData = {
    tasks: [
        { id: 1, text: "Позвонить клиенту", category: "Работа", dueTime: "10:00", completed: true },
        { id: 2, text: "Подготовить отчет", category: "Работа", dueTime: "14:00", completed: false },
        { id: 3, text: "Заказать продукты", category: "Покупки", dueTime: "12:00", completed: true },
        { id: 4, text: "Тренировка", category: "Здоровье", dueTime: "18:00", completed: false }
    ]
};

// Загружаем данные из localStorage при запуске
function loadData() {
    const savedData = localStorage.getItem('prodpeakData');
    if (savedData) {
        appData = JSON.parse(savedData);
        renderTasks();
    }
}

// Сохраняем данные в localStorage
function saveData() {
    localStorage.setItem('prodpeakData', JSON.stringify(appData));
}

// Отображаем задачи
function renderTasks() {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';
    
    appData.tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.dataset.id = task.id;
        
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
            <span class="task-category cat-${getCategoryClass(task.category)}">${task.category}</span>
            <span class="task-due">${task.dueTime}</span>
        `;
        
        taskList.appendChild(taskItem);
        
        // Добавляем обработчик для чекбокса
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', function() {
            const taskId = parseInt(taskItem.dataset.id);
            const taskIndex = appData.tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                appData.tasks[taskIndex].completed = this.checked;
                const taskText = this.nextElementSibling;
                if (this.checked) {
                    taskText.classList.add('completed');
                } else {
                    taskText.classList.remove('completed');
                }
                saveData();
                updateTaskProgress();
            }
        });
    });
}

// Получаем CSS класс для категории
function getCategoryClass(category) {
    const categoryMap = {
        'Работа': 'work',
        'Покупки': 'shopping',
        'Здоровье': 'health',
        'Личное': 'personal'
    };
    return categoryMap[category] || 'work';
}

// Обновляем прогресс выполнения задач
function updateTaskProgress() {
    const completed = appData.tasks.filter(t => t.completed).length;
    const total = appData.tasks.length;
    const progressText = document.querySelector('.progress-container > div');
    const progressBar = document.querySelector('.progress-container > div > div');
    
    if (progressText && progressBar) {
        progressText.textContent = `Выполнено ${completed} из ${total} задач`;
        progressBar.style.width = `${(completed / total) * 100}%`;
    }
}

// Добавление новой задачи
function setupTaskAddition() {
    const addTaskInput = document.querySelector('.add-task-input');
    const addTaskBtn = document.querySelector('.add-task-btn');

    if (addTaskBtn && addTaskInput) {
        addTaskBtn.addEventListener('click', function() {
            const taskText = addTaskInput.value.trim();
            if (taskText) {
                const newId = appData.tasks.length > 0 ? Math.max(...appData.tasks.map(t => t.id)) + 1 : 1;
                appData.tasks.push({
                    id: newId,
                    text: taskText,
                    category: "Личное",
                    dueTime: "Сегодня",
                    completed: false
                });
                
                saveData();
                renderTasks();
                updateTaskProgress();
                addTaskInput.value = '';
            }
        });
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Переключение боковой панели
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Загрузка данных и настройка обработчиков событий
    loadData();
    setupTaskAddition();
    updateTaskProgress();
});
