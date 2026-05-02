const BtnMdoe = document.querySelector(".mode");
const currentmode = localStorage.getItem("theme");

if (currentmode == "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}
if (BtnMdoe) {
  BtnMdoe.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme == "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
}

const btn = document.querySelector(".btn");
const copy = document.querySelector(".fa");
const inp = document.getElementById("input");
const message = document.querySelector(".container-alert");
btn.addEventListener("click", () => {
  inp.value = CreatePassword();
});

copy.addEventListener("click", () => {
  if (inp.value == "") {
    message.classList.add("active");
  } else {
    copypassword();
    message.innerHTML = CreatePassword() + "  copied";
    message.classList.remove("active");
    setTimeout(() => {
      message.classList.add("active");
    }, 2000);
  }
});

function CreatePassword() {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const PasswordLenght = 14;
  let password = "";

  // 1. Créer un tableau de la longueur du mot de passe voulu
  const randomValues = new Uint16Array(PasswordLenght);

  // 2. Remplir le tableau avec du hasard pur
  window.crypto.getRandomValues(randomValues);

  // 3. Transformer chaque nombre en un caractère de notre liste
  for (let i = 0; i < PasswordLenght; i++) {
    // On utilise le modulo pour rester dans les limites de l'index du charset
    const randomIndex = randomValues[i] % charset.length;
    console.log(randomIndex);

    password += charset.charAt(randomIndex);
  }

  return password;
}

function copypassword() {
  inp.select();
  inp.setSelectionRange(0, 999);
  navigator.clipboard.writeText(inp.value);
}
