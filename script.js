// --- MENU MOBILE ---
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        navMenu.classList.remove('active');
    });
});

// --- ANIMAÇÃO DE REVELAÇÃO (INTERSECTION OBSERVER) ---
const obs = new IntersectionObserver(e => e.forEach(en => {
    if(en.isIntersecting) en.target.classList.add('visible');
}), { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// --- FAQ RETRÁTIL ---
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement, open = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if(!open) item.classList.add('open');
    });
});

// --- MUDANÇA DE ESTILO DO MENU AO ROLAR ---
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if(window.scrollY > 50){
        nav.style.padding = '14px 64px';
        nav.style.boxShadow = '0 2px 18px rgba(44,36,32,0.08)';
    } else {
        nav.style.padding = '22px 64px';
        nav.style.boxShadow = 'none';
    }
});

// --- ENVIO FORMULÁRIO + REDIRECIONAMENTO WHATSAPP ---
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const originalText = submitBtn.textContent;

    // Feedback visual
    submitBtn.textContent = "Processando agendamento...";
    submitBtn.disabled = true;

    // Resgata os dados preenchidos para criar a mensagem do WhatsApp
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    try {
        // Dispara o e-mail em segundo plano para o Web3Forms
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Formata o texto limpo para o seu WhatsApp
            const textoWhatsapp = `Olá, Thayla! Meu nome é ${nome}. Acabei de preencher o formulário no seu site pedindo um agendamento:\n\n` +
                                  `• *E-mail:* ${email}\n` +
                                  `• *Telefone:* ${telefone}\n` +
                                  `• *Mensagem:* ${mensagem || 'Não preenchida'}`;

            const linkWhatsapp = `https://wa.me/5521967062379?text=${encodeURIComponent(textoWhatsapp)}`;

            // Reseta os campos do site
            form.reset();

            // Redireciona para o WhatsApp
            window.location.href = linkWhatsapp;
        } else {
            alert("Erro ao processar: " + data.message);
        }

    } catch (error) {
        alert("Ocorreu uma falha na conexão. Por favor, tente enviar novamente.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

