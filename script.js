
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
  function animRing(){ rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing); }
  animRing();
  document.querySelectorAll('a,button,.svc-card,.faq-q').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cursor.style.transform='translate(-50%,-50%) scale(2.5)'; });
    el.addEventListener('mouseleave',()=>{ cursor.style.transform='translate(-50%,-50%) scale(1)'; });
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
