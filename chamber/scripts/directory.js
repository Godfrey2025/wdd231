const membersEl = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
let membersCache = null;

/**
 * Returns badge configuration based on membership level
 * @param {number} level - Membership level (1, 2, or 3)
 * @returns {Object} Badge label and class name
 */
function badge(level) {
  if (level === 3) return { label: 'Gold', class: 'gold' };
  if (level === 2) return { label: 'Silver', class: 'silver' };
  return { label: 'Member', class: 'member' };
}

/**
 * Creates a card element for a member
 * @param {Object} m - Member data object
 * @returns {HTMLElement} Article element containing member information
 */
function card(m) {
  const b = badge(m.level);
  const el = document.createElement('article');
  el.className = 'card';

  // Create and append image
  const img = document.createElement('img');
  img.src = m.images1;
  img.alt = `${m.name} logo`;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.onerror = () => img.src = 'images/placeholder.png';
  el.appendChild(img);

  // Create content container
  const div = document.createElement('div');

  // Create and append heading with badge
  const h3 = document.createElement('h3');
  h3.innerHTML = `${m.name} <span class="badge ${b.class}">${b.label}</span>`;
  div.appendChild(h3);

  // Create and append address
  const address = document.createElement('p');
  address.textContent = m.address;
  div.appendChild(address);

  // Create and append phone link
  const phone = document.createElement('p');
  const phoneLink = document.createElement('a');
  phoneLink.href = `tel:${m.phone}`;
  phoneLink.textContent = m.phone;
  phone.appendChild(phoneLink);
  div.appendChild(phone);

  // Create and append website link
  const website = document.createElement('p');
  const websiteLink = document.createElement('a');
  websiteLink.href = m.website;
  websiteLink.textContent = 'Visit Website';
  websiteLink.target = '_blank';
  websiteLink.rel = 'noopener noreferrer';
  website.appendChild(websiteLink);
  div.appendChild(website);

  el.appendChild(div);
  return el;
}

/**
 * Fetches member data from JSON file using async/await
 * @async
 * @returns {Promise<Array>} Array of member objects
 */
async function fetchMembers() {
  const response = await fetch('data/members.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

/**
 * Renders member cards to the DOM using document fragment
 * @param {Array} data - Array of member objects
 */
function renderMembers(data) {
  membersEl.innerHTML = '';
  const fragment = document.createDocumentFragment();
  data.forEach(m => fragment.appendChild(card(m)));
  membersEl.appendChild(fragment);
}

/**
 * Loads members data and displays it
 * Uses caching to avoid multiple fetches
 * @async
 */
async function loadMembers() {
  if (membersCache) {
    renderMembers(membersCache);
    return;
  }

  membersEl.setAttribute('aria-busy', 'true');

  try {
    const data = await fetchMembers();
    membersCache = data;
    renderMembers(data);
  } catch (error) {
    console.error('Failed to load members:', error);
    membersEl.innerHTML = '<p class="error">Unable to load members. Please try again later.</p>';
  } finally {
    membersEl.setAttribute('aria-busy', 'false');
  }
}

/**
 * Sets the display to grid view
 */
function setGrid() {
  membersEl.classList.add('grid');
  membersEl.classList.remove('list');
  gridBtn.classList.add('active');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.classList.remove('active');
  listBtn.setAttribute('aria-pressed', 'false');
}

/**
 * Sets the display to list view (without images)
 */
function setList() {
  membersEl.classList.add('list');
  membersEl.classList.remove('grid');
  listBtn.classList.add('active');
  listBtn.setAttribute('aria-pressed', 'true');
  gridBtn.classList.remove('active');
  gridBtn.setAttribute('aria-pressed', 'false');
}

// Event listeners for view toggle buttons
gridBtn.addEventListener('click', setGrid);
listBtn.addEventListener('click', setList);

// Initialize page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setGrid();
    loadMembers();
  });
} else {
  setGrid();
  loadMembers();
}
