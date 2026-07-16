//NAVBAR NORMAL

// const navbar = document.querySelector('.navbar');
// const scrollThreshold = 60; // pixels scrolled before the switch happens

// window.addEventListener('scroll', () => {
//   if (window.scrollY > scrollThreshold) {
//     navbar.classList.add('scrolled');
//   } else {
//     navbar.classList.remove('scrolled');
//   }
// });

// Navbar Pill
const navbar = document.querySelector('.navbar');
const scrollThreshold = 80;

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }
});



//NAVBAR MOBILE RESPONSIVE
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});




//SCROLL & TAB FUNCTION - SERVICES
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.services-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Scroll controls — one per panel
document.querySelectorAll('.services-panel').forEach(panel => {
  const track = panel.querySelector('.service-scroll');
  const prevBtn = panel.querySelector('.prev');
  const nextBtn = panel.querySelector('.next');
  const cardWidth = () => panel.querySelector('.service-card').offsetWidth + 24; // +gap

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth() * 3, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth() * 3, behavior: 'smooth' });
  });
});



// PROJECT MODAL
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.project-modal-close');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    modal.querySelector('.modal-tag').textContent = card.dataset.tag;
    modal.querySelector('.modal-title').textContent = card.dataset.title;
    modal.querySelector('.modal-location').textContent = card.dataset.location;
    modal.querySelector('.modal-year').textContent = card.dataset.year;
    modal.querySelector('.modal-description').textContent = card.dataset.description;
    buildGallery(card.dataset.images.split(','));

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  stopAutoScroll();
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

//gallery population
let galleryImages = [];
let currentSlide = 0;
let autoScrollTimer = null;

const galleryTrack = document.getElementById('modalGalleryTrack');
const dotsContainer = document.getElementById('modalDots');

function buildGallery(images) {
  galleryImages = images;
  currentSlide = 0;

  // build image track
  galleryTrack.innerHTML = '';
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src.trim();
    galleryTrack.appendChild(img);
  });

  // build dots
  dotsContainer.innerHTML = '';
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  startAutoScroll();
}

function goToSlide(index) {
  currentSlide = index;
  galleryTrack.style.transform = `translateX(-${index * 100}%)`;

  // update active dot
  document.querySelectorAll('.modal-gallery-dots span').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  restartAutoScroll(); // clicking a dot resets the auto-scroll timer
}

function startAutoScroll() {
  autoScrollTimer = setInterval(() => {
    const next = (currentSlide + 1) % galleryImages.length; // loops back to 0 after the last image
    goToSlide(next);
  }, 4000); // 4 seconds per slide
}

function restartAutoScroll() {
  clearInterval(autoScrollTimer);
  startAutoScroll();
}

function stopAutoScroll() {
  clearInterval(autoScrollTimer);
}

//SCROLL BUTTONS FOR TIMELINE
const processTrack = document.getElementById('processTrack');
const processPrev = document.querySelector('.process-scroll-btn.prev');
const processNext = document.querySelector('.process-scroll-btn.next');

function processCardWidth() {
  return processTrack.querySelector('.process-step').offsetWidth + 32;
}

processPrev.addEventListener('click', () => {
  processTrack.scrollBy({ left: -processCardWidth() * 2, behavior: 'smooth' });
});

processNext.addEventListener('click', () => {
  processTrack.scrollBy({ left: processCardWidth() * 2, behavior: 'smooth' });
});


//TESTIMONIALS
const slides = document.querySelectorAll('.testimonial-slide');
const testimonialDotsContainer = document.getElementById('testimonialDots');
const prevBtn = document.querySelector('.testimonial-btn.prev');
const nextBtn = document.querySelector('.testimonial-btn.next');
let currentTestimonial = 0;
let testimonialTimer = null;

// build dots dynamically based on how many slides exist
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    showTestimonial(i);
    restartAutoScroll();
  });
  testimonialDotsContainer.appendChild(dot);
});

function showTestimonial(index) {
  slides[currentTestimonial].classList.remove('active');
  document.querySelectorAll('.testimonial-dots span')[currentTestimonial].classList.remove('active');

  currentTestimonial = index;

  slides[currentTestimonial].classList.add('active');
  document.querySelectorAll('.testimonial-dots span')[currentTestimonial].classList.add('active');
}

function startAutoScrollTestimonials() {
  testimonialTimer = setInterval(() => {
    const next = (currentTestimonial + 1) % slides.length;
    showTestimonial(next);
  }, 5000); // 5 seconds per testimonial
}

function restartAutoScroll() {
  clearInterval(testimonialTimer);
  startAutoScrollTestimonials();
}

prevBtn.addEventListener('click', () => {
  const prevIndex = (currentTestimonial - 1 + slides.length) % slides.length;
  showTestimonial(prevIndex);
  restartAutoScroll();
});

nextBtn.addEventListener('click', () => {
  const nextIndex = (currentTestimonial + 1) % slides.length;
  showTestimonial(nextIndex);
  restartAutoScroll();
});

startAutoScrollTestimonials(); // kick off auto-scroll on page load


//EMAILJS AND BUTTON POPUP
// Initialize EmailJS with your Public Key
emailjs.init('p-73WghA1x_BEhal6');

const contactForm = document.getElementById('contactForm');
const confirmPopup = document.getElementById('confirmPopup');
const confirmPopupClose = document.getElementById('confirmPopupClose');
const submitBtn = contactForm.querySelector('.btn-form');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); // stops the default page-reload behavior

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const formData = {
    name: contactForm.name.value,
    phone: contactForm.phone.value,
    email: contactForm.email.value,
    location: contactForm.location.value,
    message: contactForm.message.value
  };

  // Send email #1 — notifies the business
  emailjs.send('service_fnc01t2', 'template_kidzw8f', formData)
    .then(() => {
      // Send email #2 — auto-reply to the customer
      return emailjs.send('service_fnc01t2', 'template_z594amw', formData);
    })
    .then(() => {
      // Both emails sent successfully — show the popup
      contactForm.reset();
      confirmPopup.classList.add('open');
    })
    .catch((error) => {
      console.error('Email send failed:', error);
      alert('Something went wrong sending your message. Please try again or contact us directly.');
    });
});



confirmPopupClose.addEventListener('click', () => {
  confirmPopup.classList.remove('open');
  submitBtn.disabled = false;
  submitBtn.textContent = "Send Message"
});