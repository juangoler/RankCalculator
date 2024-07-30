function updateRank() {
  const victoriesInput = document.getElementById("victories");
  const defeatsInput = document.getElementById("defeats");

  if (!victoriesInput || !defeatsInput) {
    console.error("Elementos de entrada não encontrados!");
    return;
  }

  const victories = parseInt(victoriesInput.value);
  const defeats = parseInt(defeatsInput.value);

  const { resultText, rankImageSrc } = calculateRank(victories, defeats);

  let rankImage = document.getElementById("rankImage");
  rankImage.style.display = "none";
  rankImage.classList.remove("show");

  if (rankImageSrc) {
    rankImage.src = rankImageSrc;
    rankImage.style.display = "block";
    rankImage.classList.add("show");
  }

  const resultElement = document.getElementById("result");
  if (resultElement) {
    resultElement.textContent = resultText;
  } else {
    console.error("Elemento de resultado não encontrado!");
  }
}

function calculateRank(victories, defeats) {
  if (isNaN(victories) || isNaN(defeats) || victories < 0 || defeats < 0) {
    return {
      resultText: "Por favor, insira valores válidos para vitórias e derrotas.",
      rankImageSrc: "",
    };
  }

  const winrate = victories / (victories + defeats);
  let pontosRank = victories * winrate;
  let resultText = "";
  let rankImageSrc = "";

  if (winrate < 0.5) {
    pontosRank *= 1.15;
  }

  if (pontosRank < 25) {
    resultText = "O jogador não tem rank";
  } else if (pontosRank < 100) {
    resultText = "O jogador está no rank Prata";
    rankImageSrc = "imgs/prata.webp";
  } else if (pontosRank < 500) {
    resultText = "O jogador está no rank Ouro";
    rankImageSrc = "imgs/ouro.webp";
  } else if (pontosRank < 1500) {
    resultText = "O jogador está no rank Platina";
    rankImageSrc = "imgs/platina.webp";
  } else if (pontosRank < 3000) {
    resultText = "O jogador está no rank Lenda";
    rankImageSrc = "imgs/lenda.webp";
  } else {
    resultText = "O jogador está no rank Surreal";
    rankImageSrc = "imgs/surreal.webp";
  }

  return { resultText, rankImageSrc };
}

let toggleBtn = document.getElementById("toggle-btn");
let themeStylesheet = document.getElementById("theme-stylesheet");
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  themeStylesheet.href = "styles_dark.css";
  localStorage.setItem("dark-mode", "enabled");
};

const enableLightMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  themeStylesheet.href = "styles_light.css";
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
} else {
  enableLightMode();
}

toggleBtn.onclick = () => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    enableLightMode();
  }
};

