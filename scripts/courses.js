// Course List Array (set `completed: true` for courses you've finished)
const courses = [
    { code: "WDD 130", title: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 140", title: "Intro to Web Graphics", credits: 2, type: "WDD", completed: false },
    { code: "WDD 231", title: "Frontend Web Development", credits: 3, type: "WDD", completed: false },
    { code: "WDD 232", title: "Web Accessibility & UX", credits: 2, type: "WDD", completed: false },
    { code: "CSE 110", title: "Programming Building Blocks", credits: 2, type: "CSE", completed: true },
    { code: "CSE 111", title: "Programming with Functions", credits: 3, type: "CSE", completed: false },
    { code: "CSE 120", title: "Data Structures Basics", credits: 3, type: "CSE", completed: false },
    { code: "CSE 130", title: "Introduction to Databases", credits: 3, type: "CSE", completed: false }
];

const grid = document.getElementById("course-grid");
const creditTotal = document.getElementById("credit-total");
const filterButtons = document.querySelectorAll(".filter-btn");

function formatCredits(n) {
    return Number(n) || 0;
}

function createCard(course) {
    const card = document.createElement("article");
    card.className = `course-card ${course.completed ? "completed" : "incomplete"}`;
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
        <div class="course-title">
            <strong>${course.code}</strong>
            <span>${course.credits} cr</span>
        </div>
        <h3>${course.title}</h3>
        <p class="course-meta">${course.type} • ${course.completed ? "Completed" : "In progress"}</p>
    `;
    return card;
}

function render(list) {
    if (!grid) return;
    grid.innerHTML = "";
    list.forEach(course => grid.appendChild(createCard(course)));

    // Sum credits of currently displayed list
    const total = list.reduce((sum, c) => sum + formatCredits(c.credits), 0);
    if (creditTotal) creditTotal.textContent = total;
}

function applyFilter(kind) {
    let filtered = courses.slice();
    if (kind === "wdd") filtered = courses.filter(c => c.type === "WDD");
    else if (kind === "cse") filtered = courses.filter(c => c.type === "CSE");
    render(filtered);
}

// Default render (all courses)
render(courses);

// Attach button listeners if present
if (filterButtons && filterButtons.length) {
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const kind = btn.getAttribute("data-filter");
            applyFilter(kind);
        });
    });
}
