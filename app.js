// Начальные данные
let appData = {
    tasks: [
        { id: 1, text: "Позвонить клиенту", category: "Работа", dueTime: "10:00", completed: true },
        { id: 2, text: "Подготовить отчет", category: "Работа", dueTime: "14:00", completed: false },
        { id: 3, text: "Заказать продукты", category: "Покупки", dueTime: "12:00", completed: true },
        { id: 4, text: "Тренировка", category: "Здоровье", dueTime: "18:00", completed: false }
    ]
};

/**
 * Загружаем данные из localStorage
 */
function loadData() {
    const savedData = localStorage.getItem('prodpeakData');
    if (savedData) {
        try {
            appData = JSON.parse(savedData);
            console.log("Данные загружены из localStorage:", appData);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    } else {
        console.log("Данные не найдены в localStorage, используем начальные данные");
    }
}

/**
 * Сохраняем данные в localStorage
 */
function saveData() {
    localStorage.setItem('prodpeakData', JSON.stringify(appData));
    console.log("Данные сохранены в localStorage");
}

/**
 * Получаем CSS класс для категории задачи
 */
function getCategoryClass(category) {
    const categoryMap = {
        'Работа': 'work',
        'Покупки': 'shopping',
        'Здоровье': 'health',
        'Личное': 'personal'
    };
    return categoryMap[category] || 'work';
}

/**
 * Обновляем отображение прогресса задач
 */
function updateTaskProgress() {
    const completed = appData.tasks.filter(task => task.completed).length;
    const total = appData.tasks.length;
    
    // Обновляем текст прогресса
    const progressText = document.getElementById('tasks-progress-text');
