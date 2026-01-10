// scripts/course.js

// Example array (update "completed" to true for courses you've finished)
const courses = [
  { code: 'WDD130', name: 'Web Fundamentals', credits: 2, category: 'WDD', completed: true },
  { code: 'WDD131', name: 'Dynamic Web Fundamentals', credits: 3, category: 'WDD', completed: true },
  { code: 'WDD231', name: 'Frontend Web Development I', credits: 3, category: 'WDD', completed: false },
  { code: 'CSE110', name: 'Introduction to Programming', credits: 2, category: 'CSE', completed: true },
  { code: 'CSE210', name: 'Programming with Classes', credits: 3, category: 'CSE', completed: false },
  { code: 'CSE111', name: 'Programming Building Blocks', credits: 2, category: 'CSE', completed: false },
];

const grid = document.getElementById('courseGrid');
const creditTotalEl = document.getElementById('creditTotal');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(list) {
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '';

  list.forEach(c => {
    const card = document.createElement('article');
    card.className = `course-card${c.completed ? ' completed' : ''}`;
    card.innerHTML = `
      <h3>${c.code} — ${c.name}</h3>
      <p class="course-meta">
        <strong>Credits:</strong> ${c.credits} &nbsp;|&nbsp; 
        <strong>Category:</strong> ${c.category} &nbsp;|&nbsp; 
        <strong>Status:</strong> ${c.completed ? 'Completed' : 'In progress'}
      </p>
    `;
    grid.appendChild(card);
  });

  const totalCredits = list.reduce((sum, c) => sum + c.credits, 0);
  creditTotalEl.textContent = totalCredits;

  grid.setAttribute('aria-busy', 'false');
}

function setActiveButton(btn) {
  filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
  btn.setAttribute('aria-pressed', 'true');
}

function applyFilter(filter) {
  if (filter === 'all') return courses;
  return courses.filter(c => c.category === filter);
}

// Initial render
renderCourses(courses);

// Button listeners
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    setActiveButton(btn);
    renderCourses(applyFilter(filter));
  });
});
