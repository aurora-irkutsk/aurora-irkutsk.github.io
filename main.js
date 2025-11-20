// =============
// Инициализация после загрузки DOM
// =============
document.addEventListener('DOMContentLoaded', function () {
  initGallery();
  initBurgerMenu();
  initCallModal(); // Теперь включает обработку формы
});

// =============
// Галерея (Lightbox)
// =============
function initGallery() {
  // Отключаем галерею на мобильных и планшетах
  if (window.innerWidth < 768) {
    return;
  }

  const imageModal = document.getElementById('imageModal');
  if (!imageModal) return;

  const modalImg = document.getElementById('modalImage');
  const closeBtn = imageModal.querySelector('.modal__close');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const counter = document.getElementById('imageCounter');
  const images = document.querySelectorAll('.portfolio__item img');

  if (images.length === 0) return;

  let currentIndex = 0;

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
    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
  }

  const closeModal = () => {
    imageModal.style.display = 'none';
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) closeModal();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
      modalImg.src = images[currentIndex].src;
      modalImg.alt = images[currentIndex].alt;
      updateCounter();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
      modalImg.src = images[currentIndex].src;
      modalImg.alt = images[currentIndex].alt;
      updateCounter();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (imageModal.style.display !== 'block') return;
    if (e.key === 'ArrowLeft') prevBtn?.click();
    if (e.key === 'ArrowRight') nextBtn?.click();
    if (e.key === 'Escape') closeModal();
  });
}

// =============
// Бургер-меню
// =============
function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Если элементов нет — выходим
  if (!burger || !mobileMenu) return;

  // Переключение меню
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Закрытие по клику на ссылку
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // Закрытие по клику вне меню
  document.addEventListener('click', (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !burger.contains(e.target) &&
      mobileMenu.classList.contains('active')
    ) {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });
}

// =============
// Попап "Вызвать мастера" + Обработка формы
// =============

function initCallModal() {
  const callModal = document.getElementById('callModal');
  const openCallBtn = document.getElementById('openCallModal'); // Ищем кнопку по ID
  const closeCallBtn = document.getElementById('closeCallModal');

  // Если модальное окно существует
  if (callModal) {
    // Если кнопка с ID #openCallModal не найдена, ищем по классу или другому признаку
    let triggerElement = openCallBtn;
    if (!triggerElement) {
      // Пример: ищем элемент с классом .call-master-btn (можете изменить под себя)
      triggerElement = document.querySelector('.call-master-btn');
    }

    if (triggerElement) {
      const openCallModal = () => {
        callModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      };

      triggerElement.addEventListener('click', openCallModal);
    }

    // Обработчик закрытия
    if (closeCallBtn) {
      const closeCallModal = () => {
        callModal.style.display = 'none';
        document.body.style.overflow = '';
      };

      closeCallBtn.addEventListener('click', closeCallModal);

      // Закрытие по клику на оверлей
      callModal.addEventListener('click', (e) => {
        if (e.target === callModal) closeCallModal();
      });
    }
  }

  // --- Обработка формы в модальном окне ---
  const callForm = document.getElementById('callForm');
  if (callForm) {
    // Функция для отправки данных в Telegram
    const sendToTelegram = (formData) => {
        const name = formData.get('name');
        const phone = formData.get('phone');
        const message = `📞 Новая заявка!\n\nИмя: ${name}\nТелефон: ${phone}`;
        const telegramToken = '8507972786:AAHMOrUajwIcq9EXt2G3mcrkeYn28ahV_Do';
        const telegramChatId = '5547229126';
        const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

        return fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
    };

    callForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Остановить стандартную отправку
        const formData = new FormData(callForm);

        sendToTelegram(formData)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert('Заявка успешно отправлена! Мы перезвоним вам в течение 30 минут.');
                    callForm.reset();
                    // Закрыть модальное окно после успешной отправки (опционально)
                    // document.getElementById('closeCallModal').click();
                } else {
                    console.error('Ошибка Telegram API:', data);
                    alert('Ошибка при отправке. Попробуйте позже.');
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке в Telegram:', error);
                alert('Ошибка сети. Попробуйте позже.');
            });
    });
  }

  // --- Обработка формы в разделе "request" ---
  const requestForm = document.getElementById('requestForm');
  if (requestForm) {
    requestForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Остановить стандартную отправку
        const formData = new FormData(requestForm);

        // Используем ту же функцию для отправки
        sendToTelegram(formData)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert('Заявка успешно отправлена! Мы перезвоним вам в течение 30 минут.');
                    requestForm.reset();
                } else {
                    console.error('Ошибка Telegram API:', data);
                    alert('Ошибка при отправке. Попробуйте позже.');
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке в Telegram:', error);
                alert('Ошибка сети. Попробуйте позже.');
            });
    });
  }
}

