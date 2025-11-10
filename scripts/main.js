// Константи для мессенджерів (замініть на реальні)
const TELEGRAM_USERNAME = 'your_profile';
const WHATSAPP_PHONE = '380000000000';

// Black Friday end date (30 листопада 2025, 23:59:59)
const BLACK_FRIDAY_END = new Date('2025-11-30T23:59:59').getTime();

// Нова модель ціноутворення (USD)
const PRICING = {
  // Базова ціна для найменшої фігурки
  basePrice: 80, // $80 для 10 см
  
  // Множники розміру
  sizeMultipliers: {
    10: 1.0,    // $80
    15: 1.4,    // $112
    20: 1.9,    // $152
    25: 2.5,    // $200
    30: 3.2     // $256
  },
  
  // Складність моделювання (додається до базової ціни)
  complexityFees: {
    simple: 0,      // Проста поза, без аксесуарів
    medium: 20,     // Складна поза або 1-2 аксесуари
    complex: 50     // Дуже складна поза, багато аксесуарів, тварини
  },
  
  // Якість друку (множник до загальної ціни)
  qualityMultipliers: {
    standard: 1.0,   // Звичайна якість (0.2mm layers)
    high: 1.3,       // Висока якість (0.12mm layers)
    premium: 1.6     // Преміум (0.08mm layers + ручна обробка)
  },
  
  // Функція розрахунку фінальної ціни
  calculate: function(size, complexity, quality) {
    const baseForSize = this.basePrice * this.sizeMultipliers[size];
    const withComplexity = baseForSize + this.complexityFees[complexity];
    const finalPrice = Math.round(withComplexity * this.qualityMultipliers[quality]);
    return finalPrice;
  }
};

// Дані калькулятора (години × 3)
const CALCULATOR_DATA = {
  10: { queue: 6, model: 72, paint: 72, print: 16.5, dry: 72, total: 103.5 },
  15: { queue: 6, model: 108, paint: 72, print: 25.5, dry: 72, total: 121.5 },
  20: { queue: 6, model: 144, paint: 108, print: 34.5, dry: 72, total: 148.5 },
  25: { queue: 6, model: 216, paint: 144, print: 42, dry: 72, total: 180 },
  30: { queue: 6, model: 288, paint: 192, print: 56, dry: 96, total: 240 }
};

// Відгуки
const REVIEWS = [
  {
    name: 'Анна',
    location: 'Москва',
    quote: 'Заказала фигурку по фото мужа — получилось очень похоже! Детализация впечатляет.',
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'Игорь',
    location: 'Санкт-Петербург',
    quote: 'Подарок коллеге получился топ! Упаковка, покраска — всё на уровне.',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'Мария',
    location: 'Киев',
    quote: 'Фигурка 20 см с котом — отдельная любовь. Спасибо за терпение!',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80'
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  setupRevealAnimations();
  setupSmoothScroll();
  setupCalculator();
  setupReviewsSlider();
  setupContactForm();
  setupHeaderWriteBtn();
  setupScrollEffects();
  setupParallaxEffect();
  setupTooltips();
  setupKeyboardNavigation();
  setupCopyToClipboard();
  setupFormValidation();
  setupFAB();
  setupReadingProgress();
  setupTimelineAnimations();
  setupBlackFridayBanner();
  setupBlackFridayTimer();
});

// Ефекти при скролі
function setupScrollEffects() {
  const nav = document.querySelector('.main-nav');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Parallax ефект для hero
function setupParallaxEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });
}

