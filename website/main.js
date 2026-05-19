/* =============================================
   Abdullah Champ PORTFOLIO — MAIN.JS v2
   ============================================= */
'use strict';

// ─── LOADER ───────────────────────────────────
const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loaderProgress');

let prog = 0;
const loadInterval = setInterval(() => {
    prog = Math.min(prog + Math.random() * 18, 100);
    loaderProgress.style.width = prog + '%';
    if (prog >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
            startTypewriter();
        }, 450);
    }
}, 80);
document.body.style.overflow = 'hidden';

// ─── CUSTOM CURSOR ────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
if (cursor && cursorFollower) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });
    (function animFollow() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;
        cursorFollower.style.left = fx + 'px';
        cursorFollower.style.top = fy + 'px';
        requestAnimationFrame(animFollow);
    })();
}

// ─── TYPEWRITER EFFECT ────────────────────────
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'edit cinematic videos',
    'automate with AI',
    'grow YouTube channels',
    'craft viral short-form content',
    'tell compelling stories',
    'build content pipelines'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function startTypewriter() {
    if (!typewriterEl) return;
    tick();
}

function tick() {
    const current = phrases[phraseIdx];
    if (deleting) {
        charIdx--;
        typewriterEl.textContent = current.substring(0, charIdx);
        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(tick, 400);
        } else {
            setTimeout(tick, 45);
        }
    } else {
        charIdx++;
        typewriterEl.textContent = current.substring(0, charIdx);
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(tick, 2000); // pause at full word
        } else {
            setTimeout(tick, 80);
        }
    }
}

// ─── NAVBAR SCROLL ────────────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}, { passive: true });

// ─── HAMBURGER ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
});
navLinksEl?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
    });
});

// ─── HERO PARTICLES ───────────────────────────
const pStyle = document.createElement('style');
pStyle.textContent = `
  @keyframes particleRise {
    0%   { transform:translateY(0) scale(1); opacity:0; }
    10%  { opacity:1; }
    90%  { opacity:0.3; }
    100% { transform:translateY(-80vh) scale(0.3); opacity:0; }
  }
`;
document.head.appendChild(pStyle);

function createParticles() {
    const c = document.getElementById('heroParticles');
    if (!c) return;
    for (let i = 0; i < 45; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%; bottom:-8px;
      background:rgba(255,107,53,${0.1 + Math.random() * 0.4});
      animation:particleRise ${4 + Math.random() * 6}s ${Math.random() * 6}s ease-in infinite;
    `;
        c.appendChild(p);
    }
}
createParticles();

// ─── COUNTER ANIMATION ────────────────────────
function animateCounters() {
    document.querySelectorAll('.hc-num').forEach(el => {
        const target = +el.dataset.target;
        let current = 0;
        const inc = target / 60;
        const timer = setInterval(() => {
            current = Math.min(current + inc, target);
            el.textContent = Math.floor(current);
            if (current >= target) clearInterval(timer);
        }, 30);
    });
}

// ─── SCROLL ANIMATIONS ────────────────────────
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animated');
                }, +delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.bar-fill').forEach(bar => bar.classList.add('animated'));
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.about-software').forEach(el => barObserver.observe(el));
}

function initAnimations() {
    animateCounters();
    initScrollAnimations();
}

// ─── PROJECT FILTERS ──────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projCards.forEach(card => {
            const cats = card.dataset.category || '';
            const show = filter === 'all' || cats.includes(filter);
            if (show) {
                card.classList.remove('hidden');
                card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
                requestAnimationFrame(() => {
                    card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    card.style.opacity = '1'; card.style.transform = '';
                });
            } else {
                card.style.opacity = '0'; card.style.transform = 'scale(0.9)';
                setTimeout(() => card.classList.add('hidden'), 350);
            }
        });
    });
});

// ─── CONTACT FORM ─────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

contactForm?.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.querySelector('.btn-icon').textContent = '⏳';

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: json
        });
        const data = await res.json();
        if (data.success) {
            contactForm.reset();
            formSuccess.classList.add('visible');
            setTimeout(() => formSuccess.classList.remove('visible'), 6000);
        } else {
            alert('Something went wrong. Please email directly: champfreelancer1570@gmail.com');
        }
    } catch {
        alert('Network error. Please email directly: champfreelancer1570@gmail.com');
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        submitBtn.querySelector('.btn-icon').textContent = '→';
    }
});

// ─── INPUT LABEL FLOATING EFFECT ──────────────
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(el => {
    el.addEventListener('focus', () => el.parentElement.classList.add('focused'));
    el.addEventListener('blur', () => el.parentElement.classList.remove('focused'));
});

// ─── SMOOTH ANCHOR LINKS ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// ─── MOUSE PARALLAX (BLOBS) ───────────────────
window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 24;
    const y = (e.clientY / window.innerHeight - 0.5) * 24;
    document.querySelector('.blob-1')?.style.setProperty('transform', `translate(${x * 0.8}px,${y * 0.8}px)`);
    document.querySelector('.blob-2')?.style.setProperty('transform', `translate(${-x * 0.5}px,${-y * 0.5}px)`);
    document.querySelector('.blob-3')?.style.setProperty('transform', `translate(${x * 0.3}px,${-y * 0.4}px)`);
}, { passive: true });

// ─── 3D TILT ON CARDS ─────────────────────────
document.querySelectorAll('.skill-card, .proj-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        card.style.transform = `translateY(-8px) rotateX(${-y}deg) rotateY(${x}deg)`;
        card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
    });
});

// ─── HERO VISUAL SCROLL PARALLAX ──────────────
window.addEventListener('scroll', () => {
    const heroV = document.querySelector('.hero-visual');
    if (heroV) heroV.style.transform = `translateY(${window.scrollY * 0.1}px)`;
}, { passive: true });

// ─── BACK TO TOP ──────────────────────────────
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (backToTop) backToTop.style.opacity = window.scrollY > 400 ? '1' : '0';
}, { passive: true });

// ─── TICKER PAUSE ON HOVER ────────────────────
const ticker = document.querySelector('.ticker');
ticker?.parentElement?.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
ticker?.parentElement?.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');

// ─── INLINE MEDIA PLAY ────────────────────────
document.querySelectorAll('.proj-card').forEach(card => {
    const wrap = card.querySelector('.interactive-media');
    const btn = card.querySelector('.play-trigger');
    
    function playInline(e) {
        if(e) e.preventDefault();
        if (!wrap) return;
        const iframeSrc = wrap.getAttribute('data-iframe');
        if (iframeSrc && !wrap.classList.contains('playing')) {
            wrap.classList.add('playing');
            wrap.innerHTML = `<iframe src="${iframeSrc}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" loading="lazy"></iframe>`;
            // Reattach the iframe to avoid CSS jumping bugs
            if(btn) btn.innerHTML = 'Playing...';
        }
    }
    
    if(wrap) wrap.addEventListener('click', playInline);
    if(btn) btn.addEventListener('click', playInline);
});
