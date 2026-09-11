const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', function(){
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const carousel = document.querySelector('.invoice-carousel');
  if(carousel){
    const cards = carousel.querySelectorAll('.ticket');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let current = 0;
    let autoplay;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function showCard(i){
      cards.forEach(function(c, idx){ c.classList.toggle('is-hidden', idx !== i); });
      dots.forEach(function(d, idx){ d.classList.toggle('active', idx === i); });
      current = i;
    }
    function startAutoplay(){
      autoplay = setInterval(function(){ showCard((current + 1) % cards.length); }, 5000);
    }
    if(!prefersReducedMotion){ startAutoplay(); }

    dots.forEach(function(dot){
      dot.addEventListener('click', function(){
        showCard(parseInt(dot.dataset.index, 10));
        if(!prefersReducedMotion){ clearInterval(autoplay); startAutoplay(); }
      });
    });
    carousel.addEventListener('mouseenter', function(){ clearInterval(autoplay); });
    carousel.addEventListener('mouseleave', function(){ if(!prefersReducedMotion){ startAutoplay(); } });
  }

  const rootEl = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  if(themeBtn){
    themeBtn.addEventListener('click', function(){
      const isLight = rootEl.getAttribute('data-theme') === 'light';
      rootEl.setAttribute('data-theme', isLight ? 'dark' : 'light');
      themeBtn.setAttribute('aria-label', isLight ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }

  const quoteForm = document.getElementById('quote-form');
  if(quoteForm){
    quoteForm.addEventListener('submit', function(e){
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const negocio = document.getElementById('negocio').value.trim();
      const contacto = document.getElementById('contacto-medio').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim() || 'Sin detalles adicionales.';
      const texto = `🧾 *Nueva solicitud de cotización*\n_Sistema Facturación · Sistemas Fajardo_\n\n*Nombre:* ${nombre}\n*Negocio:* ${negocio}\n*Contacto:* ${contacto}\n\n*Necesita:*\n${mensaje}`;
      window.open('https://wa.me/50487792746?text=' + encodeURIComponent(texto), '_blank');
    });
  }

  const els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    },{threshold:0.15});
    els.forEach(el=>io.observe(el));
  } else {
    els.forEach(el=>el.classList.add('in'));
  }
