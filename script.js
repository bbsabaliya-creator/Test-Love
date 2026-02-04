// Set Date Text
document.getElementById("dateText").innerText =
  new Date(TARGET_DATE).toDateString();


// Countdown Timer

function updateTimer() {

  const target = new Date(TARGET_DATE).getTime();
  const now = new Date().getTime();

  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("timer").innerText = "💖 It's Time! 💖";
    return;
  }

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24))/(1000*60*60));
  const mins = Math.floor((diff % (1000*60*60))/(1000*60));
  const secs = Math.floor((diff % (1000*60))/1000);

  document.getElementById("timer").innerText =
    `${days} Days ${hours}h ${mins}m ${secs}s 💗`;
}

setInterval(updateTimer, 1000);
updateTimer();


// Screenshot Function

function takeScreenshot() {

  const box = document.getElementById("capture");
  const btn = document.getElementById("saveBtn");

  // Hide only button
  btn.style.visibility = "hidden";

  html2canvas(box).then(canvas => {

    const link = document.createElement("a");
    link.download = "valentine_moment.png";
    link.href = canvas.toDataURL();
    link.click();

    // Show button again
    btn.style.visibility = "visible";
  });

}
