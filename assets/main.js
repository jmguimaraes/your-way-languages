// NAV SCROLL
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE MENU
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  links.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => links.classList.remove('open'));
});

// FORM
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.querySelector('input[type="text"]').value;
  const telefone = form.querySelector('input[type="tel"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const curso = form.querySelector('select').value;
  const mensagem = form.querySelector('textarea').value;

  const texto = `Olá! Meu nome é ${nome}.\nTelefone: ${telefone}\nE-mail: ${email}\nTurma de interesse: ${curso}\nMensagem: ${mensagem || '-'}`;
  const whatsappUrl = `https://wa.me/5524992520409?text=${encodeURIComponent(texto)}`;

  const btn = form.querySelector('.form-submit');
  btn.textContent = '✓ Abrindo WhatsApp...';
  btn.style.background = '#25D366';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  setTimeout(() => {
    btn.textContent = 'Enviar mensagem →';
    btn.style.background = '';
    form.reset();
  }, 2500);
}
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', handleSubmit);
}

// TESTIMONIALS CAROUSEL
let testimonialIndex = 0;
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.getElementById('testimonialDots');
const testimonialSlideCount = testimonialTrack ? testimonialTrack.children.length : 0;
if (testimonialTrack) {
  for (let i = 0; i < testimonialSlideCount; i++) {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToTestimonial(i));
    testimonialDots.appendChild(dot);
  }
}
function updateTestimonialCarousel() {
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  Array.from(testimonialDots.children).forEach((d, i) => d.classList.toggle('active', i === testimonialIndex));
}
function moveTestimonial(dir) {
  testimonialIndex = (testimonialIndex + dir + testimonialSlideCount) % testimonialSlideCount;
  updateTestimonialCarousel();
}
function goToTestimonial(i) {
  testimonialIndex = i;
  updateTestimonialCarousel();
}
let testimonialAutoplay;
function startTestimonialAutoplay() {
  clearInterval(testimonialAutoplay);
  if (testimonialSlideCount > 1) {
    testimonialAutoplay = setInterval(() => moveTestimonial(1), 5000);
  }
}
if (testimonialTrack) {
  const testimonialsCarouselEl = document.querySelector('.testimonials-carousel');
  const prevBtn = document.querySelector('.carousel-arrow-prev');
  const nextBtn = document.querySelector('.carousel-arrow-next');
  if (prevBtn) prevBtn.addEventListener('click', () => moveTestimonial(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveTestimonial(1));
  startTestimonialAutoplay();
  testimonialsCarouselEl.addEventListener('mouseenter', () => clearInterval(testimonialAutoplay));
  testimonialsCarouselEl.addEventListener('mouseleave', startTestimonialAutoplay);
}

// ABOUT PHOTO CAROUSEL
let aboutGalleryIndex = 0;
const aboutGalleryTrack = document.getElementById('aboutGalleryTrack');
const aboutGalleryDots = document.getElementById('aboutGalleryDots');
const aboutGalleryCaptionText = document.getElementById('aboutGalleryCaptionText');
const aboutGallerySlides = aboutGalleryTrack ? Array.from(aboutGalleryTrack.children) : [];
if (aboutGalleryTrack) {
  aboutGallerySlides.forEach((slide, i) => {
    const dot = document.createElement('span');
    dot.className = 'about-gallery-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToAboutGallery(i));
    aboutGalleryDots.appendChild(dot);
  });
}
function updateAboutGallery() {
  aboutGalleryTrack.style.transform = `translateX(-${aboutGalleryIndex * 100}%)`;
  Array.from(aboutGalleryDots.children).forEach((d, i) => d.classList.toggle('active', i === aboutGalleryIndex));
  if (aboutGalleryCaptionText) {
    aboutGalleryCaptionText.textContent = aboutGallerySlides[aboutGalleryIndex].dataset.caption || '';
  }
}
function moveAboutGallery(dir) {
  aboutGalleryIndex = (aboutGalleryIndex + dir + aboutGallerySlides.length) % aboutGallerySlides.length;
  updateAboutGallery();
}
function goToAboutGallery(i) {
  aboutGalleryIndex = i;
  updateAboutGallery();
}
let aboutGalleryAutoplay;
function startAboutGalleryAutoplay() {
  clearInterval(aboutGalleryAutoplay);
  if (aboutGallerySlides.length > 1) {
    aboutGalleryAutoplay = setInterval(() => moveAboutGallery(1), 4500);
  }
}
if (aboutGalleryTrack) {
  const aboutGalleryCarouselEl = document.getElementById('aboutGalleryCarousel');
  const aboutGalleryPrevBtn = aboutGalleryCarouselEl.querySelector('.about-gallery-arrow-prev');
  const aboutGalleryNextBtn = aboutGalleryCarouselEl.querySelector('.about-gallery-arrow-next');
  if (aboutGalleryPrevBtn) aboutGalleryPrevBtn.addEventListener('click', () => moveAboutGallery(-1));
  if (aboutGalleryNextBtn) aboutGalleryNextBtn.addEventListener('click', () => moveAboutGallery(1));
  startAboutGalleryAutoplay();
  aboutGalleryCarouselEl.addEventListener('mouseenter', () => clearInterval(aboutGalleryAutoplay));
  aboutGalleryCarouselEl.addEventListener('mouseleave', startAboutGalleryAutoplay);
}

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.course-card, .method-card, .about-feature, .contact-info-card, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
