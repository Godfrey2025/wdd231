import places from '../data/discover-data.mjs';

const grid = document.getElementById('discoverGrid');
const visitMsg = document.getElementById('visitMsg');

function renderCards(items) {
    items.forEach((p, i) => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        card.style.gridArea = `item${i + 1}`;

        const h2 = document.createElement('h2');
        h2.textContent = p.name;

        const fig = document.createElement('figure');
        const img = document.createElement('img');
        img.src = p.image;
        img.alt = p.name;
        img.width = 300;
        img.height = 200;
        fig.appendChild(img);

        const addr = document.createElement('address');
        addr.textContent = p.address;

        const pdesc = document.createElement('p');
        pdesc.textContent = p.description;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Learn more';
        btn.addEventListener('click', () => {
            alert(`${p.name}\n\n${p.address}\n\n${p.description}`);
        });

        card.appendChild(h2);
        card.appendChild(fig);
        card.appendChild(addr);
        card.appendChild(pdesc);
        card.appendChild(btn);

        grid.appendChild(card);
    });
}

function updateVisitMessage() {
    const key = 'discover-last-visit';
    const now = Date.now();
    const last = localStorage.getItem(key);

    if (!last) {
        visitMsg.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const diff = now - Number(last);
        const days = Math.floor(diff / msPerDay);

        if (days < 1) {
            visitMsg.textContent = 'Back so soon! Awesome!';
        } else if (days === 1) {
            visitMsg.textContent = 'You last visited 1 day ago.';
        } else {
            visitMsg.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem(key, String(now));
}

document.addEventListener('DOMContentLoaded', () => {
    if (Array.isArray(places) && places.length) {
        renderCards(places);
    }
    updateVisitMessage();
});
