document.addEventListener("DOMContentLoaded", () => {

    const reveals = document.querySelectorAll(".reveal");

    // Fallback если браузер старый
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add("visible"));
    } else {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible"); // ← было "active", должно быть "visible"
                    observer.unobserve(entry.target); // ← отписываемся, экономим память
                }
            });
        }, { 
            threshold: 0.1,      // ← было 0.15, уменьшил — на мобиле элементы крупнее
            rootMargin: '0px 0px -30px 0px' // ← срабатывает чуть раньше
        });

        reveals.forEach(el => observer.observe(el));
    }

    // FAQ аккордеон
    document.querySelectorAll(".faq-question").forEach(q => {
        q.addEventListener("click", () => {
            q.parentElement.classList.toggle("open"); // ← лучше "open" чтобы не конфликтовать с reveal
        });
    });

});