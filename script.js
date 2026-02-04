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