// Tooltips для кнопок та іконок
function setupTooltips() {
  const createTooltip = (text) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    return tooltip;
  };
  
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    let tooltip = null;
    
    el.addEventListener('mouseenter', (e) => {
      tooltip = createTooltip(el.dataset.tooltip);
      const rect = el.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 40}px`;
      
      setTimeout(() => tooltip.classList.add('visible'), 10);
    });
    
    el.addEventListener('mouseleave', () => {
      if (tooltip) {
        tooltip.classList.remove('visible');
        setTimeout(() => tooltip.remove(), 200);
      }
    });
  });
}

// Keyboard navigation для слайдера
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      document.getElementById('prev-review')?.click();
    } else if (e.key === 'ArrowRight') {
      document.getElementById('next-review')?.click();
    }
  });
}

// Copy to clipboard функціонал
function setupCopyToClipboard() {
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-link-btn';
  copyBtn.innerHTML = '📋 Копіювати посилання';
  copyBtn.style.display = 'none';
  
  copyBtn.addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      copyBtn.innerHTML = '✅ Скопійовано!';
      setTimeout(() => {
        copyBtn.innerHTML = '📋 Копіювати посилання';
      }, 2000);
    });
  });
}

// Form validation з real-time feedback
function setupFormValidation() {
  const phoneInput = document.getElementById('phone');
  const nameInput = document.getElementById('full-name');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 0) {
        if (value.startsWith('380')) {
          value = '+380' + value.slice(3);
        } else if (value.startsWith('7')) {
          value = '+7' + value.slice(1);
        } else if (!value.startsWith('+')) {
          value = '+' + value;
        }
        
        e.target.value = value;
        
        // Валідація
        const isValid = value.length >= 12;
        e.target.style.borderColor = isValid 
          ? 'rgba(16, 185, 129, 0.5)' 
          : 'rgba(255, 255, 255, 0.1)';
      }
    });
  }
  
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      if (value.length > 0) {
        e.target.style.borderColor = value.length >= 2
          ? 'rgba(16, 185, 129, 0.5)'
          : 'rgba(255, 255, 255, 0.1)';
      }
    });
  }
}

// Floating Action Button
function setupFAB() {
  const fabMain = document.getElementById('fab-main');
  const fabMenu = document.getElementById('fab-menu');
  const fabTelegram = document.getElementById('fab-telegram');
  const fabWhatsapp = document.getElementById('fab-whatsapp');
  
  if (!fabMain || !fabMenu) return;
  
  let isOpen = false;
  
  fabMain.addEventListener('click', () => {
    isOpen = !isOpen;
    fabMenu.classList.toggle('active', isOpen);
    fabMain.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
  });
  
  // Закриваємо меню при кліку поза ним
  document.addEventListener('click', (e) => {
    if (!fabMain.contains(e.target) && !fabMenu.contains(e.target) && isOpen) {
      isOpen = false;
      fabMenu.classList.remove('active');
      fabMain.style.transform = 'rotate(0deg)';
    }
  });
  
  // Telegram FAB
  if (fabTelegram) {
    fabTelegram.addEventListener('click', (e) => {
      e.preventDefault();
      
      const defaultPrice = PRICING.calculate(10, 'medium', 'high');
      
      // Facebook Pixel Lead Event
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: '3D фигурка - FAB Telegram',
          content_category: '3D Figurines',
          value: defaultPrice,
          currency: 'USD',
          status: 'fab_telegram'
        });
      }
      
      const message = encodeURIComponent('Привет! Хочу узнать подробнее о ваших 3D-фигурках! BLACK FRIDAY: Бесплатная доставка! 🚚');
      window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${message}`, '_blank');
      
      if (window.gtag) {
        gtag('event', 'generate_lead', {
          currency: 'USD',
          value: defaultPrice,
          method: 'fab_telegram'
        });
      }
    });
  }
  
  // WhatsApp FAB
  if (fabWhatsapp) {
    fabWhatsapp.addEventListener('click', (e) => {
      e.preventDefault();
      
      const defaultPrice = PRICING.calculate(10, 'medium', 'high');
      
      // Facebook Pixel Lead Event
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: '3D фигурка - FAB WhatsApp',
          content_category: '3D Figurines',
          value: defaultPrice,
          currency: 'USD',
          status: 'fab_whatsapp'
        });
      }
      
      const message = encodeURIComponent('Привет! Хочу узнать подробнее о ваших 3D-фигурках! BLACK FRIDAY: Бесплатная доставка! 🚚');
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, '_blank');
      
      if (window.gtag) {
        gtag('event', 'generate_lead', {
          currency: 'USD',
          value: defaultPrice,
          method: 'fab_whatsapp'
        });
      }
    });
  }
  
  // Ховаємо FAB при скролі вниз, показуємо при скролі вгору
  let lastScrollY = window.pageYOffset;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      // Скрол вниз
      fabMain.style.transform = 'translateY(120px)';
    } else {
      // Скрол вгору
      fabMain.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

// Reading Progress Indicator
function setupReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    
    const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  });
}

