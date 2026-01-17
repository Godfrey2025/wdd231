
const membersContainer = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

function levelBadge(level){
  switch(level){
    case 3: return {label: 'Gold', class: 'gold'};
    case 2: return {label: 'Silver', class: 'silver'};
    default: return {label: 'Member', class: 'member'};
  }
}

function renderMemberCard(m){
  const {label, class: cls} = levelBadge(m.level);
  const article = document.createElement('article');
  article.className = 'card';
  article.innerHTML = `
    <img src="${m.image}" alt="${m.name} logo">
    <div>
      <h3>${m.name} <span class="badge ${cls}" aria-label="${label}">${label}</span></h3>
      <p class="meta">${m.address} · <a href="tel:${m.phone.replace(/\s+/g,'')}">${m.phone}</a></p>
      <p>${m.about}</p>
      <p class="actions"><a href="${m.website}" target="_blank" rel="noopener">Visit website</a></p>
    </div>
  `;
  return article;
}

async function loadMembers(){
  try{
    const res = await fetch('../data/members.json');
    if(!res.ok) throw new Error(`Failed to load members: ${res.status}`);
    const members = await res.json();

    membersContainer.innerHTML = '';
    members.forEach(m => membersContainer.appendChild(renderMemberCard(m)));
  }catch(err){
    membersContainer.innerHTML = `<p role="alert">Could not load directory. Please try again later.</p>`;
    console.error(err);
  }finally{
    membersContainer.setAttribute('aria-busy','false');
  }
}

function setGrid(){
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
  gridBtn.setAttribute('aria-pressed','true');
  listBtn.setAttribute('aria-pressed','false');
}

function setList(){
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
  gridBtn.classList.remove('active');
  listBtn.classList.add('active');
  gridBtn.setAttribute('aria-pressed','false');
  listBtn.setAttribute('aria-pressed','true');

  // In list view, make each card full-width stacked
  [...membersContainer.children].forEach(card => {
    card.style.display = 'grid';
    card.style.gridTemplateColumns = '48px 1fr';
  });
}

gridBtn?.addEventListener('click', setGrid);
listBtn?.addEventListener('click', setList);

setGrid();
loadMembers();
