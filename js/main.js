document.addEventListener('DOMContentLoaded', function () {
  /*
   * COOKIE BANNER
   */

  const banner = document.getElementById('cookieBanner');
  const acceptCookies = document.getElementById('acceptCookies');
  const rejectCookies = document.getElementById('rejectCookies');

  if (banner) {
    try {
      const cookiesAccepted = localStorage.getItem('cookies_accepted');

      if (!cookiesAccepted) {
        banner.style.display = 'flex';
      }
    } catch (error) {
      banner.style.display = 'flex';
    }

    if (acceptCookies) {
      acceptCookies.addEventListener('click', function () {
        try {
          localStorage.setItem('cookies_accepted', 'yes');
        } catch (error) {}

        banner.style.display = 'none';
      });
    }

    if (rejectCookies) {
      rejectCookies.addEventListener('click', function () {
        try {
          localStorage.setItem('cookies_accepted', 'no');
        } catch (error) {}

        banner.style.display = 'none';
      });
    }
  }


  /*
   * FAQ — раскрывающиеся вопросы
   */

  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const faqItem = question.closest('.faq-item');

      if (!faqItem) {
        return;
      }

      const answer = faqItem.querySelector('.faq-answer');

      if (!answer) {
        return;
      }

      const isOpen = answer.classList.toggle('open');

      question.classList.toggle('active', isOpen);
      question.setAttribute('aria-expanded', String(isOpen));
    });
  });


  /*
   * LIGHTBOX ДЛЯ СЕРТИФИКАТОВ
   */

  const overlay = document.createElement('div');
  overlay.className = 'certificate-lightbox-overlay';
  overlay.style.display = 'none';
  overlay.setAttribute('aria-hidden', 'true');

  const lightboxImage = document.createElement('img');
  lightboxImage.alt = 'Документ — увеличенное изображение';

  overlay.appendChild(lightboxImage);

  const closeButton = document.createElement('button');
  closeButton.className = 'certificate-lightbox-close';
  closeButton.type = 'button';
  closeButton.innerHTML = '✕';
  closeButton.title = 'Закрыть изображение';
  closeButton.setAttribute('aria-label', 'Закрыть изображение');
  closeButton.style.display = 'none';

  document.body.appendChild(closeButton);
  document.body.appendChild(overlay);

  function openLightbox(src, alt) {
    if (!src) {
      return;
    }

    lightboxImage.src = src;
    lightboxImage.alt = alt || 'Документ';

    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');

    closeButton.style.display = 'block';
    document.body.classList.add('lb-open');

    closeButton.focus();
  }

  function closeLightbox() {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');

    closeButton.style.display = 'none';
    document.body.classList.remove('lb-open');

    lightboxImage.src = '';
  }

  overlay.addEventListener('click', function (event) {
    if (event.target !== lightboxImage) {
      closeLightbox();
    }
  });

  closeButton.addEventListener('click', function () {
    closeLightbox();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });

  document.addEventListener('click', function (event) {
    const certificate = event.target.closest('.certificate-img');

    if (!certificate) {
      return;
    }

    const largeImage =
      certificate.dataset.large ||
      certificate.currentSrc ||
      certificate.src;

    openLightbox(largeImage, certificate.alt);
  });
});