const membersEl = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

function badge(level) {
  if (level === 3) return { label: 'Gold', class: 'gold' };
  if (level === 2) return { label: 'Silver', class: 'silver' };
  return { label: 'Member', class: 'member' };
}

function card(m) {
  const b = badge(m.level);
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div>
      <h3>${m.name} <span class="badge ${b.class}">${b.label}</span></h3>
      <p>${m.address}</p>
      <p><a href="tel:${m.phone}">${m.phone}</a></p>
      <p><a href="${m.website}" target="_blank" rel="noopener">Visit Website</a></p>
    </div>`;
  return el;
}

async function loadMembers() {
  membersEl.setAttribute('aria-busy', 'true');
  const response = await fetch('data/members.json');
  const data = await response.json();
  membersEl.innerHTML = '';
  data.forEach(m => membersEl.appendChild(card(m)));
  membersEl.setAttribute('aria-busy', 'false');
}

function setGrid() {
  membersEl.classList.add('grid');
  membersEl.classList.remove('list');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
}

function setList() {
  membersEl.classList.add('list');
  membersEl.classList.remove('grid');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
}

gridBtn.addEventListener('click', setGrid);
listBtn.addEventListener('click', setList);

setGrid();
loadMembers();
