// =============================
// 🔥 خريطة الأرقام (7-segment)
// =============================
const digitsMap = {
  0: ["a", "b", "c", "d", "e", "f"],
  1: ["b", "c"],
  2: ["a", "b", "g", "e", "d"],
  3: ["a", "b", "g", "c", "d"],
  4: ["f", "g", "b", "c"],
  5: ["a", "f", "g", "c", "d"],
  6: ["a", "f", "g", "c", "d", "e"],
  7: ["a", "b", "c"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"],
};

// =============================
// 🔔 المتغيرات
// =============================
let alarmTime = null;
let alarmTriggered = false;
let alarmAudio = new Audio("./aduio/Alarm.mp3");
let snoozeBtn = null;

// =============================
// 🧱 إنشاء الأعواد
// =============================
function createSegments(el) {
  const segs = ["a", "b", "c", "d", "e", "f", "g"];

  segs.forEach((s) => {
    const div = document.createElement("div");
    div.classList.add("segment", "seg-" + s);
    el.appendChild(div);
  });
}

// =============================
// 🔢 تحديث الرقم
// =============================
function setDigit(el, number) {
  const segments = el.querySelectorAll(".segment");

  segments.forEach((seg) => seg.classList.remove("on"));

  digitsMap[number].forEach((s) => {
    el.querySelector(".seg-" + s).classList.add("on");
  });

  el.classList.add("flip");
  setTimeout(() => el.classList.remove("flip"), 300);
}

// =============================
// ⏱️ تجهيز الساعة
// =============================
const ids = ["h1", "h2", "m1", "m2", "s1", "s2"];
ids.forEach((id) => createSegments(document.getElementById(id)));

// =============================
// 🕒 تحديث الساعة
// =============================
function updateClock() {
  const now = new Date();

  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");

  let time = [...hours, ...minutes, ...seconds];

  ids.forEach((id, i) => {
    setDigit(document.getElementById(id), time[i]);
  });

  let currentTime = hours + ":" + minutes;

  if (alarmTime === currentTime && !alarmTriggered) {
    triggerAlarm();
  }
}

setInterval(updateClock, 1000);
updateClock();

// =============================
// ⏰ ضبط المنبه
// =============================
window.setAlarm = function () {
  const input = document.getElementById("alarmTime");

  if (!input || !input.value) {
    alert("حدد وقت المنبه!");
    return;
  }

  alarmTime = input.value;
  alarmTriggered = false;

  document.getElementById("status").innerText =
    "✔ تم ضبط المنبه على " + alarmTime;
};

// =============================
// 🔔 تشغيل المنبه
// =============================
function triggerAlarm() {
  alarmTriggered = true;

  alarmAudio.loop = true;
  alarmAudio.play();

  document.getElementById("status").innerText = "⏰ استيقظ!";

  showSnoozeButton();
}

// =============================
// 💤 Snooze (تأجيل دقيقتين)
// =============================
function snooze() {
  alarmAudio.pause();
  alarmAudio.currentTime = 0;

  let now = new Date();
  now.setMinutes(now.getMinutes() + 2);

  let h = String(now.getHours()).padStart(2, "0");
  let m = String(now.getMinutes()).padStart(2, "0");

  alarmTime = `${h}:${m}`;
  alarmTriggered = false;

  document.getElementById("status").innerText =
    "تم تأجيل المنبه إلى " + alarmTime;

  hideSnoozeButton();
}

// =============================
// 👇 إنشاء زر Snooze
// =============================
function showSnoozeButton() {
  if (!snoozeBtn) {
    snoozeBtn = document.createElement("button");
    snoozeBtn.id = "snoozeBtn";
    snoozeBtn.innerText = "غفوة";
    snoozeBtn.onclick = snooze;

    document.querySelector(".alarm-box").appendChild(snoozeBtn);
  }

  snoozeBtn.style.display = "block";
}

// =============================
// ❌ إخفاء زر Snooze
// =============================
function hideSnoozeButton() {
  if (snoozeBtn) {
    snoozeBtn.style.display = "none";
  }
}
