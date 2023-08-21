const test = [
  {
    id: 1,
    question:
      "Su quale formula Albert Einstein si basò per costruire la relatività ristretta?",
    type: "single_choice",
    options: [
      "L'equazione di Lorenz",
      "L'equazione della gravitazione universale di Newton",
      "Le equazioni dell'elettromagnetismo di Maxwell",
    ],
    correctAnswer: ["L'equazione di Lorenz"],
    score: 4,
  },
  {
    id: 2,
    question: "Come veniva definito da Platone il mondo delle idee?",
    type: "single_choice",
    options: [
      "Mondo noumenico",
      "Mondo iperuranio",
      "Mondo ultraterreno",
      "Mondo fenomenico",
    ],
    correctAnswer: ["Mondo iperuranio"],
    score: 3,
  },
  {
    id: 3,
    question:
      "Quali dei seguenti personaggi storici sono stati imperatori romani?",
    type: "multiple_choice",
    options: [
      "Giulio Cesare",
      "Tarquinio il superbo",
      "Nerone",
      "Scipione l'africano",
      "Costantino",
      "Cicerone",
    ],
    correctAnswer: ["Giulio Cesare", "Nerone", "Costantino"],
    score: 3,
  },
  {
    id: 4,
    question:
      "Qual è il frutto che per la sua alta concentrazione di potassio risulta radioattivo?",
    type: "single_choice",
    options: ["La mela", "La banana", "La ciliegia", "Il cocomero"],
    correctAnswer: ["La banana"],
    score: 2,
  },
  {
    id: 5,
    question: "Quali tra questi filosofi sono considerati presocratici?",
    type: "multiple_choice",
    options: [
      "Gorgia",
      "Talete",
      "Anassimandro",
      "Democrito",
      "Socrate",
      "Aristotele",
    ],
    correctAnswer: ["Talete", "Anassimandro"],
    score: 4,
  },
  {
    id: 6,
    question: "In quale giorno dell'anno fu incoronato imperatore Carlo Magno?",
    type: "single_choice",
    options: ["25 dicembre", "1 maggio", "18 Novembre"],
    correctAnswer: ["25 dicembre"],
    score: 2,
  },
  {
    id: 7,
    question:
      "Quale band fece scandalo per essersi definita più famosa di Gesù?",
    type: "single_choice",
    options: ["I Beatles", "I Rolling Stones", "I Ramones"],
    correctAnswer: ["I Beatles"],
    score: 1,
  },
  {
    id: 8,
    question:
      "Trascina gli elementi di seguito in modo da posizionarli in ordine crescente",
    type: "order",
    options: ["Infanzia", "Adolescenza", "Giovinezza", "Maturità", "Vecchiaia"],
    correctAnswer: [
      "Infanzia",
      "Adolescenza",
      "Giovinezza",
      "Maturità",
      "Vecchiaia",
    ],
    score: 3,
  },
];

const questionTitle = document.getElementById("question"); // Titolo domanda
const answersDiv = document.getElementById("answersDiv"); // Risposta
const nxtBtn = document.getElementById("nxtBtn"); // Bottone prossima domanda
const questionNumber = document.getElementById("question-number"); // Numero domanda attuale
const totQuestionsNumber = document.getElementById("tot-questions"); // Numero domande totali

const questions = [];
var options = [];
var answerBtns = [];

let currentQuestionNumber = 0;
let score = 0;
let totalScore = 0;
let currentQuestion = questions[currentQuestionNumber];

// domande in ordine casuale
const organizeQuestions = () => {
  for (let i = 0; i < test.length; ) {
    const random = Math.floor(Math.random() * test.length);
    if (!questions.includes(test[random])) {
      questions.push(test[random]);
      totalScore += test[random].score;
      i++;
    }
  }
  totQuestionsNumber.innerText = questions.length;
  localStorage.setItem("totalScore", totalScore);
  nxtBtn.addEventListener("click", next);
  return questions;
};

function printQuestion() {
  options.forEach((option) => {
    const answerBtn = document.createElement("input");
    answerBtn.type =
      currentQuestion.type === "single_choice" ? "radio" : "checkbox";
    answerBtn.name = "answers";
    answerBtn.id = option;
    answerBtn.value = option;

    const answerText = document.createElement("label");
    answerText.classList.add("answer");
    answerText.htmlFor = answerBtn.id;
    answerText.innerHTML = option;
    answersDiv.appendChild(answerBtn);
    answersDiv.appendChild(answerText);
    answerBtns.push(answerBtn);
  });

  answerBtns.forEach((btn) => {
    btn.addEventListener("change", () => {
      nxtBtn.removeAttribute("disabled");
    });
  });
}

