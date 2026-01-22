const membersEl = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
let membersCache = null;

function badge(level) {
  if (level === 3) return { label: 'Gold', class: 'gold' };
  if (level === 2) return { label: 'Silver', class: 'silver' };
  return { label: 'Member', class: 'member' };
}

function card(m) {
  const b = badge(m.level);
  const el = document.createElement('article');
  el.className = 'card';

  // Use textContent and appendChild for better performance and security
  const img = document.createElement('img');
  img.src = m.images1;
  img.alt = m.name;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.onerror = () => img.src = 'images/placeholder.png'; // Fallback image
  el.appendChild(img);

  const div = document.createElement('div');
  const h3 = document.createElement('h3');
  h3.innerHTML = `${m.name} <span class="badge ${b.class}">${b.label}</span>`;
  div.appendChild(h3);

  const address = document.createElement('p');
  address.textContent = m.address;
  div.appendChild(address);

  const phone = document.createElement('p');
  const phoneLink = document.createElement('a');
  phoneLink.href = `tel:${m.phone}`;
  phoneLink.textContent = m.phone;
  phone.appendChild(phoneLink);
  div.appendChild(phone);

  const website = document.createElement('p');
  const websiteLink = document.createElement('a');
  websiteLink.href = m.website;
  websiteLink.textContent = 'Visit Website';
  websiteLink.target = '_blank';
  websiteLink.rel = 'noopener';
  website.appendChild(websiteLink);
  div.appendChild(website);

  el.appendChild(div);
  return el;
}

async function loadMembers() {
  if (membersCache) {
    renderMembers(membersCache);
    return;
  }

  membersEl.setAttribute('aria-busy', 'true');

  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    membersCache = data;
    renderMembers(data);
  } catch (error) {
    console.error('Failed to load members:', error);
    membersEl.innerHTML = '<p class="error">Unable to load members. Please try again later.</p>';
  } finally {
    membersEl.setAttribute('aria-busy', 'false');
  }
}

function renderMembers(data) {
  membersEl.innerHTML = '';
  const fragment = document.createDocumentFragment();
  data.forEach(m => fragment.appendChild(card(m)));
  membersEl.appendChild(fragment);
}

function setGrid() {
  membersEl.classList.add('grid');
  membersEl.classList.remove('list');
  gridBtn.classList.add('active');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.classList.remove('active');
  listBtn.setAttribute('aria-pressed', 'false');
}

function setList() {
  membersEl.classList.add('list');
  membersEl.classList.remove('grid');
  listBtn.classList.add('active');
  listBtn.setAttribute('aria-pressed', 'true');
  gridBtn.classList.remove('active');
  gridBtn.setAttribute('aria-pressed', 'false');
}

gridBtn.addEventListener('click', setGrid);
listBtn.addEventListener('click', setList);

// Use DOMContentLoaded for better performance
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setGrid();
    loadMembers();
  });
} else {
  setGrid();
  loadMembers();
}