// Timeline Animations
function setupTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const paymentCards = document.querySelectorAll('.payment-card');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.2 }
  );
  
  timelineItems.forEach((item) => observer.observe(item));
  paymentCards.forEach((card) => observer.observe(card));
}

// Black Friday Banner
function setupBlackFridayBanner() {
  const banner = document.getElementById('promo-banner');
  const closeBtn = document.getElementById('promo-close');
  
  if (!banner || !closeBtn) return;
  
  // Перевіряємо чи користувач вже закривав банер
  const bannerClosed = localStorage.getItem('bf-banner-closed');
  
  if (bannerClosed === 'true') {
    banner.classList.add('hidden');
    document.body.classList.add('banner-closed');
  }
  
  closeBtn.addEventListener('click', () => {
    banner.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => {
      banner.classList.add('hidden');
      document.body.classList.add('banner-closed');
      localStorage.setItem('bf-banner-closed', 'true');
    }, 300);
  });
}

// Black Friday Countdown Timer
function setupBlackFridayTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  
  if (!daysEl || !hoursEl || !minsEl) return;
  
  function updateTimer() {
    const now = new Date().getTime();
    const distance = BLACK_FRIDAY_END - now;
    
    if (distance < 0) {
      // Акція закінчилась
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      
      // Ховаємо банер та badge
      const banner = document.getElementById('promo-banner');
      const badge = document.querySelector('.black-friday-badge');
      const bfSectionBadge = document.querySelector('.bf-section-badge');
      
      if (banner) banner.classList.add('hidden');
      if (badge) badge.style.display = 'none';
      if (bfSectionBadge) bfSectionBadge.style.display = 'none';
      
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
  }
  
  updateTimer();
  setInterval(updateTimer, 60000); // Оновлюємо кожну хвилину
}

// Copy promo code on click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('promo-code')) {
    const code = e.target.textContent;
    navigator.clipboard.writeText(code).then(() => {
      const originalText = e.target.textContent;
      e.target.textContent = '✓ Скопійовано!';
      e.target.style.background = 'rgba(16, 185, 129, 0.2)';
      e.target.style.borderColor = '#10b981';
      e.target.style.color = '#10b981';
      
      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.background = '';
        e.target.style.borderColor = '';
        e.target.style.color = '';
      }, 2000);
      
      if (window.gtag) {
        gtag('event', 'promo_code_copied', { code });
      }
    });
  }
});

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || '0s';
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  
  revealElements.forEach((el) => observer.observe(el));
}

