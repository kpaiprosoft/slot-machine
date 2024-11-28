document.addEventListener("DOMContentLoaded", () => {
  const reels = [
    document.getElementById("reel-1"),
    document.getElementById("reel-2"),
    document.getElementById("reel-3"),
  ];

  const spinReels = () => {
    let finalNumbers = [];
    let currentNumbers = [0, 0, 0];

    // Генерируем корректные финальные числа
    do {
      finalNumbers = [
        Math.floor(Math.random() * 2), // Первый барабан: 0 или 1
        Math.floor(Math.random() * 10), // Второй барабан: 0-9
        Math.floor(Math.random() * 10), // Третий барабан: 0-9
      ];
    } while (parseInt(finalNumbers.join("")) > 199);

    reels.forEach((reel, index) => {
      let interval = setInterval(() => {
        currentNumbers[index] =
          index === 0
            ? Math.floor(Math.random() * 2) // Первый барабан: 0 или 1
            : Math.floor(Math.random() * 10); // Второй и третий: 0-9
        reel.textContent = currentNumbers[index];
      }, 100);

      // Останавливаем барабан с задержкой
      setTimeout(() => {
        clearInterval(interval);
        reel.textContent = finalNumbers[index]; // Устанавливаем финальное число

        // Если это последний барабан, добавляем эффект свечения
        if (index === 2) {
          reels.forEach((r) => {
            r.style.color = "yellow";
            r.style.textShadow = "0px 0px 20px yellow";
          });
        }
      }, 1000 + index * 500); // Увеличиваем задержку для каждого следующего барабана
    });
  };

  // Запуск прокрутки при нажатии пробела
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      // Убираем предыдущее свечение перед новой прокруткой
      reels.forEach((r) => {
        r.style.color = "black";
        r.style.textShadow = "none";
      });

      spinReels();
    }
  });
});
