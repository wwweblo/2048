var board; // Игровое поле
var score = 0; // Счет
var rows = 4; // Количество строк
var columns = 4; // Количество столбцов

// При загрузке окна начинается игра
window.onload = function() {
    setGame();
}

// Настройка игры
function setGame() {

    // Создаем пустой массив для игрового поля
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // Создаем HTML-элементы для игрового поля и заполняем его пустыми ячейками
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    // Создаем две плитки со значением 2, чтобы начать игру
    setTwo();
    setTwo();

}

// Обновление визуального представления плитки на игровом поле
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; // Очищаем классы элемента
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

// Обработчик события нажатия клавиши
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();

    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score; // Обновляем отображение счета
})

// Функция фильтрации нулевых значений в массиве
function filterZero(row){
    return row.filter(num => num != 0); // Создаем новый массив без нулей
}

// Функция сдвига элементов массива влево
function slide(row) {
    row = filterZero(row); // Фильтруем нули
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) { // Если два соседних элемента равны
            row[i] *= 2; // Удваиваем значение первого элемента
            row[i+1] = 0; // Устанавливаем второй элемент как ноль
            score += row[i]; // Увеличиваем счет на значение первого элемента
        }
    }
    row = filterZero(row); // Фильтруем нули
    // Добавляем нули в конец массива, чтобы восстановить исходную длину
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

// Функция сдвига элементов массива влево
function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        // Обновляем визуальное представление плиток на игровом поле
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Функция сдвига элементов массива вправо
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse(); // Разворачиваем массив
        row = slide(row); // Применяем сдвиг
        board[r] = row.reverse(); // Разворачиваем массив обратно
        // Обновляем визуальное представление плиток на игровом поле
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Функция сдвига элементов массива вверх
function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]; // Получаем столбец
        row = slide(row); // Применяем сдвиг
        // Обновляем визуальное представление плиток на игровом поле
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Функция сдвига элементов массива вниз
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]; // Получаем столбец
        row.reverse(); // Разворачиваем массив
        row = slide(row); // Применяем сдвиг
        row.reverse(); // Разворачиваем массив обратно
        // Обновляем визуальное представление плиток на игровом поле
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Функция создания новой плитки со значением 2
function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    // Пока не будет найдена пустая ячейка, продолжаем попытки установки значения 2
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

// Функция проверки наличия пустых ячеек на игровом поле
function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { // Проверяем, есть ли хотя бы один ноль на игровом поле
                return true;
            }
        }
    }
    return false;
}