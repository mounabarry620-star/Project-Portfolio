// Navigation Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

// Hide menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

// Scroll Header Background
function scrollHeader() {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}

window.addEventListener('scroll', scrollHeader);

// Active Link on Scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active-link');
    } else {
      document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = document.getElementById('header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Smooth Scroll for Hero Buttons
const heroButtons = document.querySelectorAll('.hero__buttons a');
heroButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = button.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = document.getElementById('header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for Fade-in Animations
const fadeElements = document.querySelectorAll('.fade-in-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
  fadeObserver.observe(element);
});

// Profile photo animation on scroll
const profilePhoto = document.querySelector('.parcours__photo-frame');
if (profilePhoto) {
  const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        profilePhoto.style.animation = 'fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        photoObserver.unobserve(profilePhoto);
      }
    });
  }, {
    threshold: 0.3
  });
  photoObserver.observe(profilePhoto);
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
      showFormMessage('Veuillez remplir tous les champs.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Veuillez entrer une adresse email valide.', 'error');
      return;
    }
    
    // Success message (in a real application, this would send the data to a server)
    showFormMessage('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
    
    // Reset form
    contactForm.reset();
  });
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = 'form-message ' + type;
  formMessage.style.display = 'block';
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

// Animate skill progress bars on scroll
const skillBars = document.querySelectorAll('.skill__progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const targetWidth = progressBar.style.width;
      progressBar.style.width = '0';
      
      setTimeout(() => {
        progressBar.style.width = targetWidth;
      }, 100);
      
      skillObserver.unobserve(progressBar);
    }
  });
}, {
  threshold: 0.5
});

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Animate tech skill cards with stagger effect
const techSkillCards = document.querySelectorAll('.tech-skill-card');

const techSkillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      techSkillObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

techSkillCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  techSkillObserver.observe(card);
});

// Footer Links Smooth Scroll
const footerLinks = document.querySelectorAll('.footer__links a');
footerLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetSection = document.querySelector(href);
      
      if (targetSection) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Parallax effect for hero background
let lastScrollTop = 0;
function heroParallax() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop < window.innerHeight) {
      const parallaxSpeed = scrollTop * 0.5;
      hero.style.backgroundPositionY = parallaxSpeed + 'px';
    }
    lastScrollTop = scrollTop;
  }
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(heroParallax);
});

// Initialize animations on page load
window.addEventListener('load', () => {
  // Trigger initial scroll events
  scrollHeader();
  scrollActive();
  heroParallax();
});