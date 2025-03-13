// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = menuToggle.querySelector('i');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const currentYearElement = document.getElementById('current-year');

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Check for dark mode preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
  document.body.classList.add('dark');
  themeIcon.classList.remove('bx-moon');
  themeIcon.classList.add('bx-sun');
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  if (document.body.classList.contains('dark')) {
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
  } else {
    themeIcon.classList.remove('bx-sun');
    themeIcon.classList.add('bx-moon');
  }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  menuIcon.classList.remove('bx-menu');
  menuIcon.classList.add('bx-x');
});

// Close Mobile Menu
closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  menuIcon.classList.remove('bx-x');
  menuIcon.classList.add('bx-menu');
});

// Close Mobile Menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    menuIcon.classList.add('bx-menu');
  });
});

// Tabs Functionality
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    const tabId = `tab-${button.dataset.tab}`;
    document.getElementById(tabId).classList.add('active');
  });
});

// Scroll Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-out');
  observer.observe(section);
});

// Add fade-in/fade-out animations to CSS
const style = document.createElement('style');
style.textContent = `
  .fade-out {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Form submission (prevent default for demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te responderé lo antes posible.');
    contactForm.reset();
  });
}