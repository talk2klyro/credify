// DOM Elements
const grid = document.getElementById("problemsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let problemsData = [];

// Load Problems from JSON
fetch("assets/problems.json")
    .then(res => res.json())
    .then(data => {
        problemsData = data;
        displayProblems(problemsData);
    });

// Display Cards
function displayProblems(list) {
    grid.innerHTML = "";

    list.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="badge ${item.frequency}">${item.frequency}</span>
        `;

        card.addEventListener("click", () => {
            window.location.href = `problem.html?id=${item.id}`;
        });

        grid.appendChild(card);
    });
}

// Search Logic
searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = problemsData.filter(p =>
        p.title.toLowerCase().includes(value) ||
        p.description.toLowerCase().includes(value)
    );

    displayProblems(filtered);
});

// Filter by Category
categoryFilter.addEventListener("change", () => {
    const category = categoryFilter.value;

    if (category === "all") {
        displayProblems(problemsData);
    } else {
        const filtered = problemsData.filter(p => p.category === category);
        displayProblems(filtered);
    }
});
