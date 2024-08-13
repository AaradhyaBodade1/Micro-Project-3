const userInput = document.querySelector(".user-input");
const resetbtn = document.querySelector(".reset-btn");
const ansbtn = document.querySelector(".ans-btn");
const delbtn = document.querySelector(".del-btn");
const btn = document.querySelectorAll(".btn");

const keysArray = Array.from(btn);

let lastKeyIsOperator = false;
let decimalAdded = false;

const keyClickHander = (event) => {
  const value = event.target.innerText;

  if (value === "." && decimalAdded) {
    return;
  }

  if ("+-x/".includes(value)) {
    if (lastKeyIsOperator) {
      const initialValue = userInput.value;
      const updatedValue = initialValue.substring(0, initialValue.length - 1) + value;
      userInput.value = updatedValue;
      return;
    }

    lastKeyIsOperator = true;
    decimalAdded = false;
  } else {
    lastKeyIsOperator = false;

    if (value === ".") {
      decimalAdded = true;
    }
  }

  userInput.value += value;
  userInput.scrollLeft = userInput.scrollWidth;
};

const resetHandler = () => {
  userInput.value = "";
  lastKeyIsOperator = false;
  decimalAdded = false;
};

const deleteHandler = () => {
  const initialValue = userInput.value;
  const updatedValue = initialValue.substring(0, initialValue.length - 1);
  userInput.value = updatedValue;
};

const expressionHandler = (expression) => {
  const formattedExpression = expression.replace(/x/g, "*");
  const result = eval(formattedExpression);
  return result;
};

const answerHandler = () => {
  const expression = userInput.value;
  const result = expressionHandler(expression);
  userInput.value = result;
};

keysArray.forEach((btn) => btn.addEventListener("click", keyClickHander));
resetbtn.addEventListener("click", resetHandler);
delbtn.addEventListener("click", deleteHandler);
ansbtn.addEventListener("click", answerHandler);
