const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const container = document.querySelector(".container2");
const TextScore = document.querySelector(".score");
const TextTime = document.querySelector(".time");

// Déplace tes fonctions en dehors de l'event listener pour plus de clarté
function MettreAjour(A, B) {
  // Utilise TOUJOURS la même clé (ici "TopScores")
  const scores = JSON.parse(localStorage.getItem("TopScores")) || [];
  const info = { Nname: A, Nscore: B };

  scores.push(info);
  scores.sort((a, b) => b.Nscore - a.Nscore);

  const top5 = scores.slice(0, 5);
  localStorage.setItem("TopScores", JSON.stringify(top5));
  return top5;
}

function Affichache() {
  const scores = JSON.parse(localStorage.getItem("TopScores")) || [];
  const list = document.querySelector(".score-list");

  if (!list) return;

  list.innerHTML = "";

  if (scores.length === 0) {
    list.innerHTML = "Aucun score trouvé.";
    return;
  }

  scores.forEach((element, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${element.Nname} : <span>${element.Nscore}</span></strong>`;

    if (index === 0) {
      li.style.background = "green";
    }
    list.appendChild(li);
  });
}

// Appeler Affichage au chargement de la page pour voir les anciens scores
Affichache();

start.addEventListener("click", () => {
  let nom = prompt("Veuillez entrer votre nom");
  if (!nom) nom = "Anonyme";
  let score = 0;
  let time = 10;
  container.innerHTML = "";
  start.style.display = "none";
  reset.style.display = "block";

  let interval = setInterval(() => {
    const target = document.createElement("img");
    target.src = "silly.png";
    target.classList.add("target");
    container.appendChild(target);

    target.style.top = Math.random() * (800 - target.offsetHeight) + "px";
    target.style.left = Math.random() * (625 - target.offsetWidth) + "px";

    setTimeout(() => {
      target.remove();
    }, 2000);

    target.onclick = () => {
      target.style.display = "none";
      score++;
    };

    time--;

    console.log(score, time);

    TextScore.innerHTML = `Score : ${score}`;
    TextTime.innerHTML = `Time : ${time}`;

    if (time === 0) {
      clearInterval(interval);
      MettreAjour(nom, score);
      Affichache();
      container.innerHTML = "<p> Fin du jeu </p>";
      TextScore.innerHTML = `Score : 0`;
      start.style.display = "block";
      reset.style.display = "none";
    }
  }, 2000);
});

const themeBtn = document.querySelector("#theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

themeBtn.onclick = () => {
  const theme = document.documentElement.getAttribute("data-theme");

  if (theme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }

  console.log(localStorage);
};
