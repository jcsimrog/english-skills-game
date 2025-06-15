// Variables globales
let correctAnswers = 0;
let wrongAnswers = 0;

// Funciones para Drag and Drop
function allowDrop(event) {
  event.preventDefault();
}

function dragWord(event) {
  event.dataTransfer.setData("text", event.target.getAttribute("data-word"));
}

function dropWord(event) {
  event.preventDefault();
  const word = event.dataTransfer.getData("text");
  const blank = event.target;
  
  // Limpiar si ya tiene una palabra
  if (blank.textContent) {
    return; // No permitir sobrescribir
  }
  
  blank.textContent = word;
  blank.setAttribute("data-filled", word);
  
  // Deshabilitar la palabra usada en el banco
  disableUsedWord(word);
}

// Deshabilitar palabra usada
function disableUsedWord(word) {
  const wordElements = document.querySelectorAll(".word");
  wordElements.forEach(element => {
    if (element.getAttribute("data-word") === word) {
      element.style.opacity = "0.5";
      element.style.backgroundColor = "#cccccc";
      element.setAttribute("draggable", "false");
      element.style.cursor = "not-allowed";
    }
  });
}

// Validar respuestas
document.getElementById("check-answers").addEventListener("click", function() {
  correctAnswers = 0;
  wrongAnswers = 0;
  
  document.querySelectorAll(".sentence").forEach(sentence => {
    const blank = sentence.querySelector(".blank");
    const correctAnswer = sentence.getAttribute("data-answer");
    const userAnswer = blank.getAttribute("data-filled");
    
    if (userAnswer === correctAnswer) {
      blank.style.backgroundColor = "#a8f0c1"; // Verde claro
      correctAnswers++;
    } else {
      blank.style.backgroundColor = "#ffb3ba"; // Rojo claro
      wrongAnswers++;
    }
  });
  
  // Actualizar contadores
  document.getElementById("correct-count").textContent = correctAnswers;
  document.getElementById("wrong-count").textContent = wrongAnswers;
  
  // Mostrar feedback
  const feedback = document.getElementById("feedback");
  if (correctAnswers === 5) {
    feedback.textContent = "¡Perfecto! 🎉 Todas las respuestas son correctas.";
    feedback.style.color = "#06d6a0";
  } else {
    feedback.textContent = `Sigue practicando. Tienes ${correctAnswers} de 5 correctas.`;
    feedback.style.color = "#ef476f";
  }
});

// Reiniciar ejercicio
document.getElementById("reset-exercise").addEventListener("click", function() {
  document.querySelectorAll(".blank").forEach(blank => {
    blank.textContent = "";
    blank.removeAttribute("data-filled");
    blank.style.backgroundColor = "transparent";
  });
  
  // Reactivar todas las palabras del banco
  document.querySelectorAll(".word").forEach(word => {
    word.style.opacity = "1";
    word.style.backgroundColor = "";
    word.setAttribute("draggable", "true");
    word.style.cursor = "grab";
  });
  
  correctAnswers = 0;
  wrongAnswers = 0;
  document.getElementById("correct-count").textContent = "0";
  document.getElementById("wrong-count").textContent = "0";
  document.getElementById("feedback").textContent = "";
});