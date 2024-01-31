let boxes = document.querySelectorAll(".box");
const reset = document.getElementById("reset");
let message = document.querySelector(".message");

let winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

let turnO = true;
let playing = true;
let filledBox = 0;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (playing) {
      if (turnO) {
        box.innerText = "O";
        box.style.color = "yellow";
        turnO = false;
      } else {
        box.innerText = "X";
        box.style.color = "orange";

        turnO = true;
      }
      box.disabled = true;
      filledBox++;
      let isWinner = checkWinner();

      if (filledBox === 9 && !isWinner) {
        message.innerText = `Draw`;
        message.classList.remove("hide");
        playing = false;
      }
    }
  });
});

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    // console.log(pattern);

    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val == pos2val && pos2val == pos3val) {
        // console.log(`winner is ${pos1val}`);
        message.innerText = `winner is ${pos1val}`;
        message.classList.remove("hide");
        playing = false;
        return true;
      }
    }
  }
};

reset.addEventListener("click", () => {
  for (let box of boxes) {
    box.innerText = "";
    box.disabled = false;
  }
  message.classList.add("hide");
  playing = true;
  turnO = true;
  filledBox = 0;
});
