// Course List Array (edit completed: true for those you've finished)
const courses = [
    // Example entries – replace with the provided array from the assignment
    { code: "WDD 130", title: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 231", title: "Frontend Web Development", credits: 3, type: "WDD", completed: false },
    { code: "CSE 110", title: "Programming Building Blocks", credits: 2, type: "CSE", completed: false },
    { code: "CSE 111", title: "Programming with Functions", credits: 3, type: "CSE", completed: false },
    // ... add the rest from the course array
];

const grid = document.getElementById("course-grid");
const creditTotal = document.getElementById("credit-total");
const filterButtons = document.querySelectorAll(".filter-btn");

function render(list) {
    if (!grid) return;
    grid.innerHTML = "";
    list.forEach(course => {
        const card = document.createElement("article");
        card.className = `course-card ${course.completed ? "completed" : "incomplete"}`;
        card.innerHTML = `
      <div class="course-title">
        <strong>${course.code}</strong>
        <span>${course.credits} cr</span>
      </div>
      <h3>${course.title}</h3>
      <p class="course-meta">${course.type} • ${course.completed ? "Completed" : "In progress"}</p>
    `;
        grid.appendChild(card);
    });

    // Reduce credits of currently displayed list
    const total = list.reduce((sum, c) => sum + Number(c.credits || 0), 0);
    if (creditTotal) creditTotal.textContent = total;
}

function applyFilter(kind) {
    let filtered = courses;
    if (kind === "wdd") filtered = courses.filter(c => c.type === "WDD");
    else if (kind === "cse") filtered = courses.filter(c => c.type === "CSE");
    render(filtered);
}

// Default: render all
render(courses);

// Button listeners
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const kind = btn.getAttribute("data-filter");
        applyFilter(kind);
    });
});