function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setupCalculator() {
  const sizeButtons = document.querySelectorAll('.size-btn');
  const totalHoursEl = document.getElementById('total-hours');
  const noteEl = document.getElementById('calc-note');
  const complexitySelect = document.getElementById('complexity-select');
  const qualitySelect = document.getElementById('quality-select');
  const finalPriceEl = document.getElementById('final-price');
  
  function updateCalculator(size) {
    const data = CALCULATOR_DATA[size];
    const maxHours = Math.max(data.queue, data.model, data.paint, data.print, data.dry);
    
    // Отримуємо вибрані опції
    const complexity = complexitySelect ? complexitySelect.value : 'medium';
    const quality = qualitySelect ? qualitySelect.value : 'high';
    
    // Розраховуємо ціну
    const price = PRICING.calculate(parseInt(size), complexity, quality);
    
    // Оновлюємо відображення ціни
    if (finalPriceEl) {
      finalPriceEl.textContent = `$${price}`;
    }
    
    // Анімація з затримкою
    const fills = ['queue-fill', 'model-fill', 'paint-fill', 'print-fill', 'dry-fill'];
    const hours = ['queue-hours', 'model-hours', 'paint-hours', 'print-hours', 'dry-hours'];
    const values = [data.queue, data.model, data.paint, data.print, data.dry];
    
    fills.forEach((fillId, index) => {
      const fillEl = document.getElementById(fillId);
      const hoursEl = document.getElementById(hours[index]);
      
      if (!fillEl || !hoursEl) return;
      
      // Спочатку скидаємо
      fillEl.style.transition = 'none';
      fillEl.style.width = '0%';
      
      // Анімуємо з затримкою
      setTimeout(() => {
        fillEl.style.transition = 'width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)';
        fillEl.style.width = `${(values[index] / maxHours) * 100}%`;
        hoursEl.textContent = `${values[index]} ч`;
      }, index * 100);
    });
    
    // Анімація total з counter
    if (totalHoursEl) {
      setTimeout(() => {
        totalHoursEl.style.transform = 'scale(1.1)';
        animateCounter(totalHoursEl, data.total);
        setTimeout(() => {
          totalHoursEl.style.transform = 'scale(1)';
        }, 200);
      }, 600);
    }
    
    if (parseInt(size) >= 30) {
      noteEl.textContent = 'Фигурки от 30+ см изготавливаются индивидуально. Расчёт времени приблизительный.';
      noteEl.style.display = 'block';
    } else {
      noteEl.style.display = 'none';
    }
  }

  sizeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      
      const size = btn.dataset.size;
      updateCalculator(size);
      
      if (window.gtag) {
        gtag('event', 'calc_size_select', { size });
      }
    });
  });
  
  // Слухачі для селектів
  if (complexitySelect) {
    complexitySelect.addEventListener('change', () => {
      const activeBtn = document.querySelector('.size-btn.active');
      if (activeBtn) {
        updateCalculator(activeBtn.dataset.size);
      }
    });
  }
  
  if (qualitySelect) {
    qualitySelect.addEventListener('change', () => {
      const activeBtn = document.querySelector('.size-btn.active');
      if (activeBtn) {
        updateCalculator(activeBtn.dataset.size);
      }
    });
  }
  
  updateCalculator('10');
}

// Smooth counter animation
function animateCounter(element, targetValue) {
  const duration = 800;
  const start = parseFloat(element.textContent) || 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuad = progress * (2 - progress);
    const current = start + (targetValue - start) * easeOutQuad;
    
    element.textContent = `${current.toFixed(1)} ч`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = `${targetValue} ч`;
    }
  }
  
  requestAnimationFrame(update);
}

