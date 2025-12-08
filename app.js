// app.js — shared behaviors: WhatsApp link, email modal, Gumroad helpers
(function(){
  const whatsappBtn = document.getElementById('whatsapp-btn');
  const createBtn = document.getElementById('create-account');
  const modal = document.getElementById('email-modal');
  const cancel = document.getElementById('modal-cancel');
  const send = document.getElementById('modal-send');
  const emailInput = document.getElementById('email-input');

  // Configure these:
  const WA_NUMBER = 'YOUR_WHATSAPP_NUMBER'; // e.g. 2348012345678
  const WA_TEXT = encodeURIComponent('Hi! I want to join the Credify WhatsApp channel.');

  if(whatsappBtn) whatsappBtn.href = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

  if(createBtn){
    createBtn.addEventListener('click', ()=> {
      if(modal){ modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); emailInput.focus(); }
    });
  }
  if(cancel) cancel.addEventListener('click', ()=> { modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); });
  if(send) send.addEventListener('click', ()=>{
    const email = emailInput.value.trim();
    if(!email || !email.includes('@')) return alert('Please enter a valid email');
    // MVP: use clipboard or show success. Replace with actual mailing list integration later.
    navigator.clipboard?.writeText(email).catch(()=>{});
    alert('Thanks — we received your email (MVP placeholder).');
    modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); emailInput.value='';
  });

  // Optional: make gumroad links open in new tab
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[data-gumroad]');
    if(!a) return;
    a.target = '_blank';
    // You can add tracking params here
  });

  // Simple fade-in for cards (progressive)
  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.card, .proof-card, .promo-card').forEach((el,i)=>{
      el.style.opacity = 0; el.style.transform = 'translateY(18px)';
      setTimeout(()=>{ el.style.transition = 'opacity .6s ease, transform .6s ease'; el.style.opacity = 1; el.style.transform = 'translateY(0)'; }, 90*i);
    });
  });
})();
