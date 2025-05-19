const subtitle = document.getElementById('typed-subtitle');
const textToType = "Software Engineer at GlobalLogic";
const specialWord = "GlobalLogic";
const specialColor = "#000000";  // black or your desired color
let index = 0;

function type() {
  if (index < textToType.length) {
    let currentChar = textToType.charAt(index);
    subtitle.innerHTML += currentChar;
    index++;

    // When the specialWord starts, wrap it in a span with color style
    if (textToType.substring(index - specialWord.length, index) === specialWord) {
      const startPos = index - specialWord.length;
      const before = subtitle.innerHTML.slice(0, startPos);
      const colored = `<span style="color: ${specialColor}; font-weight: 600;">${specialWord}</span>`;
      const after = subtitle.innerHTML.slice(index);
      subtitle.innerHTML = before + colored + after;
    }

    setTimeout(type, 100); // typing speed (ms)
  }
}

// Reset and start typing on page load
window.addEventListener('DOMContentLoaded', () => {
  subtitle.innerHTML = "";
  type();
});

// Create Dark Mode toggle button with animation and styles
function createDarkModeToggle() {
  const toggleWrapper = document.createElement('div');
  toggleWrapper.id = 'dark-mode-toggle-wrapper';
  toggleWrapper.innerHTML = `
    <label class="switch">
      <input type="checkbox" id="darkModeToggleInput">
      <span class="slider"></span>
    </label>
  `;

  Object.assign(toggleWrapper.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
  });

  const style = document.createElement('style');
  style.innerHTML = `
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #333;
      transition: background-color 0.4s;
      border-radius: 34px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 26px; width: 26px;
      left: 4px; bottom: 4px;
      background-color: white;
      transition: transform 0.4s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: #f1c40f;
    }
    input:checked + .slider:before {
      transform: translateX(26px);
    }
    body {
      transition: background-color 0.5s, color 0.5s;
    }
    body.dark-mode {
      background-color: #121212;
      color: #f5f5f5;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toggleWrapper);

  const checkbox = document.getElementById('darkModeToggleInput');
  checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });
}

// Create shooting star
function createShootingStar() {
  const container = document.querySelector('.shooting-stars-container');
  if (!container) return;

  const star = document.createElement('div');
  star.classList.add('shooting-star');

  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * 0.3 * window.innerHeight;

  star.style.top = `${startY}px`;
  star.style.left = `${startX}px`;

  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6FD8', '#FFA500', '#8A2BE2'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  star.style.backgroundColor = color;
  star.style.boxShadow = `0 0 12px ${color}, 0 0 25px ${color}`;

  const duration = 600 + Math.random() * 600;
  const angle = 20 + Math.random() * 40;
  const length = 80 + Math.random() * 120;

  star.style.setProperty('--duration', `${duration}ms`);
  star.style.setProperty('--angle', `${angle}deg`);
  star.style.setProperty('--length', `${length}px`);

  container.appendChild(star);
  star.addEventListener('animationend', () => star.remove());
}

// Create glowing color spot
function createColorSpot() {
  const container = document.querySelector('.color-spots-container');
  if (!container) return;

  const spot = document.createElement('div');
  spot.classList.add('color-spot');

  const sizes = ['small', 'medium', 'large'];
  const size = sizes[Math.floor(Math.random() * sizes.length)];
  spot.classList.add(size);

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  spot.style.left = `${x}px`;
  spot.style.top = `${y}px`;

  const colors = [
    'rgba(255, 107, 107, 0.6)',
    'rgba(255, 217, 61, 0.6)',
    'rgba(107, 203, 119, 0.6)',
    'rgba(77, 150, 255, 0.6)',
    'rgba(255, 111, 216, 0.6)',
    'rgba(255, 165, 0, 0.6)',
    'rgba(138, 43, 226, 0.6)'
  ];
  spot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  const driftX = (Math.random() - 0.5) * 20;
  const driftY = (Math.random() - 0.5) * 20;
  const driftDuration = 7000 + Math.random() * 3000;

  spot.style.setProperty('--drift-x', `${driftX}px`);
  spot.style.setProperty('--drift-y', `${driftY}px`);
  spot.style.setProperty('--drift-duration', `${driftDuration}ms`);

  container.appendChild(spot);

  setTimeout(() => spot.remove(), driftDuration);
}

// All logic after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  if (subtitle) {
    subtitle.textContent = '';
    typeEffect();
  }

  // Smooth scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Sticky note effects
  const stickyNotes = document.querySelectorAll('.sticky-note-btn');
  stickyNotes.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1)';
      btn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = 'none';
    });
  });

  // Stars and spots
  setInterval(createShootingStar, 600);
  setInterval(createColorSpot, 1200);

  // Dark mode
  createDarkModeToggle();

  // 👇 "Paint-drop" animation logic
  const aboutSection = document.getElementById('about-section');
  const fallElements = document.querySelectorAll('.falling');

  if (aboutSection && fallElements.length > 0) {
    setTimeout(() => {
      aboutSection.classList.remove('hidden');
      fallElements.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('show');
        }, i * 300); // Stagger animation
      });
    }, 500); // Delay to simulate paint splatter load
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      card.style.opacity = 0;
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.5s ease-out';
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }, i * 200);
    });
  });
  window.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 150); // stagger animation
    });
  });
  function pastelColor() {
    // Generate random pastel color
    const hue = Math.floor(Math.random() * 360);
    const pastel = `hsl(${hue}, 70%, 80%)`;
    return pastel;
  }
  
  function darkerColor(hslString) {
    // Convert hsl to components and darken the lightness by 10%
    const hsl = hslString.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
    if (!hsl) return hslString;
    let h = parseInt(hsl[1], 10);
    let s = parseInt(hsl[2], 10);
    let l = parseInt(hsl[3], 10);
  
    l = Math.max(0, l - 15); // make it darker
  
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      // Assign pastel bg and darker folded corner
      const bgColor = pastelColor();
      const foldColor = darkerColor(bgColor);
  
      card.style.setProperty('--sticky-bg', bgColor);
      card.style.setProperty('--sticky-fold', foldColor);
  
      // Show animation staggered
      setTimeout(() => {
        card.classList.add('show');
      }, index * 150);
    });
  });
  function randomFloatValue(max) {
    // random float between -max and +max with 1 decimal
    return (Math.random() * 2 * max - max).toFixed(1) + 'px';
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      // Pastel colors as you have
      const bgColor = pastelColor();
      const foldColor = darkerColor(bgColor);
  
      card.style.setProperty('--sticky-bg', bgColor);
      card.style.setProperty('--sticky-fold', foldColor);
  
      // Randomize float directions and distance for each card
      card.style.setProperty('--float-x', randomFloatValue(10));  // max 10px left/right
      card.style.setProperty('--float-y', randomFloatValue(15));  // max 15px up/down
  
      // Random animation duration between 3s and 6s
      const duration = (3 + Math.random() * 3).toFixed(2) + 's';
      card.style.animationDuration = duration;
  
      // Random animation delay so they don't sync
      const delay = (Math.random() * 3).toFixed(2) + 's';
      card.style.animationDelay = delay;
  
      // Show animation staggered
      setTimeout(() => {
        card.classList.add('show');
      }, index * 150);
    });
  });
  function pastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const pastel = `hsl(${hue}, 70%, 80%)`;
    return pastel;
  }
  
  function darkerColor(hslString) {
    const hsl = hslString.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
    if (!hsl) return hslString;
    let h = parseInt(hsl[1], 10);
    let s = parseInt(hsl[2], 10);
    let l = parseInt(hsl[3], 10);
  
    l = Math.max(0, l - 15);
  
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  
  function darkerPastelForDarkMode(hslString) {
    const hsl = hslString.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
    if (!hsl) return hslString;
    let h = parseInt(hsl[1], 10);
    let s = parseInt(hsl[2], 10);
    let l = parseInt(hsl[3], 10);
  
    // Dark mode sticky note color: reduce lightness more & saturation slightly
    l = Math.max(0, l - 40);
    s = Math.max(40, s - 20);
  
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      const bgColor = pastelColor();
      const foldColor = darkerColor(bgColor);
      const darkBgColor = darkerPastelForDarkMode(bgColor);
  
      card.style.setProperty('--sticky-bg', bgColor);
      card.style.setProperty('--sticky-fold', foldColor);
      card.style.setProperty('--sticky-bg-dark', darkBgColor);
  
      // Your existing floating logic here (optional)...
  
      setTimeout(() => {
        card.classList.add('show');
      }, index * 150);
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggleInput');
    toggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
    });
  });
// Dark mode toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggleInput');
  
    // Load mode from localStorage
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      toggle.checked = true;
    }
  
    toggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
  });
  document.getElementById('darkModeToggleInput').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
  });
  let scrollPosition = 0;

  function disableScroll() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add('no-scroll');
  }
  
  function enableScroll() {
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }
// Animate page fold-in on load
window.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.getElementById('page-wrapper');
    pageWrapper.classList.add('fold-in');
  });
  
  // Animate fold-out on internal link clicks before navigation
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
  
      // Only animate internal navigation (exclude external links and files)
      if (href && !href.startsWith('http') && !href.startsWith('files') && href !== '#') {
        e.preventDefault();
  
        const pageWrapper = document.getElementById('page-wrapper');
        pageWrapper.classList.remove('fold-in');
        pageWrapper.classList.add('fold-out');
  
        setTimeout(() => {
          window.location.href = href;
        }, 800); // match CSS animation duration
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('.submit-btn');
  
    inputs.forEach(input => {
      input.addEventListener('focus', () => input.classList.add('wiggle'));
      input.addEventListener('blur', () => input.classList.remove('wiggle'));
    });
  
    submitBtn.addEventListener('mouseenter', () => {
      submitBtn.style.transform = 'scale(1.1)';
      submitBtn.style.transition = 'transform 0.2s ease';
    });
  
    submitBtn.addEventListener('mouseleave', () => {
      submitBtn.style.transform = 'scale(1)';
    });
  
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
  
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.style.backgroundColor = '#e67e22';
      submitBtn.style.transform = 'scale(1.2)';
  
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.backgroundColor = '#d35400';
        submitBtn.style.transform = 'scale(1)';
        submitBtn.disabled = false;
        form.reset();
        alert("Thanks for reaching out! I'll get back to you soon 😊");
      }, 2000);
    });
  });
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U etc.
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toUpperCase() === 'U')
    ) {
      e.preventDefault();
    }
  });