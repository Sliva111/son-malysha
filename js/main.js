document.addEventListener("DOMContentLoaded", () => {

    // ── REVEAL ──────────────────────────────────────────────
    // Добавляем класс на html — CSS включает анимации
    // Делаем это сразу, до observer, чтобы не было мигания
    const isMobile = window.innerWidth < 768;

    if (!isMobile && 'IntersectionObserver' in window) {
        // На десктопе — полная анимация
        document.documentElement.classList.add('js-reveal-ready');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -20px 0px'
        });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    }
    // На мобиле — js-reveal-ready НЕ добавляется
    // Все .reveal сразу видимы (opacity:1 по умолчанию в CSS)

    // ── FAQ ──────────────────────────────────────────────────
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            q.parentElement.classList.toggle('open');
        });
    });

    // ── ЗВЁЗДЫ ───────────────────────────────────────────────
    // Только на десктопе, только в свободное время браузера
    if (!isMobile) {
        const createStars = () => {
            const overlay = document.getElementById('starsOverlay');
            if (!overlay) return;

            const fragment = document.createDocumentFragment();
            const count = 120;

            for (let i = 0; i < count; i++) {
                const star = document.createElement('div');
                star.className = 'star';

                const size = Math.random();
                let w, opacity;
                if (size < 0.6)      { w = 1; opacity = 0.3 + Math.random() * 0.4; }
                else if (size < 0.9) { w = 2; opacity = 0.5 + Math.random() * 0.4; }
                else                 { w = 3; opacity = 0.8 + Math.random() * 0.2; }

                let css = `position:absolute;width:${w}px;height:${w}px;`
                        + `border-radius:50%;`
                        + `left:${(Math.random()*100).toFixed(1)}%;`
                        + `top:${(Math.random()*100).toFixed(1)}%;`
                        + `opacity:${opacity.toFixed(2)};`;

                if (w >= 2) {
                    const dur = (3 + Math.random() * 5).toFixed(1);
                    const del = (Math.random() * 5).toFixed(1);
                    css += `animation:starTwinkle ${dur}s ease-in-out infinite alternate;`
                         + `animation-delay:${del}s;`;
                }

                const rand = Math.random();
                if      (rand < 0.05) css += 'background:#aaddff;box-shadow:0 0 3px #aaddff;';
                else if (rand < 0.10) css += 'background:#ffddaa;box-shadow:0 0 3px #ffddaa;';

                star.style.cssText = css;
                fragment.appendChild(star);
            }

            overlay.appendChild(fragment);
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(createStars, { timeout: 2000 });
        } else {
            setTimeout(createStars, 500);
        }
    }

});