const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

// Abre/Fecha o menu ao clicar no hambúrguer
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    navMenu.classList.toggle('active');
});

// Fecha o menu automaticamente ao clicar em qualquer link (opcional, mas recomendado)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        navMenu.classList.remove('active');
    });
});

  const obs = new IntersectionObserver(e=>e.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('visible'); }),{threshold:0.14});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item=q.parentElement, open=item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!open) item.classList.add('open');
    });
  });

  window.addEventListener('scroll',()=>{
    const nav=document.getElementById('nav');
    if(window.scrollY>50){ nav.style.padding='14px 64px'; nav.style.boxShadow='0 2px 18px rgba(44,36,32,0.08)'; }
    else { nav.style.padding='22px 64px'; nav.style.boxShadow='none'; }
  });
