// Splash Screen Logic
const splashScreen = document.getElementById('splash-screen');

window.addEventListener('load', () => {
  setTimeout(() => {
    if (splashScreen) {
      splashScreen.classList.add('hidden');
      
      // Initialize other animations after splash is gone
      setTimeout(() => {
        document.querySelectorAll('.hero-content, .hero-visual').forEach(el => {
            el.classList.add('active');
        });
      }, 500);
    }
  }, 2500); // Show splash for 2.5 seconds
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Intersection Observer for Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-right, .stagger-reveal');

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('active');
      
      // If it's the stats container, start counting
      if (entry.target.classList.contains('stats-container')) {
        startCountAnimation();
      }
      
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

// Stat Counter Logic
function startCountAnimation() {
  const stats = document.querySelectorAll('.stat-value');
  stats.forEach(stat => {
    const target = stat.innerText;
    // Extract numbers and non-numbers (like ₹, Cr+, %)
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    const suffix = target.replace(/[0-9]/g, '');
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = Math.ceil(num / (duration / 16));
    
    const timer = setInterval(() => {
      count += increment;
      if (count >= num) {
        stat.innerText = target;
        clearInterval(timer);
      } else {
        stat.innerText = suffix.includes('₹') ? `₹${count}${suffix.replace('₹', '')}` : `${count}${suffix}`;
      }
    }, 16);
  });
}

// Initialize Reveal Observer
revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Update active link on scroll
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('header[id], section[id]');

function updateActiveLink() {
  let currentSelection = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      currentSelection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (currentSelection && link.getAttribute('href').includes(currentSelection)) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // Initial call
