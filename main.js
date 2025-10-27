document.addEventListener('DOMContentLoaded', function () {
  // =============
  // Галерея (Lightbox)
  // =============
  const imageModal = document.getElementById('imageModal');
  if (imageModal) {
    const modalImg = document.getElementById('modalImage');
    const closeBtn = imageModal.querySelector('.modal__close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counter = document.getElementById('imageCounter');
    const images = document.querySelectorAll('.portfolio__item img');
    let currentIndex = 0;

    if (images.length > 0) {
      images.forEach((img, index) => {
        img.addEventListener('click', () => {
          currentIndex = index;
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          imageModal.style.display = 'block';
          updateCounter();
          document.body.style.overflow = 'hidden';
        });
      });

      function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
      }

      // Закрытие
      const closeModal = () => {
        imageModal.style.display = 'none';
        document.body.style.overflow = '';
      };

      closeBtn?.addEventListener('click', closeModal);
      imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeModal();
      });

      // Навигация
      prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        modalImg.src = images[currentIndex].src;
        modalImg.alt = images[currentIndex].alt;
        updateCounter();
      });

      nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        modalImg.src = images[currentIndex].src;
        modalImg.alt = images[currentIndex].alt;
        updateCounter();
      });

      // Клавиатура
      document.addEventListener('keydown', (e) => {
        if (imageModal.style.display !== 'block') return;
        if (e.key === 'ArrowLeft') prevBtn?.click();
        if (e.key === 'ArrowRight') nextBtn?.click();
        if (e.key === 'Escape') closeModal();
      });
    }
  }

  // =============
  // Попап "Вызвать мастера"
  // =============
  const callModal = document.getElementById('callModal');
  const openCallBtn = document.getElementById('openCallModal');
  const closeCallBtn = document.getElementById('closeCallModal');
  const callForm = document.getElementById('callForm');

  if (callModal && openCallBtn && closeCallBtn) {
    const openCallModal = () => {
      callModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    };

    const closeCallModal = () => {
      callModal.style.display = 'none';
      document.body.style.overflow = '';
    };

    openCallBtn.addEventListener('click', openCallModal);
    closeCallBtn.addEventListener('click', closeCallModal);
    window.addEventListener('click', (e) => {
      if (e.target === callModal) closeCallModal();
    });

    // Обработка отправки формы
    if (callForm) {
      callForm.addEventListener('submit', function (e) {
        e.preventDefault(); // если хочешь кастомную отправку
        // Но Formspree работает и без этого — можно оставить как есть
        // Или показать "спасибо":
        // callForm.innerHTML = '<p style="text-align:center; color:white; font-size:18px;">Спасибо! Скоро перезвоним.</p>';
      });
    }
  }

  // =============
  // Попап "Рассчитать стоимость" (если добавишь позже)
  // =============
  // Аналогично можно добавить, если создашь estimateModal
});
