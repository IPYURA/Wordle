let answer;
let trial = 1;

const correctAnswer = () => {
  document.querySelector(".successModal").classList.add("active");
  document.querySelector(
    ".successModal .answer"
  ).innerHTML = `정답은 "${answer}" 입니다.`;
  answer = "";
};
const failAnswer = () => {
  document.querySelector(".failModal").classList.add("active");
  document.querySelector(
    ".failModal .answer"
  ).innerHTML = `정답은 "${answer}" 입니다.`;
};

const onChangeInput = () => {
  const inputs = document.querySelectorAll(`.try${trial} > .input`);
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (index < 4) input.nextElementSibling.focus();
    });
  });
};

const focusNextRow = () => {
  if (!submitLimitCheck() || trial === 5) {
    document.querySelectorAll(`.try${trial} > .input`)[0].focus();
  }
  onChangeInput();
};

const submitLimitCheck = () => {
  let setLimit = false;
  trial >= 5 ? (setLimit = true) : (setLimit = false);
  return setLimit;
};

const checkWithColor = () => {
  const inputs = document.querySelectorAll(`.try${trial} > .input`);
  let corrects = 0;
  inputs.forEach((input, index) => {
    if (input.value === answer[index]) {
      input.style.background = "#43c066";
      corrects++;
    } else if (answer.includes(input.value)) {
      input.style.background = "#ffde4d";
    } else {
      input.style.background = "lightgray";
    }
  });
  if (corrects === 5) {
    correctAnswer();
    trial = 5;
  }
};

const addInputSection = () => {
  trial++;
  let template = `<section class=try${trial}>
        <input class="input" type="text" maxlength="1">
        <input class="input" type="text" maxlength="1">
        <input class="input" type="text" maxlength="1">
        <input class="input" type="text" maxlength="1">
        <input class="input" type="text" maxlength="1">
    </section>`;
  document.querySelector(".wrap").insertAdjacentHTML("beforeend", template);
};

const inputValidCheck = () => {
  let valid = true;
  const inputs = document.querySelectorAll(`.try${trial} > .input`);
  inputs.forEach((input) => {
    if (input.value === "") valid = false;
  });
  return valid;
};

const answerCheck = () => {
  const inputValid = inputValidCheck();
  const submitLimit = submitLimitCheck();

  if (inputValid) {
    checkWithColor();
    !submitLimit ? addInputSection() : failAnswer();
  } else {
    answer !== "" ? alert("모든 칸을 입력하세요") : location.reload();
  }
};

const onClickButton = () => {
  let button = document.querySelector("button");
  button.addEventListener("click", () => {
    answerCheck();
    focusNextRow();
  });
};

const onKeyDownEnter = () => {
  document.body.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      answerCheck();
      focusNextRow();
    }
  });
};

const closeModal = () => {
  const closeBtns = document.querySelectorAll(".closeBtn");
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
      let name = e.target.parentNode.parentNode;
      name.classList.remove("active");
      location.reload();
    });
  });
};

onChangeInput();
onClickButton();
onKeyDownEnter();
closeModal();

window.addEventListener("load", () => {
  const answerList = [
    "value",
    "color",
    "class",
    "input",
    "width",
    "index",
    "defer",
    "const",
    "style",
    "scale",
    "modal",
  ];
  let randomNum = Math.floor(Math.random() * 10);
  answer = answerList[randomNum];
});
