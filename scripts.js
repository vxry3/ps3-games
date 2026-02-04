const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const categories = ["All", "Action", "Adventure", "RPG", "Racing", "Sports", "Shooter"];

let games = [];
let selectedCategory = "All";
let selectedLetter = "A";

const alphabet = document.getElementById("alphabet");
const tabs = document.getElementById("tabs");
const gameList = document.getElementById("gameList");

async function loadGames() {
    const response = await fetch("games.json");
    games = await response.json();
    games.sort((a, b) => a.title.localeCompare(b.title));
    init();
}

function init() {
    displayTabs();
    displayAlphabet();
    filterGames();
}

function displayTabs() {
    tabs.innerHTML = "";
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => {
            selectedCategory = cat;
            filterGames();
            setActiveTab(cat);
        };
        tabs.appendChild(btn);
    });
}

function setActiveTab(cat) {
    document.querySelectorAll(".tabs button").forEach(btn => {
        btn.classList.remove("active");
        if (btn.textContent === cat) btn.classList.add("active");
    });
}

function displayAlphabet() {
    alphabet.innerHTML = "";
    letters.forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.onclick = () => {
            selectedLetter = letter;
            filterGames();
            setActiveLetter(letter);
        };
        alphabet.appendChild(btn);
    });
}

function setActiveLetter(letter) {
    document.querySelectorAll(".alphabet button").forEach(btn => {
        btn.classList.remove("active");
        if (btn.textContent === letter) btn.classList.add("active");
    });
}

function filterGames() {
    let filtered = games;

    // Filter by category
    if (selectedCategory !== "All") {
        filtered = filtered.filter(game => game.category === selectedCategory);
    }

    // Filter by letter
    filtered = filtered.filter(game => game.title.toUpperCase().startsWith(selectedLetter));

    displayGames(filtered);
}

function displayGames(list) {
    gameList.innerHTML = "";

    if (list.length === 0) {
        gameList.innerHTML = "<p>No games found.</p>";
        return;
    }

    list.forEach(game => {
        gameList.innerHTML += `
      <div class="card">
        <h4>${game.title}</h4>
        <p><strong>Category:</strong> ${game.category}</p>
        <a href="${game.link}" download>Download</a>
      </div>
    `;
    });
}

loadGames();