const boardArray = [
  ["X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X","X","X"],
  ["X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X"],
];

const sizeY = 5;
const sizeX = 5;
const playerX = 7;
const distCheck = 30;


function resetBoardArray() {
  for (var i = 0; i < boardArray.length; i++){
    for (var j = 0; j < boardArray[i].length; j++){
      boardArray[i][j] = "X";
    }
  }
}

function block() {
  this.blockType;
  this.stepsToMove = function (type, distance, blockELE) {
    console.log("checking" + type);
    while (distance > 30) {
      if (this.checkCollision(type)) {
        console.log("move");
        this.Moving(blockELE, type);
        distance -= 80;
      } else {
        break;
      }
    }
    //if(this.checkCollision(type))
  };
  this.Moving = function (blockELE, type) {
    console.log("moving  " + type);
    console.log(blockELE);
    if (type == "left") {
      console.log("true");
      if (this.blockType == "HS" ) {
        console.log("hi");
        boardArray[this.pos.Y][this.pos.X - 1] = "HS";
        boardArray[this.pos.Y][this.pos.X + 1] = "X";
        this.pos.X -= 1;
        blockELE.style.left = (this.pos.X *70).toString() + "px";
      } else if (this.blockType == "HL") {
        console.log("hi");
        boardArray[this.pos.Y][this.pos.X - 1] = "HL";
        boardArray[this.pos.Y][this.pos.X + 2] = "X";
        this.pos.X -= 1;
        blockELE.style.left = (this.pos.X * 70).toString() + "px";
      } else if (this.blockType == "P") {
        boardArray[this.pos.Y][this.pos.X - 1] = "P";
        boardArray[this.pos.Y][this.pos.X + 1] = "X";
        this.pos.X -= 1;
        blockELE.style.left = (this.pos.X * 70).toString() + "px";
      }
    } else if (type == "right") {
      if (this.blockType == "HS") {
        console.log("hi");
        boardArray[this.pos.Y][this.pos.X + 2] = "HS";
        boardArray[this.pos.Y][this.pos.X] = "X";
        this.pos.X += 1;
        blockELE.style.left = (this.pos.X * 70).toString() + "px";
      } else if (this.blockType == "HL") {
        console.log("hi");
        boardArray[this.pos.Y][this.pos.X + 3] = "HL";
        boardArray[this.pos.Y][this.pos.X] = "X";
        this.pos.X += 1;
        blockELE.style.left = (this.pos.X * 70).toString() + "px";
      } else if (this.blockType == "P") {
        console.log("hi");
        boardArray[this.pos.Y][this.pos.X + 2] = "P";
        boardArray[this.pos.Y][this.pos.X] = "X";
        this.pos.X += 1;
        blockELE.style.left = (this.pos.X * 70).toString() + "px";
      }
    } else if (type == "up") {
      if (this.blockType == "VS") {
        boardArray[this.pos.Y - 1][this.pos.X] = "VS";
        boardArray[this.pos.Y + 1][this.pos.X] = "X";
        this.pos.Y -= 1;
        blockELE.style.top = (this.pos.Y * 70).toString() + "px";
      } else if (this.blockType == "VL") {
        boardArray[this.pos.Y - 1][this.pos.X] = "VL";
        boardArray[this.pos.Y + 2][this.pos.X] = "X";
        this.pos.Y -= 1;
        blockELE.style.top = (this.pos.Y * 70).toString() + "px";
      }
    } else if (type == "down") {
      if (this.blockType == "VS") {
        boardArray[this.pos.Y + 2][this.pos.X] = "VS";
        boardArray[this.pos.Y][this.pos.X] = "X";
        this.pos.Y += 1;
        blockELE.style.top = (this.pos.Y * 70).toString() + "px";
      } else if (this.blockType == "VL") {
        boardArray[this.pos.Y + 3][this.pos.X] = "VL";
        boardArray[this.pos.Y][this.pos.X] = "X";
        this.pos.Y += 1;
        blockELE.style.top = (this.pos.Y * 70).toString() + "px";
      }
    }
  };
  this.Move = function (type, distance, blockELE) {
    this.stepsToMove(type, distance, blockELE);
  };
  this.placeArray = function () {
    if (this.blockType == "HS") {
      boardArray[this.pos.Y][this.pos.X] = "HS";
      boardArray[this.pos.Y][this.pos.X + 1] = "HS";
    } else if (this.blockType == "HL") {
      boardArray[this.pos.Y][this.pos.X] = "HL";
      boardArray[this.pos.Y][this.pos.X + 1] = "HL";
      boardArray[this.pos.Y][this.pos.X + 2] = "HL";
    } else if (this.blockType == "VS") {
      boardArray[this.pos.Y][this.pos.X] = "VS";
      boardArray[this.pos.Y + 1][this.pos.X] = "VS";
    } else if (this.blockType == "VL") {
      boardArray[this.pos.Y][this.pos.X] = "VL";
      boardArray[this.pos.Y + 1][this.pos.X] = "VL";
      boardArray[this.pos.Y + 2][this.pos.X] = "VL";
    } else if (this.blockType == "P") {
      boardArray[this.pos.Y][this.pos.X] = "P";
      boardArray[this.pos.Y][this.pos.X + 1] = "P";
    } else {
    }
  };
  this.checkCollision = function (type) {
    if (type == "left") {
      if (this.blockType == "HS") {
        if (
          !(this.pos.X - 1 < 0) &&
          boardArray[this.pos.Y][this.pos.X - 1] == "X"
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.blockType == "HL") {
        if (
          !(this.pos.X - 1 < 0) &&
          boardArray[this.pos.Y][this.pos.X - 1] == "X"
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.blockType == "P") {
        if (
          !(this.pos.X - 1 < 0) &&
          boardArray[this.pos.Y][this.pos.X - 1] == "X"
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else if (type == "right") {
      if (this.blockType == "HS") {
        if (
          !(this.pos.X + 2 > sizeX) &&
          boardArray[this.pos.Y][this.pos.X + 2] == "X"
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.blockType == "HL") {
        if (
          !(this.pos.X + 3 > sizeX) &&
          boardArray[this.pos.Y][this.pos.X + 3] == "X"
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.blockType == "P") {
        if (
          !(this.pos.X + 2 > playerX) &&
          boardArray[this.pos.Y][this.pos.X + 2] == "X"
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else if (type == "up") {
      if (this.blockType == "VS") {
        if (
          !(this.pos.Y - 1 < 0) &&
          boardArray[this.pos.Y - 1][this.pos.X] == "X"
        ) {
          console.log('up true')
          return true;
        } else {
          console.log('up false')
          return false;
        }
      } else if (this.blockType == "VL") {
        if (
          !(this.pos.Y - 1 < 0) &&
          boardArray[this.pos.Y - 1][this.pos.X] == "X"
        ) {
          console.log('up true')
          return true;
        } else {
          console.log('up false')
          return false;
        }
      }
    } else if (type == "down") {
      if (this.blockType == "VS") {
        if (
          !(this.pos.Y + 2 > sizeY) &&
          boardArray[this.pos.Y + 2][this.pos.X] == "X"
        ) {
          console.log('down true')
          return true;
        } else {
          console.log('down false')
          return false;
        }
      } else if (this.blockType == "VL") {
        if (
          !(this.pos.Y + 3 > sizeY) &&
          boardArray[this.pos.Y + 3][this.pos.X] == "X"
        ) {
          console.log('down true')
          return true;
        } else {
          console.log('down false')
          return false;
        }
      }
    } else {
      return false;
    }
  };
  this.pos = { X: null, Y: null };
}

// [
//     ['X', 'X', 'X', 'X', 'X', 'X'],
//     ['X', 'X', 'X', 'X', 'X', 'X'],
//     ['X', 'X', 'X', 'X', 'X', 'X'],
//     ['X', 'X', 'X', 'X', 'X', 'X'],
//     ['X', 'X', 'X', 'X', 'X', 'X'],
//     ['X', 'X', 'X', 'X', 'X', 'X'],
// ];
