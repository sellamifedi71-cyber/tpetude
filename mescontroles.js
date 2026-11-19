(() => {
  const form = document.getElementById('booking-form');
  if (!form) return;
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  const destination = document.getElementById('destination');
  const guests = document.getElementById('guests');
  const estimate = document.getElementById('estimate');
  const note = document.getElementById('estimate-note');
  const message = document.getElementById('booking-message');
  const rates = { Hammamet: 180, 'El Jem': 120, Sbeitla: 110 };
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  start.min = localDate;
  end.min = localDate;

  function updateEstimate() {
    if (start.value) end.min = start.value;
    if (!start.value || !end.value || !destination.value || Number(guests.value) < 1) {
      estimate.textContent = '—';
      note.textContent = 'Sélectionnez votre destination et vos dates.';
      return;
    }
    const nights = Math.round((new Date(end.value + 'T12:00:00') - new Date(start.value + 'T12:00:00')) / 86400000);
    if (nights < 1) {
      estimate.textContent = 'Dates à corriger';
      note.textContent = 'La date de départ doit être après la date d’arrivée.';
      return;
    }
    const total = nights * rates[destination.value] * Number(guests.value);
    estimate.textContent = new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', maximumFractionDigits: 0 }).format(total);
    note.textContent = nights + ' nuit(s) · ' + guests.value + ' voyageur(s) · tarif indicatif de démonstration';
  }
  [start, end, destination, guests].forEach(el => el.addEventListener('change', updateEstimate));
  const params = new URLSearchParams(window.location.search);
  const selected = params.get('destination');
  if (selected && [...destination.options].some(option => option.value === selected)) destination.value = selected;
  updateEstimate();

  form.addEventListener('submit', event => {
    event.preventDefault();
    message.textContent = '';
    if (!form.reportValidity()) return;
    const nights = Math.round((new Date(end.value + 'T12:00:00') - new Date(start.value + 'T12:00:00')) / 86400000);
    if (nights < 1) { message.textContent = 'La date de départ doit être après la date d’arrivée.'; return; }
    const request = {
      reference: 'FED-' + Date.now().toString(36).toUpperCase(),
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      destination: destination.value,
      start: start.value,
      end: end.value,
      guests: Number(guests.value),
      estimateTnd: nights * rates[destination.value] * Number(guests.value),
      createdAt: new Date().toISOString()
    };
    try {
      const saved = JSON.parse(localStorage.getItem('fediTravelRequests') || '[]');
      saved.push(request);
      localStorage.setItem('fediTravelRequests', JSON.stringify(saved));
      message.textContent = 'Demande de démonstration enregistrée dans ce navigateur. Référence : ' + request.reference + '. Aucune réservation réelle n’a été effectuée.';
      form.reset();
      end.min = start.min;
      estimate.textContent = '—';
      note.textContent = 'Sélectionnez vos dates pour calculer le nombre de nuits.';
    } catch (error) {
      message.textContent = 'Le navigateur n’a pas pu enregistrer cette demande. Vérifiez les paramètres de stockage.';
    }
  });
})();