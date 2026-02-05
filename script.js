// Valentine Week Start Date (7 Feb)
const startDate = new Date("2026-01-29T00:00:00");

const comingSoon = document.getElementById("comingSoon");
const mainContent = document.getElementById("mainContent");
const countdown = document.getElementById("countdown");

function checkDate() {
  const now = new Date();
  if (now < startDate) {
    comingSoon.style.display = "block";
    mainContent.hidden = true;
    startCountdown();
  } else {
    comingSoon.style.display = "none";
    mainContent.hidden = false;
  }
}

function startCountdown() {
  setInterval(() => {
    const now = new Date();
    const diff = startDate - now;
    if (diff <= 0) {
      location.reload();
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    countdown.innerHTML = `${days} Days ${hours}h ${mins}m ${secs}s 💗`;
  }, 1000);
}

checkDate();

const title = document.getElementById("title");
const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const finalGif = document.getElementById("finalGif");
const music = document.getElementById("bgMusic");
const screenshotText = document.getElementById("screenshotText");

function getToday() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${m}-${day}`;
}

const today = getToday();
const DAY = CONFIG.week[today] || CONFIG.week["02-05"];

// Init
title.innerText = `Hey ${CONFIG.name} ${DAY.emoji}`;
question.innerHTML = `
  <div>${DAY.title}</div>
  <div style="margin-top:10px;font-size:1.1rem;">
    ${DAY.question}
  </div>
`; // FIXED: Closed backtick and moved semicolon

yesBtn.innerText = "Continue 💖";

yesBtn.onclick = () => {
  if (music.paused) music.play().catch(() => {});
  finish();
};

noBtn.onmouseover = () => {
  noBtn.style.transform = `translate(${Math.random() * 200 - 100}px,${Math.random() * 200 - 100}px)`;
};

noBtn.onclick = () => {
  alert("Heyyy 😝💖 No is not allowed my Loveedubby ❤️");
};

function finish() {
  question.innerText = DAY.final;
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  
  // Show GIF only on Valentine Day
  if (today === "02-14") {
    finalGif.hidden = false;
  }
  
  screenshotText.style.display = "block";
  startSymbols();
  
  // Confetti removed as requested.
  // This starts the improved canvas-based fireworks.
  startFireworks();
}

function startSymbols() {
  setInterval(() => {
    const el = document.createElement("div");
    el.className = "symbol";
    el.innerText = DAY.symbol;
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = Math.random() * 3 + 4 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 7000);
  }, 300);
}

// Floating hearts in the background
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (15 + Math.random() * 20) + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);

/* --- Improved Fireworks (Canvas-based) --- */
function startFireworks() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.velocity = {
        x: (Math.random() - 0.5) * 8, // Blast spread
        y: (Math.random() - 0.5) * 8
      };
      this.alpha = 1; // For fading
      this.friction = 0.95; // Slows them down over time
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;
      this.y += 0.08; // Small gravity effect
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 0.01; // Fade speed
    }
  }

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height * 0.5); // Explode in top half
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle(x, y, color));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, i) => {
      if (particle.alpha > 0) {
        particle.update();
        particle.draw();
      } else {
        particles.splice(i, 1);
      }
    });
  }

  setInterval(createFirework, 1000); // New firework every second
  animate();
}
