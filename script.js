(() => {
  document.documentElement.classList.add('js-enabled');
  const $ = (id) => document.getElementById(id);
  const menuButton = $('menu-toggle');
  const mobileNav = $('mobile-nav');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    if (mobileNav) mobileNav.hidden = true;
  };
  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    if (mobileNav) mobileNav.hidden = isOpen;
  });
  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  const scrollProgress = $('scroll-progress');
  let ticking = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (scrollProgress) scrollProgress.style.transform = `scaleX(${max > 0 ? Math.max(0, Math.min(1, scrollY / max)) : 0})`;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; } }, { passive: true });
  addEventListener('resize', updateScroll);
  updateScroll();
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add('is-visible'));

  const workflows = {
    leads: {
      label: 'SALES PIPELINE / SAMPLE', kicker: 'NEXT ACTIONS', heading: 'A clear place for every lead.',
      description: 'Organize the information first. Then decide who to contact and why.',
      rows: [['School inquiry','Draft personalized reply','TO DO'],['Existing contact','Confirm next step','FOLLOW UP'],['New prospect','Verify business details','RESEARCH']],
      output: 'DELIVERABLE: Prioritized CRM follow-up queue'
    },
    content: {
      label: 'CONTENT OPERATIONS / SAMPLE', kicker: 'PUBLISHING CHECKLIST', heading: 'Less scrambling. Better content flow.',
      description: 'Plan the story, prepare approved assets, and track what is ready to publish.',
      rows: [['Customer story','Draft hook and script','DRAFT'],['Short-form edit','Review captions and pacing','QA'],['Approved post','Schedule and verify status','READY']],
      output: 'DELIVERABLE: Editorial calendar and creative checklist'
    },
    ops: {
      label: 'BUSINESS OPERATIONS / SAMPLE', kicker: 'OWNER SUMMARY', heading: 'Know what needs your attention.',
      description: 'Keep tasks moving and put blockers in one clear, reviewable weekly update.',
      rows: [['Website review','Record mobile UX issues','REVIEW'],['Pricing question','Confirm authorized source','APPROVAL'],['Weekly summary','Document next decisions','READY']],
      output: 'DELIVERABLE: Owner update and action tracker'
    }
  };
  document.querySelectorAll('[data-demo]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = workflows[button.dataset.demo];
      if (!value) return;
      document.querySelectorAll('[data-demo]').forEach((b) => {
        const selected = b === button;
        b.classList.toggle('is-active', selected);
        b.setAttribute('aria-pressed', String(selected));
      });
      $('demo-label').textContent = value.label;
      $('demo-kicker').textContent = value.kicker;
      $('demo-heading').textContent = value.heading;
      $('demo-subheading').textContent = value.description;
      $('demo-output').textContent = value.output;
      const parent = $('demo-rows');
      parent.replaceChildren(...value.rows.map(([title, detail, status]) => {
        const row = document.createElement('div'); row.className = 'device-row';
        const name = document.createElement('span'); name.textContent = title;
        const sub = document.createElement('small'); sub.textContent = detail;
        const badge = document.createElement('b'); badge.textContent = status;
        row.append(name, sub, badge); return row;
      }));
    });
  });
  const feedback = $('copy-feedback');
  $('copy-email')?.addEventListener('click', async () => {
    const email = 'rhamyzson.business@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      if (feedback) feedback.textContent = 'Email copied. Looking forward to hearing from you.';
    } catch {
      if (feedback) feedback.textContent = 'Copy this email: ' + email;
    }
  });
})();
