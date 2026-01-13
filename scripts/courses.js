// Courses rendering and filtering for WDD231
document.addEventListener('DOMContentLoaded', () => {
    const courseGrid = document.getElementById('course-grid');
    const creditTotal = document.getElementById('credit-total');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Sample course data — adjust as needed
    const courses = [
        { code: 'WDD101', title: 'Introduction to Web Development', credits: 3, category: 'wdd' },
        { code: 'WDD201', title: 'Responsive Layouts & CSS', credits: 3, category: 'wdd' },
        { code: 'WDD231', title: 'Advanced JavaScript', credits: 4, category: 'wdd' },
        { code: 'CSE101', title: 'Intro to Computer Science', credits: 4, category: 'cse' },
        { code: 'CSE202', title: 'Data Structures', credits: 3, category: 'cse' }
    ];

    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderCourseCard(course) {
        return `
      <article class="course-card" data-category="${escapeHTML(course.category)}">
        <h3 class="course-title">${escapeHTML(course.title)}</h3>
        <p class="course-meta">${escapeHTML(course.code)} • ${escapeHTML(String(course.credits))} credits</p>
      </article>
    `;
    }

    function renderCourses(list) {
        if (!courseGrid) return;
        courseGrid.innerHTML = list.length ? list.map(renderCourseCard).join('') : '<p>No courses available.</p>';
    }

    function updateCreditTotal(list) {
        if (!creditTotal) return;
        const total = list.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
        creditTotal.textContent = total;
    }

    function applyFilter(filter) {
        const filtered = filter === 'all' ? courses : courses.filter(c => c.category === filter);
        renderCourses(filtered);
        updateCreditTotal(filtered);
    }

    // Wire up filter buttons
    if (filterButtons && filterButtons.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter || 'all';
                // active state for buttons (small visual helper)
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilter(filter);
            });
        });
    }

    // Initial render
    renderCourses(courses);
    updateCreditTotal(courses);
});
