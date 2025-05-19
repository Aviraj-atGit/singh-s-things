const subtitle = document.getElementById('typed-subtitle');
const textToType = " Software Engineer at GlobalLogic ";
let index = 0;

const specialWord = "GlobalLogic";
const orangeColor = "#00000";       // orange
const tintColor = "#00000";         // lighter orange (tint)

function typeEffect() {
  if (index < textToType.length) {
    const char = textToType.charAt(index);
    const startIndex = textToType.indexOf(specialWord);
    const endIndex = startIndex + specialWord.length;

    if (index >= startIndex && index < endIndex) {
      const letter = char;
      const span = document.createElement("span");
      if (letter === "L") {
        span.style.color = tintColor;
      } else {
        span.style.color = orangeColor;
      }
      span.textContent = letter;
      subtitle.appendChild(span);
    } else {
      subtitle.textContent += char;
    }
    index++;
    setTimeout(typeEffect, 100);
  }
}

typeEffect();


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

// Create shooting star with varied speed, length, angle & color
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

// Create glowing color spots randomly drifting
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

// Main load logic
window.onload = () => {
  // Typing effect for subtitle
  if (subtitle) {
    subtitle.textContent = '';
    typeEffect();
  }

  // Scroll indicator smooth scroll
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Sticky note hover effect
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

  // Launch stars and color spots repeatedly
  setInterval(createShootingStar, 600);
  setInterval(createColorSpot, 1200);

  // Add dark mode toggle
  createDarkModeToggle();
};
