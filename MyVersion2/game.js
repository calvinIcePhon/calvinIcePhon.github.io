let levelConfig = [
  {
    id: 1,
    levelPositioning: [
      {
        type: "HS",
        x: 0,
        y: 0,
      },
      {
        type: "HL",
        x: 2,
        y: 1,
      },
      {
        type: "VS",
        x: 5,
        y: 0,
      },
      {
        type: "VL",
        x: 1,
        y: 3,
      },
      {
        type: "P",
        x: 3,
        y: 3,
      },
    ],
  }, {
    id: 2,
    levelPositioning: [
      {
        type: "HS",
        x: 0,
        y: 0,
      },
      {
        type: "HL",
        x: 2,
        y: 1,
      },
      {
        type: "VS",
        x: 5,
        y: 0,
      },
      {
        type: "VL",
        x: 1,
        y: 3,
      },
      {
        type: "P",
        x: 3,
        y: 3,
      },
    ],
  }, {
    id: 2,
    levelPositioning: [
      {
        type: "HS",
        x: 0,
        y: 0,
      },
      {
        type: "HL",
        x: 2,
        y: 1,
      },
      {
        type: "VS",
        x: 5,
        y: 0,
      },
      {
        type: "VL",
        x: 1,
        y: 3,
      },
      {
        type: "P",
        x: 3,
        y: 3,
      },
    ],
  }
];

let blocks = [];
let boardEle = document.getElementById("board");
let boardEleChilds = boardEle.children;
let stageInfo = document.getElementById("stageinfo");
let timerEle = document.getElementById('timer');
let modalEle = document.getElementById('modal');
let message = document.getElementById('message');
let startbutton = document.getElementById('startButton');
let index;
let startX;
let startY;
let lastX;
let lastY;
let distanceX;
let distanceY;
let movementType;
let touchStartFlag = false;
let stageNum = 1;
let timer;
let stageTarget = 5;
let time = 600;
let timeOutFlag = false;
let winningFlag = false;

function runTimer() {
  timer = setInterval(function () {
    if (time <= 0) {
      timeOutFlag = true;
      clearStage();
    } else {
      time--;
      timerEle.textContent = "Time left: "+time;
    }
  },1000);
}

function stopTimer() {
  clearInterval(timer);
}

function loss() {
  message.textContent = 'You Lose';
  modalEle.style.display = "block";
  startbutton.style.display = "none";
}

function win() {
  message.textContent = 'You Win';
  modalEle.style.display = "block";
  startbutton.style.display = "none";
}

boardEle.addEventListener("touchmove", function (event) {
  let touch = event.touches[0];
  lastX = touch.clientX;
  lastY = touch.clientY;
  distanceX = lastX - startX;
  distanceY = lastY - startY;
});

boardEle.addEventListener("touchend", function (event) {
    console.log(distanceX + "    " + distanceY);
  if (
    blocks[index].blockType == "P" ||
    blocks[index].blockType == "HS" ||
    blocks[index].blockType == "HL"
  ) {
      let type = "H";
      let move = getMovement(type, distanceX, distanceY);
      console.log('move h')
      blocks[index].Move(move.m, move.d, boardEleChilds[index]);
  } else {
    let type = "V";
    let move = getMovement(type, distanceX, distanceY);
    blocks[index].Move(move.m, move.d, boardEleChilds[index]);
    }
    
    resetVariable();
    console.log(boardArray);
  checkWinning(blocks[blocks.length - 1]);
  
});

function resetVariable() {
  startX = 0;
  startY = 0;
  lastX = 0;
  lastY = 0;
  distanceX = 0;
  distanceY = 0;
  index = null;
}

function getMovement(t, distanceX, distanceY) {
  if (t == "H" && distanceX < 0) {
    return { m: "left", d: Math.abs(distanceX) };
  } else if (t == "H" && distanceX > 0) {
    return { m: "right", d: Math.abs(distanceX) };
  } else if (t == "V" && distanceY < 0) {
    return { m: "up", d: Math.abs(distanceY) };
  } else if (t == "V" && distanceY > 0) {
    return { m: "down", d: Math.abs(distanceY) };
  }
}

function createStage() {
  for (var i = 0; i < levelConfig[0].levelPositioning.length; i++) {
    let o = levelConfig[0].levelPositioning[i];
    const blo = new block();
    blo.blockType = o.type;
    blo.pos = { X: o.x, Y: o.y };
    blo.placeArray();
    blocks.push(blo);
  }

  placeBlock();
  stageInfo.textContent = "Stage "  + stageNum + "/" + stageTarget;
  console.log(boardArray);
  runTimer();
}

function clearStage() {
  stopTimer();
  resetBoardArray();
  blocks = [];
  while (boardEleChilds.length > 0) {
    boardEle.removeChild(boardEleChilds[0]);
  }
  console.log('done')
  stageNum++;
  resetVariable();
  if (timeOutFlag) {
    console.log('loss timeout');
    loss();
  } else if(winningFlag){
    console.log('win');
    win();
  }
  else {
    setTimeout(createStage, 1000);
  }
}

function startGame() {
  modalEle.style.display = "none";
  createStage();
}

function checkWinning(b) {
  if (b.blockType == 'P') {
    if (b.pos.X == 5 || b.pos.X == 6) {
      console.log('winning');
      blocks.shift();
      if (stageNum == stageTarget) {
        winningFlag = true;
      }

        setTimeout(clearStage, 2000);
      
    }
  }
}
function placeBlock() {
  for (var i = 0; i < blocks.length; i++) {
    const blockEle = document.createElement("div");
    let o = blocks[i];
    if (o.blockType == "HS") {
      blockEle.style.width = "140px";
      blockEle.style.height = "70px";
    } else if (o.blockType == "HL") {
      blockEle.style.width = "210px";
      blockEle.style.height = "70px";
    } else if (o.blockType == "VS") {
      blockEle.style.width = "70px";
      blockEle.style.height = "140px";
    } else if (o.blockType == "VL") {
      blockEle.style.width = "70px";
      blockEle.style.height = "210px";
    } else if (o.blockType == "P") {
      blockEle.style.width = "140px";
      blockEle.style.height = "70px";
      blockEle.classList.add("Player");
    }

    blockEle.setAttribute("index", i.toString());
    blockEle.style.top = (o.pos.Y * 70).toString() + "px";
    console.log(blockEle.style.top);
    blockEle.style.left = (o.pos.X * 70).toString() + "px";
    console.log(blockEle.style.left);
    blockEle.classList.add("ObstacleBlock");
    blockEle.addEventListener("touchstart", function (event) {
      let touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      index = this.getAttribute("index");
      //console.log(index);
    });

    boardEle.appendChild(blockEle);
  }
}


