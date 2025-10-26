document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.modal__close');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const counter = document.getElementById('imageCounter');

  const images = document.querySelectorAll('.portfolio__item img');
  let currentIndex = 0;

  // Открытие модального окна
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      modalImg.src = img.src;
      modal.style.display = 'block';
      updateCounter();
    });
  });

  // Закрытие по крестику или клику вне изображения
  closeBtn.onclick = () => modal.style.display = 'none';
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Переключение стрелками
  prevBtn.onclick = () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    modalImg.src = images[currentIndex].src;
    updateCounter();
  };

  nextBtn.onclick = () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    modalImg.src = images[currentIndex].src;
    updateCounter();
  };

  // Управление клавиатурой (← → Esc)
  document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'block') return;
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') modal.style.display = 'none';
  });

  function updateCounter() {
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }
});

// Попап "Вызвать мастера"
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('callModal');
  const openBtn = document.getElementById('openCallModal');
  const closeBtn = document.getElementById('closeCallModal');
  const form = document.getElementById('callForm');

  if (!openBtn || !modal || !closeBtn) return;

  // Открытие
  openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // запрет прокрутки
  });

  // Закрытие по крестику
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // вернуть прокрутку
  });

  // Закрытие по клику вне окна
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // Отправка формы (опционально: можно показать "спасибо")
  if (form) {
    form.addEventListener('submit', (e) => {
      // Можно добавить обработку успешной отправки
      // Пока просто отправляем через Formspree
    });
  }
});