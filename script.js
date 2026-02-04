const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const timerBox = document.getElementById("timer");
const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnBox = document.getElementById("btnBox");
const gif = document.getElementById("finalGif");
const music = document.getElementById("bgMusic");

let qIndex = 0;

// Music
if(CONFIG.music){
  document.body.addEventListener("click",()=>{
    music.play();
  },{once:true});
}

// Date
const today = new Date();
const unlock = new Date(CONFIG.unlockDate);

// Before Feb 7
if(today < unlock){

  title.innerHTML = "💌 Coming Soon 💌";
  subtitle.innerHTML = "This surprise is waiting for you...";
  question.innerHTML = "Come back on 7th February 💖";

  btnBox.style.display="none";

  startTimer();

}else{

  startValentine();

}

// Countdown
function startTimer(){

  setInterval(()=>{

    const diff = unlock - new Date();

    if(diff<=0) location.reload();

    const d = Math.floor(diff/86400000);
    const h = Math.floor(diff/3600000)%24;
    const m = Math.floor(diff/60000)%60;
    const s = Math.floor(diff/1000)%60;

    timerBox.innerHTML =
      `${d}d ${h}h ${m}m ${s}s ❤️`;

  },1000);
}

// Valentine Logic
function startValentine(){

  const day = today.getDate();
  const data = CONFIG.week[day];

  title.innerHTML = data ? data.name : "My Valentine 💖";
  subtitle.innerHTML = CONFIG.loverName;

  showQuestion();
}

// Questions
function showQuestion(){

  const q = CONFIG.questions[qIndex];

  question.innerHTML = q.q;
  yesBtn.innerHTML = q.yes;
  noBtn.innerHTML = q.no;

}

yesBtn.onclick = ()=>{

  qIndex++;

  if(qIndex < CONFIG.questions.length){
    showQuestion();
  }else{
    finish();
  }
};

noBtn.onclick = ()=>{
  noBtn.style.position="absolute";
  noBtn.style.left = Math.random()*80+"%";
  noBtn.style.top = Math.random()*80+"%";
};

// Finish
function finish(){

  question.innerHTML="Yayyy 💖 You Are My Valentine 😘";
  btnBox.style.display="none";
  timerBox.style.display="none";

  gif.hidden=false;
}

// Screenshot
function takeScreenshot(){

  const btn = document.getElementById("shotBtn");
  btn.style.display="none";

  html2canvas(document.getElementById("capture"))
  .then(canvas=>{

    const link=document.createElement("a");
    link.download="valentine.png";
    link.href=canvas.toDataURL();
    link.click();

    btn.style.display="block";

  });
}
