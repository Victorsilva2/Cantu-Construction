// Contact form submission (reCAPTCHA + /api/send)
// Intentionally small + robust: no UI changes, only functionality.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Avoid double-binding if something else loads this script twice
  if (form.dataset.boundContactSubmit === 'true') return;
  form.dataset.boundContactSubmit = 'true';

  const submitBtn =
    form.querySelector('button[type="submit"]') ||
    form.querySelector('.submit-btn') ||
    form.querySelector('.btn-primary');

  function setSubmitting(isSubmitting, originalText) {
    if (!submitBtn) return;
    submitBtn.disabled = isSubmitting;
    if (isSubmitting) submitBtn.textContent = 'Sending...';
    else if (typeof originalText === 'string') submitBtn.textContent = originalText;
  }

  async function safeReadJson(response) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalText = submitBtn ? submitBtn.textContent : undefined;
    setSubmitting(true, originalText);

    try {
      const name = (form.querySelector('input[name="name"]')?.value || '').trim();
      const email = (form.querySelector('input[name="email"]')?.value || '').trim();
      const phone = (form.querySelector('input[name="phone"]')?.value || '').trim();
      const message = (form.querySelector('textarea[name="message"]')?.value || '').trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      if (typeof grecaptcha === 'undefined') {
        alert('reCAPTCHA is still loading. Please wait a moment and try again.');
        return;
      }

      const recaptchaToken = grecaptcha.getResponse();
      if (!recaptchaToken) {
        alert('Please complete the reCAPTCHA verification.');
        return;
      }

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, recaptchaToken }),
      });

      const data = await safeReadJson(response);

      if (!response.ok) {
        const msg = data?.message || `Request failed (${response.status}).`;
        alert(`Error: ${msg}`);
        return;
      }

      // Success UX
      if (typeof window.showPopup === 'function') window.showPopup();
      else alert('Thank you for your message! We\'ll get back to you soon.');

      form.reset();
      grecaptcha.reset();
    } catch (err) {
      console.error('Contact form submission error:', err);
      alert('Error: Unable to send message. Please try again later.');
      try {
        if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
      } catch {}
    } finally {
      setSubmitting(false, originalText);
    }
  });
});

