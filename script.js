// Valentine Week Start Date (7 Feb)
const startDate = new Date("2026-02-07T00:00:00");

const comingSoon = document.getElementById("comingSoon");
const mainContent = document.getElementById("mainContent");
const countdown = document.getElementById("countdown");

function checkDate() {
  const now = new Date();

  if (now < startDate) {
    // Show Coming Soon
    comingSoon.style.display = "block";
    mainContent.hidden = true;

    startCountdown();

  } else {
    // Show Main Website
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

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    countdown.innerHTML =
      `${days} Days ${hours}h ${mins}m ${secs}s 💗`;

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


// Get Today
function getToday(){

  const d = new Date();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");

  return `${m}-${day}`;
}


const today = getToday();

const DAY = CONFIG.week[today] || CONFIG.week["02-14"];


// Init
title.innerText = `Hey ${CONFIG.name} ${DAY.emoji}`;
question.innerText = DAY.title;
yesBtn.innerText = "Continue 💖";


// Music
yesBtn.onclick = ()=>{

  if(music.paused) music.play().catch(()=>{});

  finish();
};


// No Run
noBtn.onmouseover = ()=>{
  noBtn.style.transform =
  `translate(${Math.random()*200-100}px,${Math.random()*200-100}px)`;
};


// Finish
function finish(){

question.innerText = DAY.final;

  yesBtn.style.display="none";
  noBtn.style.display="none";

  finalGif.hidden=false;
  screenshotText.style.display="block";

  startSymbols();
  startConfetti();
  startFireworks();
}


// Day Animation
function startSymbols(){

  setInterval(()=>{

    const el = document.createElement("div");

    el.className="symbol";
    el.innerText = DAY.symbol;

    el.style.left = Math.random()*100+"vw";
    el.style.animationDuration =
      Math.random()*3+4+"s";

    document.body.appendChild(el);

    setTimeout(()=>el.remove(),7000);

  },300);
}
// Floating hearts
setInterval(() => {

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (15 + Math.random() * 20) + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);

}, 500);
/* Confetti Effect */
function startConfetti() {

  const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#ef476f"];

  setInterval(() => {

    const confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.animationDuration =
      Math.random() * 3 + 3 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 6000);

  }, 150);
}


/* Fireworks Effect */
function startFireworks() {

  setInterval(() => {

    const firework = document.createElement("div");
    firework.className = "firework";

    firework.style.left = Math.random() * 80 + 10 + "vw";
    firework.style.top = Math.random() * 50 + 10 + "vh";

    firework.style.background =
      `hsl(${Math.random() * 360},100%,60%)`;

    document.body.appendChild(firework);

    setTimeout(() => {
      firework.remove();
    }, 1500);

  }, 1200);
}
