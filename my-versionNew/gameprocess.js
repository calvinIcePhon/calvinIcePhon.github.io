const P1DOM = document.getElementById("P1");
const P2DOM = document.getElementById("P2");
const canvas1 = document.createElement("canvas");
const context1 = canvas1.getContext("2d");
const canvas2 = document.createElement("canvas");
const context2 = canvas2.getContext("2d");
const TimerDOM = document.getElementById("timer");
const DifferenceCount = document.getElementById("different");
const TimerTextDOM = document.getElementById("timerText");
const ScoreDOM = document.getElementById("score");
const root = document.documentElement.style;
let time = 0;
let currentTime = null;
let timerset;
let MaxScore;
let currentImageGroup;
let founddifferences = 0;
let differencsNum;
let currentStateNum = 0;
let StateNum = config.num;
let CurrentXrange;
let CurrentYrange;
let CurrentCentrePoint;
let lifeNum = 3;


/*=============================================*/
//modalButtonDOM.addEventListener('click',startGame()) ;
/*=============================================*/


function handleCanvasEvent(event) {
  var canvas = event.target;
  var ctx = canvas.getContext("2d");
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  var ctx1 = canvas1.getContext("2d");
  var ctx2 = canvas2.getContext("2d");

  console.log(CurrentXrange.length);
 
  if (checkValid(canvas, ctx, ctx1, ctx2, x, y)) {
    console.log('correct click')
  } else {
    updateHeart();
    lifeNum--;
    console.log(lifeNum)
    if (lifeNum == 0) {
      setTimeout(StopGame('Nice try'), 500);
    }
  }

 
  //drawCircle(ctx, cirArr[index].cX,cirArr[index].cY,cirArr[index].radius);
}

function StopGame(msg = '') {
  StopTimer();
  modal.style.display = "block";
  modalstatusDOM.textContent = msg;
  modalButtonDOM.style.display = "none";
}

function setCurrencScore() {
  founddifferences = 0;
}

function checkValid(canvas , ctx, ctx1, ctx2, x, y) {
  for (var i = 0; i < CurrentXrange.length; i++) {
    if (CurrentXrange[i].includes(x) && CurrentYrange[i].includes(y)) {
        console.log('click')
        if (canvas.getAttribute('name') == 'Canvas1') {
            drawCircle(ctx2, CurrentCentrePoint[i].cX, CurrentCentrePoint[i].cY, CurrentCentrePoint[i].radius);
          } else {
            drawCircle(ctx1, CurrentCentrePoint[i].cX, CurrentCentrePoint[i].cY, CurrentCentrePoint[i].radius);
          }
          drawCircle(ctx, CurrentCentrePoint[i].cX, CurrentCentrePoint[i].cY, CurrentCentrePoint[i].radius);
          founddifferences++;
      CurrentXrange.splice(i, 1);
      CurrentYrange.splice(i, 1);
      CurrentCentrePoint.splice(i, 1);
      updateDifferences(founddifferences);
      return true;
    } else {
     
    }   
  }

  return false;
}

function drawCircle(ctx, cX, cY, r) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.arc(cX, cY, r + 5, 0, 2 * Math.PI);
  ctx.strokeStyle = "red";
  ctx.stroke();
}

function setScore() {
  ScoreDOM.textContent = currentStateNum + '/' + MaxScore;
}

function setDifferences(num) {
  differencsNum = num;
  DifferenceCount.textContent = 0 + '/' + num;
}

function updateHeart() {
  let HeartDOM = document.querySelector(".img_heart");
  HeartDOM.remove();
  root.setProperty("--background-color", "rgb(255, 70, 70)");
  setTimeout(function () {
    root.setProperty("--background-color", "rgb(211, 238, 221)");
   }, 800);
}

function setMaxScore() {
  MaxScore =LoadedImages.length;
}

function updateDifferences(num) {
  DifferenceCount.textContent = num + "/" + differencsNum;
  checkWin(num);
}

function checkWin(num) {
  if (num == differencsNum) {
    currentStateNum++;
    setScore();
    if (checkWinningSuccess(currentStateNum)) {
      
    } else {
      StopTimer();
      next();
    }
  }
}

function checkWinningSuccess(num) {
  if (num == StateNum) {
    StopGame('Well done');
    return true;
  }
  return false;
}

