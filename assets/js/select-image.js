// Variables globales
let correctAnswers = 0;
let wrongAnswers = 0;

// Selección de imágenes
document.querySelectorAll(".img-option").forEach(option => {
  option.addEventListener("click", function() {
    const questionDiv = this.closest(".image-question");
    
    // Remover selección previa en la misma pregunta
    questionDiv.querySelectorAll(".img-option").forEach(opt => {
      opt.classList.remove("selected");
    });
    
    // Marcar como seleccionado
    this.classList.add("selected");
    questionDiv.setAttribute("data-selected", this.getAttribute("data-value"));
  });
});

// Validar respuestas
document.getElementById("check-answers").addEventListener("click", function() {
  correctAnswers = 0;
  wrongAnswers = 0;
  
  document.querySelectorAll(".image-question").forEach(question => {
    const correctAnswer = question.getAttribute("data-answer");
    const selectedAnswer = question.getAttribute("data-selected");
    const options = question.querySelectorAll(".img-option");
    
    if (selectedAnswer === correctAnswer) {
      correctAnswers++;
      options.forEach(opt => {
        if (opt.getAttribute("data-value") === correctAnswer) {
          opt.style.border = "3px solid #a8f0c1"; // Verde (correcto)
        }
      });
    } else if (selectedAnswer) { // Respuesta incorrecta
      wrongAnswers++;
      options.forEach(opt => {
        if (opt.getAttribute("data-value") === selectedAnswer) {
          opt.style.border = "3px solid #ffb3ba"; // Rojo (incorrecto)
        }
        if (opt.getAttribute("data-value") === correctAnswer) {
          opt.style.border = "3px solid #a8f0c1"; // Verde (respuesta correcta)
        }
      });
    }
  });
  
  // Actualizar contadores
  document.getElementById("correct-count").textContent = correctAnswers;
  document.getElementById("wrong-count").textContent = wrongAnswers;
  
  // Mostrar feedback
  const feedback = document.getElementById("feedback");
  if (correctAnswers === 3) {
    feedback.textContent = "🎉 Fantastic! All answers are correct!";
    feedback.style.color = "#06d6a0";
  } else {
    feedback.textContent = `Try again! You got ${correctAnswers} out of 3 correct.`;
    feedback.style.color = "#ef476f";
  }
});

// Reiniciar ejercicio
document.getElementById("reset-exercise").addEventListener("click", function() {
  document.querySelectorAll(".img-option").forEach(option => {
    option.classList.remove("selected");
    option.style.border = "none";
  });
  
  document.querySelectorAll(".image-question").forEach(question => {
    question.removeAttribute("data-selected");
  });
  
  correctAnswers = 0;
  wrongAnswers = 0;
  document.getElementById("correct-count").textContent = "0";
  document.getElementById("wrong-count").textContent = "0";
  document.getElementById("feedback").textContent = "";
});