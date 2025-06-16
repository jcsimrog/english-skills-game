// Función para reproducir sonido de celebración
function playCelebrationSound() {
  const audio = document.getElementById("celebration-sound");
  audio.currentTime = 0;
  audio.play().catch(e => console.log("No se pudo reproducir el sonido:", e));
}

// Función para mostrar confeti
function showConfetti() {
  const container = document.getElementById("confetti-container");
  container.innerHTML = '';
  
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  container.appendChild(canvas);
  
  const ctx = canvas.getContext("2d");
  const pieces = [];
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      rotation: Math.random() * 360,
      speed: 2 + Math.random() * 3,
      radius: 5 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let stillAnimating = false;
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.radius/2, -p.radius/2, p.radius, p.radius);
      
      ctx.restore();
      
      p.y += p.speed;
      p.rotation += p.speed/10;
      
      if (p.y < canvas.height) {
        stillAnimating = true;
      }
    });
    
    if (stillAnimating) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  
  animate();
}

// Función para mostrar estrellas
function showStars() {
  const container = document.getElementById("confetti-container");
  
  for (let i = 0; i < 20; i++) {
    const star = document.createElement("div");
    star.innerHTML = "★";
    star.className = "celebration-star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${-10}%`;
    star.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    star.style.fontSize = `${20 + Math.random() * 30}px`;
    
    container.appendChild(star);
  }
  
  setTimeout(() => {
    container.innerHTML = '';
  }, 3000);
}