function orderQuestionPrint() {
  nxtBtn.removeAttribute("disabled");

  const sortableContainer = document.createElement("div");
  sortableContainer.classList.add("sortable-container"); // Aggiungi una classe al contenitore delle answer

  options.forEach((option, index) => {
    const sortableItem = document.createElement("div");
    sortableItem.classList.add("sortable-item"); // Aggiungi classe per il trascinamento
    sortableItem.classList.add("answer");
    sortableItem.innerHTML = `<span class="sortable-item-order">${
      index + 1
    }</span><span class="sortable-item-content">${option}</span>`;
    sortableContainer.appendChild(sortableItem);
    answerBtns.push(sortableItem);
  });

  answersDiv.appendChild(sortableContainer);

  var rowSize = 70; // Altezza di ciascun elemento
  var container = sortableContainer; // Usa sortableContainer come container
  var listItems = Array.from(document.querySelectorAll(".sortable-item")); // Array di elementi trascinabili
  var sortables = listItems.map(Sortable); // Array di oggetti Sortable
  var total = sortables.length;

  function changeIndex(item, to) {
    // Cambia la posizione nell'array
    arrayMove(sortables, item.index, to);

    // Cambia la posizione dell'elemento nel DOM
    if (to === total - 1) {
      container.appendChild(item.element);
    } else {
      var i = item.index > to ? to : to + 1;
      container.insertBefore(item.element, container.children[i]);
    }

    // Imposta l'indice per ciascun oggetto Sortable
    sortables.forEach((sortable, index) => sortable.setIndex(index));
  }

  function Sortable(element, index) {
    var content = element.querySelector(".sortable-item-content");
    var order = element.querySelector(".sortable-item-order");

    var animation = gsap.to(content, 0.3, {
      boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
      force3D: true,
      scale: 1.1,
      paused: true,
    });

    var dragger = new Draggable(element, {
      onDragStart: downAction,
      onRelease: upAction,
      onDrag: dragAction,
      cursor: "move",
      type: "y",
    });

    var sortable = {
      dragger: dragger,
      element: element,
      index: index,
      setIndex: setIndex,
    };

    gsap.set(element, { y: index * rowSize });

    function setIndex(index) {
      sortable.index = index;
      order.textContent = index + 1;

      if (!dragger.isDragging) layout();
    }

    function downAction() {
      animation.play();
      this.update();
    }

    function dragAction() {
      var index = clamp(Math.round(this.y / rowSize), 0, total - 1);

      if (index !== sortable.index) {
        changeIndex(sortable, index);
      }
    }

    function upAction() {
      animation.reverse();
      layout();
    }

    function layout() {
      gsap.to(element, 0.3, { y: sortable.index * rowSize });
    }

    return sortable;
  }

  // Changes an elements's position in array
  function arrayMove(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

  // Clamps a value to a min/max
  function clamp(value, a, b) {
    return value < a ? a : value > b ? b : value;
  }
}

function showQuestion() {
  answersDiv.innerHTML = "";
  nxtBtn.setAttribute("disabled", "true");
  answerBtns = [];

  currentQuestion = questions[currentQuestionNumber]; // Ottieni la domanda corrente dall'array questions
  questionNumber.innerText = currentQuestionNumber + 1;

  questionTitle.innerText = currentQuestion.question; // Mostra il testo della domanda corrente
  options = currentQuestion.options; //array delle answer alla domanda attuale
  options.sort(() => Math.random() - 0.5);

  if (
    currentQuestion.type === "single_choice" ||
    currentQuestion.type === "multiple_choice"
  ) {
    printQuestion();
  } else if (currentQuestion.type === "order") {
    orderQuestionPrint();
  }

  setNextBtnText();
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function arraysContainSameElements(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  return sortedArr1.every((element, index) => element === sortedArr2[index]);
}

//registro il punteggio e vado avanti
const next = function () {
  if (
    currentQuestion.type === "single_choice" ||
    currentQuestion.type === "multiple_choice"
  ) {
    const selectedAnswers = Array.from(answerBtns)
      .filter((btn) => btn.checked)
      .map((btn) => btn.value);

    const correctAnswers = currentQuestion.correctAnswer;

    const isCorrect = arraysContainSameElements(
      selectedAnswers,
      correctAnswers
    );

    if (isCorrect) {
      score += currentQuestion.score;
    }
  } else if (currentQuestion.type === "order") {
    const userSortedItems = Array.from(
      document.querySelectorAll(".sortable-item-content")
    ).map((element) => element.textContent);

    const correctOrder = currentQuestion.correctAnswer;

    if (arraysEqual(userSortedItems, correctOrder)) {
      score += currentQuestion.score;
    }
  }

  currentQuestionNumber++;
  if (currentQuestionNumber >= questions.length) {
    localStorage.setItem("score", score);
    window.location.href = "./../../result.html";
  } else {
    showQuestion();
  }
};

//cambio testo del button durante l'ultima domanda
function setNextBtnText() {
  if (currentQuestionNumber === questions.length - 1) {
    nxtBtn.value = "SHOW RESULTS";
    nxtBtn.innerText = "SHOW RESULTS";
  } else {
    nxtBtn.value = "NEXT QUESTION";
    nxtBtn.innerText = "NEXT QUESTION";
  }
}

window.addEventListener("load", function () {
  organizeQuestions();
  showQuestion();
  setNextBtnText();
});
