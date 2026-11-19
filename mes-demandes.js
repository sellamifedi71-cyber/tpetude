(() => {
  const storageKey = 'fediTravelRequests';
  const list = document.getElementById('request-list');
  const count = document.getElementById('request-count');
  const empty = document.getElementById('requests-empty');
  const clearButton = document.getElementById('clear-requests');
  const error = document.getElementById('storage-error');
  if (!list || !count || !empty || !clearButton || !error) return;

  const money = value => new Intl.NumberFormat('fr-TN', {
    style: 'currency', currency: 'TND', maximumFractionDigits: 0
  }).format(value);

  function readRequests() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Invalid request list');
    return parsed.filter(item =>
      item && typeof item.reference === 'string' &&
      typeof item.destination === 'string' &&
      typeof item.start === 'string' && typeof item.end === 'string' &&
      Number.isFinite(Number(item.guests)) &&
      Number.isFinite(Number(item.estimateTnd))
    );
  }

  function makeText(tag, className, value) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = value;
    return element;
  }

  function render() {
    try {
      error.hidden = true;
      const requests = readRequests();
      list.replaceChildren();
      count.textContent = requests.length === 1
        ? '1 demande enregistrée sur cet appareil'
        : requests.length + ' demande(s) enregistrée(s) sur cet appareil';
      empty.hidden = requests.length !== 0;
      clearButton.disabled = requests.length === 0;

      requests.slice().reverse().forEach((request, reverseIndex) => {
        const originalIndex = requests.length - 1 - reverseIndex;
        const card = document.createElement('article');
        card.className = 'request-card';
        const top = document.createElement('div');
        top.className = 'request-card-top';
        top.append(
          makeText('span', 'tag', request.destination),
          makeText('span', 'request-reference', request.reference)
        );
        const heading = makeText('h2', '', request.start + ' — ' + request.end);
        const details = makeText('p', 'request-details',
          Number(request.guests) + ' voyageur(s) · estimation indicative : ' + money(Number(request.estimateTnd))
        );
        const created = request.createdAt ? new Date(request.createdAt) : null;
        const meta = makeText('small', 'request-meta',
          created && !Number.isNaN(created.getTime())
            ? 'Créée le ' + new Intl.DateTimeFormat('fr-TN', { dateStyle: 'medium' }).format(created)
            : 'Demande locale de démonstration'
        );
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'text-button';
        remove.textContent = 'Supprimer';
        remove.addEventListener('click', () => {
          const current = readRequests();
          current.splice(originalIndex, 1);
          localStorage.setItem(storageKey, JSON.stringify(current));
          render();
        });
        card.append(top, heading, details, meta, remove);
        list.append(card);
      });
    } catch (storageError) {
      list.replaceChildren();
      count.textContent = 'Historique indisponible';
      empty.hidden = true;
      clearButton.disabled = true;
      error.hidden = false;
    }
  }

  clearButton.addEventListener('click', () => {
    if (!window.confirm('Effacer toutes les demandes enregistrées sur cet appareil ?')) return;
    try {
      localStorage.removeItem(storageKey);
      render();
    } catch (storageError) {
      error.hidden = false;
    }
  });

  render();
})();