function PlaceImages(a) {
  P1DOM.appendChild(canvas1);
  P2DOM.appendChild(canvas2);
}

function setCanvasContentIMG1IMG2(images) {
  //set first canvas
  canvas1.setAttribute("name", "Canvas1");
  canvas1.width = images[0].width;
  canvas1.height = images[0].height;
  context1.drawImage(images[0], 0, 0);

  //set second canvas
  canvas2.setAttribute("name", "Canvas2");
  canvas2.width = images[1].width;
  canvas2.height = images[1].height;
  context2.drawImage(images[1], 0, 0);
}

function startGame() {
  console.log(LoadedImages);
console.log( LoadedImages.length);
  console.log(Xranges)
  modal.style.display = 'none';
  SetTotalTime(config.time);
  setMaxScore();
  setScore();
  next();
}

function next() {
  setCanvasContentIMG1IMG2(getImageQues(LoadedImages));
  setCurrencScore();
  PlaceImages();
  CurrentXrange = getCurrentXrange(Xranges);
  CurrentYrange = getCurrentYrange(Yranges);
  setDifferences(CurrentXrange.length);
  CurrentCentrePoint = getCurrentCentrePoint(CenterPoint);
  console.log(CurrentCentrePoint)
  canvas1.addEventListener("click", handleCanvasEvent);

  canvas2.addEventListener("click", handleCanvasEvent);
  StartTimer();
}

function getImageQues(arr) {
  return arr.shift();
}

function getCurrentXrange(arr) {
  return arr.shift();
}

function getCurrentYrange(arr) {
  return arr.shift();
}

function getCurrentCentrePoint(arr) {
  return arr.shift();
}
/*=============styling====================================*/ //styling

function SetTotalTime(t) {
  time = t;
}

function StartTimer() {
  timerset = setInterval(SetTimer, 1000);
}

function StopTimer() {
  clearInterval(timerset);
}

function SetTimer() {
  if (currentTime == null) {
    currentTime = time;
  }

  var percentage = (currentTime / time) * 100;
    currentTime--;
    if (percentage >= 80) {
      root.setProperty("--timer-color", "rgb(27, 255, 0)");
      root.setProperty("--timer-color1", "rgb(26, 246, 0)");
      root.setProperty("--timer-color2", "rgb(52, 227, 32)");
      TimerDOM.style.width = percentage + "%";
      TimerTextDOM.textContent = currentTime + "s.";
    } else if (percentage >= 60) {
      root.setProperty("--timer-color", "rgb(130, 255, 0)");
      root.setProperty("--timer-color1", "rgb(118, 232, 0)");
      root.setProperty("--timer-color2", "rgb(134, 237, 28)");
      TimerDOM.style.width = percentage + "%";
      TimerTextDOM.textContent = currentTime + "s.";
    } else if (percentage >= 50) {
      root.setProperty("--timer-color", "rgb(252, 255, 0)");
      root.setProperty("--timer-color1", "rgb(224, 227, 0)");
      root.setProperty("--timer-color2", "rgb(229, 232, 26)");
      TimerDOM.style.width = percentage + "%";
      TimerTextDOM.textContent = currentTime + "s.";
    } else if (percentage >= 40) {
      root.setProperty("--timer-color", "rgb(255, 169, 0)");
      root.setProperty("--timer-color1", "rgb(226, 150, 1)");
      root.setProperty("--timer-color2", "rgb(240, 170, 33)");
      TimerDOM.style.width = percentage + "%";
      TimerTextDOM.textContent = currentTime + "s.";
    } else if (percentage >= 20) {
      root.setProperty("--timer-color", "rgb(255, 77, 0)");
      root.setProperty("--timer-color1", "rgb(225, 68, 0)");
      root.setProperty("--timer-color2", "rgb(235, 97, 37)");
      TimerDOM.style.width = percentage + "%";
      TimerTextDOM.textContent = currentTime + "s.";
    } else {
      root.setProperty("--timer-color", "rgb(255, 0, 0)");
      root.setProperty("--timer-color1", "rgb(223, 0, 0)");
      root.setProperty("--timer-color2", "rgb(235, 25, 25)");
      TimerDOM.style.width = percentage + "%";
      TimerTextDOM.textContent = currentTime + "s.";
    }

  if (currentTime == 0) {
    StopGame('Time Out');
  } 
}
