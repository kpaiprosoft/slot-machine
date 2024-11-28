const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800; // Ширина холста
canvas.height = 600; // Высота холста

// Параметры барабанов
const reelX = [200, 400, 600];
const reelY = 200;
const reelWidth = 100;
const reelHeight = 200;
let spinning = [true, true, true];
let finalNumbers = [0, 0, 0];
let stopDelays = [1000, 2000, 3000]; // Задержка остановки каждого барабана

// Функция для отображения числа
function drawNumber(x, y, number, glow = false) {
    ctx.font = '80px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.shadowColor = glow ? 'yellow' : 'transparent';
    ctx.shadowBlur = glow ? 20 : 0;
    ctx.fillText(number, x, y);
}

// Анимация прокрутки
function spinReels() {
    const startTime = Date.now();
    const spinInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Отрисовка барабанов
        for (let i = 0; i < 3; i++) {
            if (spinning[i]) {
                const elapsed = Date.now() - startTime;
                if (elapsed >= stopDelays[i]) {
                    spinning[i] = false;
                    finalNumbers[i] = Math.floor(Math.random() * 10); // Случайное число
                }
            }
            const number = spinning[i] ? Math.floor(Math.random() * 10) : finalNumbers[i];
            drawNumber(reelX[i], reelY, number, !spinning[i]); // Свечение итогового числа
        }

        // Проверка окончания
        if (!spinning.includes(true)) {
            clearInterval(spinInterval);
        }
    }, 100); // Обновление каждые 100 мс
}

// Кнопка Spin
document.getElementById('spinButton').addEventListener('click', () => {
    spinning = [true, true, true];
    spinReels();
});