function setupReviewsSlider() {
  const prevBtn = document.getElementById('prev-review');
  const nextBtn = document.getElementById('next-review');
  const contentEl = document.getElementById('review-content');
  const dotsContainer = document.getElementById('slider-dots');
  
  let currentIndex = 0;
  
  function renderReview(index) {
    const review = REVIEWS[index];
    
    // Skeleton loading
    contentEl.innerHTML = `
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text" style="width: 80%"></div>
      <div class="skeleton skeleton-image"></div>
    `;
    
    // Симулюємо завантаження
    setTimeout(() => {
      const imagesMarkup = review.images
        .map((img, i) => `<img src="${img}" alt="Отзыв ${review.name}" loading="lazy" onload="this.classList.add('loaded')">`)
        .join('');
      
      contentEl.innerHTML = `
        <div class="review-header">
          <h3>${review.name}, ${review.location}</h3>
        </div>
        <blockquote>"${review.quote}"</blockquote>
        <div class="review-media" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px;">
          ${imagesMarkup}
        </div>
      `;
      
      document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      if (window.gtag) {
        gtag('event', 'review_slide_change', { index });
      }
    }, 300);
  }
  
  function createDots() {
    dotsContainer.innerHTML = REVIEWS.map((_, i) => 
      `<span class="dot" data-index="${i}"></span>`
    ).join('');
    
    document.querySelectorAll('.dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index);
        renderReview(currentIndex);
      });
    });
  }
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + REVIEWS.length) % REVIEWS.length;
    renderReview(currentIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % REVIEWS.length;
    renderReview(currentIndex);
  });
  
  createDots();
  renderReview(0);
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('full-name');
  const phoneInput = document.getElementById('phone');
  const sizeSelect = document.getElementById('size');
  const telegramBtn = document.getElementById('telegram-button');
  const whatsappBtn = document.getElementById('whatsapp-button');
  const statusEl = document.getElementById('form-status');
  
  statusEl.textContent = 'Выберите удобный мессенджер — форма необязательна!';
  statusEl.style.color = 'var(--accent)';
  
  function openMessenger(messenger) {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const size = sizeSelect.value;
    
    // Отримуємо вибрані опції
    const complexitySelect = document.getElementById('complexity-select');
    const qualitySelect = document.getElementById('quality-select');
    const complexity = complexitySelect ? complexitySelect.value : 'medium';
    const quality = qualitySelect ? qualitySelect.value : 'high';
    
    // Розраховуємо фінальну ціну
    const finalPrice = PRICING.calculate(parseInt(size || 10), complexity, quality);
    
    // Facebook Pixel Lead Event
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: `3D фигурка ${size || '10'} см`,
        content_category: '3D Figurines',
        value: finalPrice,
        currency: 'USD',
        predicted_ltv: finalPrice,
        status: 'messenger_click',
        complexity: complexity,
        quality: quality
      });
      console.log('Facebook Pixel: Lead event tracked', {
        size: size || '10',
        value: finalPrice,
        complexity,
        quality
      });
    }
    
    // Google Analytics
    if (window.gtag) {
      gtag('event', 'generate_lead', {
        currency: 'USD',
        value: finalPrice,
        size: size || '10',
        complexity: complexity,
        quality: quality
      });
    }
    
    // Анімація кнопки з loading state
    const clickedBtn = messenger === 'telegram' ? telegramBtn : whatsappBtn;
    const originalText = clickedBtn.innerHTML;
    
    clickedBtn.disabled = true;
    clickedBtn.innerHTML = '<span class="spinner"></span> Відкриваю...';
    clickedBtn.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      clickedBtn.style.transform = '';
      clickedBtn.disabled = false;
      clickedBtn.innerHTML = originalText;
    }, 1500);
    
    // Формуємо повідомлення
    const complexityNames = {
      simple: 'простая поза',
      medium: 'средняя сложность',
      complex: 'сложная поза с аксессуарами'
    };
    
    const qualityNames = {
      standard: 'стандартное качество',
      high: 'высокое качество',
      premium: 'премиум качество'
    };
    
    let message = 'Привет! ';
    
    if (name || phone || size) {
      if (name) message += `Меня зовут ${name}. `;
      if (phone) message += `Телефон: ${phone}. `;
      if (size) {
        message += `Интересует фигурка размером ${size} см (${complexityNames[complexity]}, ${qualityNames[quality]}). `;
        message += `Цена: $${finalPrice}. `;
      } else {
        message += 'Хочу узнать подробнее о фигурках. ';
      }
      message += 'BLACK FRIDAY: Бесплатная доставка! 🚚';
    } else {
      message += 'Хочу узнать подробнее о ваших 3D-фигурках! BLACK FRIDAY: Бесплатная доставка! 🚚';
    }
    
    const encodedMessage = encodeURIComponent(message);
    let link = '';
    
    if (messenger === 'telegram') {
      link = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;
    } else if (messenger === 'whatsapp') {
      link = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    }
    
    if (link) {
      window.open(link, '_blank');
      statusEl.innerHTML = '✅ <strong>Чат открыт!</strong> Жду ваши фото там. Всегда рад помочь 😊';
      statusEl.style.color = '#10b981';
      statusEl.style.background = 'rgba(16, 185, 129, 0.1)';
      statusEl.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      
      if (window.gtag) {
        gtag('event', 'messenger_click', { messenger, size: size || 'not_selected' });
      }
    }
  }
  
  telegramBtn.addEventListener('click', () => openMessenger('telegram'));
  whatsappBtn.addEventListener('click', () => openMessenger('whatsapp'));
}

function setupHeaderWriteBtn() {
  const headerBtn = document.getElementById('header-write-btn');
  if (!headerBtn) return;
  
  headerBtn.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    if (window.gtag) {
      gtag('event', 'cta_hero_click', { location: 'header' });
    }
  });
}
