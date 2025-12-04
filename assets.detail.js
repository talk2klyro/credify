const params = new URLSearchconst params = new URLSearchParams(window.location.search);
const problemId = parseInt(params.get("id"));

let allProblems = [];

// Load JSON
fetch("assets/problems.json")
    .then(res => res.json())
    .then(data => {
        allProblems = data;
        const problem = allProblems.find(p => p.id === problemId);
        if (problem) loadProblem(problem);
    });

function loadProblem(item) {
    document.getElementById("title").textContent = item.title;
    document.getElementById("description").textContent = item.description;

    // Video
    document.getElementById("videoContainer").innerHTML = `
        <iframe src="${item.video}" frameborder="0" allowfullscreen></iframe>
    `;

    // Steps Accordion
    const stepsContainer = document.getElementById("stepsContainer");
    item.steps.forEach((s, index) => {
        const div = document.createElement("div");
        div.className = "step";
        div.innerHTML = `
            <strong>Step ${index + 1}</strong>
            <p>${s}</p>
        `;

        div.addEventListener("click", () => {
            const p = div.querySelector("p");
            p.style.display = p.style.display === "block" ? "none" : "block";
        });

        stepsContainer.appendChild(div);
    });

    // Related Problems
    const related = item.related || [];
    const relatedContainer = document.getElementById("relatedContainer");

    related.forEach(id => {
        const rel = allProblems.find(p => p.id === id);
        if (!rel) return;

        const div = document.createElement("div");
        div.textContent = rel.title;
        div.addEventListener("click", () => {
            window.location.href = `problem.html?id=${rel.id}`;
        });

        relatedContainer.appendChild(div);
    });
}
