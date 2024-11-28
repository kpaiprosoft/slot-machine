document.addEventListener("DOMContentLoaded", () => {
  const numbers = [
    document.getElementById("number-1"),
    document.getElementById("number-2"),
    document.getElementById("number-3"),
  ];

  // Функция для изменения положения чисел
  const setNumberPosition = (numberIndex, topPx, leftPx) => {
    const numberElement = numbers[numberIndex];
    numberElement.style.position = 'absolute'; // Устанавливаем абсолютное позиционирование
    numberElement.style.top = `${topPx}px`;
    numberElement.style.left = `${leftPx}px`;
  };

  // Пример задания позиции в пикселях для каждого числа
  setNumberPosition(0, 270, -606); // Позиция первого числа
  setNumberPosition(1, 270, -346); // Позиция второго числа
  setNumberPosition(2, 270, -76); // Позиция третьего числа

  const spinReels = () => {
    let finalNumbers = [];
    let currentNumbers = [0, 0, 0];

    // Генерация корректных финальных чисел
    do {
      finalNumbers = [
        Math.floor(Math.random() * 2), // Первый номер: 0 или 1
        Math.floor(Math.random() * 10), // Второй номер: 0-9
        Math.floor(Math.random() * 10), // Третий номер: 0-9
      ];
    } while (parseInt(finalNumbers.join("")) > 199);

    // Крутить числа
    numbers.forEach((number, index) => {
      let interval = setInterval(() => {
        currentNumbers[index] =
          index === 0
            ? Math.floor(Math.random() * 2) // Первый номер: 0 или 1
            : Math.floor(Math.random() * 10); // Второй и третий: 0-9
        number.textContent = currentNumbers[index];
      }, 100);

      // Останавливаем номер с задержкой
      setTimeout(() => {
        clearInterval(interval);
        number.textContent = finalNumbers[index]; // Устанавливаем финальное число

        // Добавляем анимацию свечения
        if (index === 2) {
          numbers.forEach((n) => {
            n.classList.add("glowing"); // Включаем анимацию для всех чисел
          });
        }
      }, 1000 + index * 1500); // Увеличиваем задержку для каждого следующего номера
    });
  };

  // Кнопка "Крутить!"
  const spinButton = document.getElementById("spin-button");
  spinButton.addEventListener("click", () => {
    // Убираем предыдущее свечение перед новой прокруткой
    numbers.forEach((n) => {
      n.classList.remove("glowing");
    });

    spinReels();
  });
});
