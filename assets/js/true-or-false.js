// Variables globales
let correctAnswers = 0;
let wrongAnswers = 0;

// Selección de respuestas True/False
document.querySelectorAll(".tf-btn").forEach(button => {
  button.addEventListener("click", function() {
    const questionDiv = this.closest(".tf-question");
    const selectedValue = this.getAttribute("data-value");
    
    // Remover selección previa en la misma pregunta
    questionDiv.querySelectorAll(".tf-btn").forEach(btn => {
      btn.classList.remove("selected");
    });
    
    // Marcar como seleccionado
    this.classList.add("selected");
    questionDiv.setAttribute("data-selected", selectedValue);
  });
});

// Validar respuestas
document.getElementById("check-answers").addEventListener("click", function() {
  correctAnswers = 0;
  wrongAnswers = 0;
  
  document.querySelectorAll(".tf-question").forEach(question => {
    const correctAnswer = question.getAttribute("data-answer");
    const selectedAnswer = question.getAttribute("data-selected");
    const buttons = question.querySelectorAll(".tf-btn");
    
    if (selectedAnswer === correctAnswer) {
      correctAnswers++;
      buttons.forEach(btn => {
        if (btn.getAttribute("data-value") === correctAnswer) {
          btn.style.backgroundColor = "#a8f0c1"; // Verde (correcto)
        }
      });
    } else if (selectedAnswer) { // Respuesta incorrecta
      wrongAnswers++;
      buttons.forEach(btn => {
        if (btn.getAttribute("data-value") === selectedAnswer) {
          btn.style.backgroundColor = "#ffb3ba"; // Rojo (incorrecto)
        }
        if (btn.getAttribute("data-value") === correctAnswer) {
          btn.style.backgroundColor = "#a8f0c1"; // Verde (respuesta correcta)
        }
      });
    }
  });
  
  // Actualizar contadores
  document.getElementById("correct-count").textContent = correctAnswers;
  document.getElementById("wrong-count").textContent = wrongAnswers;
  
  // Mostrar feedback
  const feedback = document.getElementById("feedback");
  if (correctAnswers === 5) {
    feedback.textContent = "🎉 Excellent! All answers are correct!";
    feedback.style.color = "#06d6a0";
  } else {
    feedback.textContent = `Keep practicing! You got ${correctAnswers} out of 5 correct.`;
    feedback.style.color = "#ef476f";
  }
});

// Reiniciar ejercicio
document.getElementById("reset-exercise").addEventListener("click", function() {
  document.querySelectorAll(".tf-btn").forEach(button => {
    button.classList.remove("selected");
    button.style.backgroundColor = "";
  });
  
  document.querySelectorAll(".tf-question").forEach(question => {
    question.removeAttribute("data-selected");
  });
  
  correctAnswers = 0;
  wrongAnswers = 0;
  document.getElementById("correct-count").textContent = "0";
  document.getElementById("wrong-count").textContent = "0";
  document.getElementById("feedback").textContent = "";
});