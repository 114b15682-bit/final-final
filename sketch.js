let totalTime = 60;
let timeLeft = 60;

let running = false;
let lastTick = 0;

let finishedCount = 0;

let inputMin, inputSec;
let btnStart, btnPause, btnReset;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  colorMode(HSB);

  // 輸入時間
  inputMin = createInput("0");
  inputMin.position(30, 30);
  inputMin.size(60);

  inputSec = createInput("30");
  inputSec.position(100, 30);
  inputSec.size(60);

  // ▶ 開始
  btnStart = createButton("開始");
  btnStart.position(180, 30);
  btnStart.mousePressed(startTimer);

  // ⏸ 暫停
  btnPause = createButton("暫停");
  btnPause.position(240, 30);
  btnPause.mousePressed(pauseTimer);

  // 🔄 重設
  btnReset = createButton("重設");
  btnReset.position(300, 30);
  btnReset.mousePressed(resetTimer);
}

function draw() {

  // 🌈 背景
  let hue = map(timeLeft, 0, totalTime, 0, 360);
  background(hue, 80, 90);

  // ⏱ 倒數
  if (running) {
    if (millis() - lastTick >= 1000) {
      timeLeft--;
      lastTick = millis();

      if (timeLeft <= 0) {
        timeLeft = 0;
        running = false;
        finishedCount++;
      }
    }
  }

  // 🔵 進度圈
  push();
  translate(width / 2, height / 2);

  let progress = map(timeLeft, totalTime, 0, 0, TWO_PI);

  noFill();

  stroke(0, 0, 100, 0.3);
  strokeWeight(30);
  circle(0, 0, 280);

  stroke(hue, 90, 100);
  strokeWeight(30);
  arc(0, 0, 280, 280, -HALF_PI, progress - HALF_PI);

  pop();

  // ⏰ 時間顯示
  fill(255);
  noStroke();
  textSize(90);

  let m = floor(timeLeft / 60);
  let s = timeLeft % 60;

  text(nf(m, 2) + ":" + nf(s, 2), width / 2, height / 2);

  // 📊 統計
  textSize(20);
  fill(0, 0, 20);
  text("完成次數：" + finishedCount, width / 2, height - 60);

  // 🔥 結束提示
  if (timeLeft === 0 && !running) {
    fill(0, 100, 100);
    textSize(50);
    text("時間到！", width / 2, height / 2 + 120);
  }
}

function startTimer() {

  let m = int(inputMin.value());
  let s = int(inputSec.value());

  totalTime = m * 60 + s;

  // 避免 0
  if (totalTime <= 0) return;

  timeLeft = totalTime;
  running = true;
  lastTick = millis();
}

function pauseTimer() {
  running = false;
}

function resetTimer() {
  running = false;
  timeLeft = totalTime;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}