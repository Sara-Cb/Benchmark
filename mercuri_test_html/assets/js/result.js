let total = 0;
let correct = 0;
let wrong = 0;

if (localStorage.getItem("score") && localStorage.getItem("totalScore")) {
  total = localStorage.getItem("totalScore");
  correct = localStorage.getItem("score");
  wrong = total - correct;
}

function roundedPercentage(numero) {
  return Math.round(numero * 10) / 10;
}

const correctPercentage = roundedPercentage((correct / total) * 100);
const wrongPercentage = roundedPercentage((wrong / total) * 100);

const correctPerc = document.getElementById("correctPerc");
correctPerc.textContent = `${correctPercentage}`;

const wrongPerc = document.getElementById("wrongPerc");
wrongPerc.textContent = `${wrongPercentage}`;

const graph = document.getElementById("graph");
const esito = document.getElementById("esito");

const options = {
  responsive: true,
  maintainAspectRatio: false,
  width: 250,
  outerWidth: 300,
  outerHeight: 250,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: "70%",
};

const chartData = {
  labels: ["Wrong", "Correct"],
  datasets: [
    {
      borderWidth: 1,
      data: [wrongPercentage, correctPercentage],
      backgroundColor: ["#348D9E", "#D0DE15"],
      borderColor: ["#348D9E", "#D0DE15"],
      hoverOffset: -3,
    },
  ],
};

const myChart = new Chart(graph, {
  type: "doughnut",
  data: chartData,
  options: options,
});

var giudizio = function () {
  if (correct > 5) {
    return "Congratulations!<br><span id='congrats'>You passed the exam!</span> <br> <span class='little'>We'll send you the certificate in few minutes.<span>";
  } else {
    return "Oh no!<br><span id='ohNo'>You have not passed the exam.</span> <br> <span class='little'>It will be better next time!</span>";
  }
};

esito.innerHTML = giudizio();
