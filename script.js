// Mobiles Menü öffnen/schließen
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Aktuelles Jahr im Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Kontaktformular an Supabase senden
const SUPABASE_URL = 'https://mdzxnpnmqsrgmuelbdam.supabase.co';
const SUPABASE_KEY = 'sb_publishable_rqGenGas0XM-f1ftaXti-w_fWbGBIE1';

const kontaktForm = document.getElementById('kontakt-form');
const formStatus = document.getElementById('form-status');

kontaktForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (kontaktForm.elements['bot-field'].value) {
    return;
  }

  const submitButton = kontaktForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formStatus.textContent = 'Wird gesendet...';

  const payload = {
    name: kontaktForm.elements['name'].value,
    telefon: kontaktForm.elements['telefon'].value,
    email: kontaktForm.elements['email'].value,
    nachricht: kontaktForm.elements['nachricht'].value,
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    formStatus.textContent = 'Danke! Wir melden uns zeitnah bei Ihnen.';
    kontaktForm.reset();
  } catch (error) {
    formStatus.textContent = 'Leider ist etwas schiefgelaufen. Bitte rufen Sie uns direkt an.';
  } finally {
    submitButton.disabled = false;
  }
});
