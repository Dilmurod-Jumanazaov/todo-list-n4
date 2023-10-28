const elForm = document.querySelector(".js-form");
const elTodoInput = document.querySelector(".js-todo-input");
const elList = document.querySelector(".hero__list");
const elSoundBtn = document.querySelector(".hero__sound-btn");
const elSoundBtnText = document.querySelector(".hero__sound-btn-text");
console.log(elSoundBtnText);
const todoArr = [];
let newTodoObj = {};

function renderTodos(array) {
  elList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const liElement = document.createElement("li");
    const textWrapper = document.createElement("div");
    const IDelement = document.createElement("span");
    const textEelement = document.createElement("p");
    const checkedInput = document.createElement("input");

    liElement.classList.add("list-item");
    textWrapper.classList.add("item-textwrapper");
    IDelement.classList.add("list__item-id");
    textEelement.classList.add("list__item-text");
    checkedInput.classList.add("list__item-check-input");

    IDelement.textContent = `ID: ${array[i].id}`;
    textEelement.textContent = array[i].text;
    checkedInput.setAttribute("type", "checkbox");
    checkedInput.checked = array[i].checked;

    textWrapper.append(IDelement, textEelement);
    liElement.append(textWrapper, checkedInput);
    elList.appendChild(liElement);
  }
}

const userRecording = new webkitSpeechRecognition();
console.log(userRecording);

const onStart = () => {
  userRecording.start(1, 2, 10);
};

userRecording.onresult = (evt) => {
  let voiceResult = evt.results[0][0].transcript;
  elTodoInput.value = voiceResult;
};

elSoundBtn.addEventListener("click", (evt) => {
  elSoundBtnText.style.display = "block";
  elSoundBtn.classList.toggle("active-sound");
  onStart();
});

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  elList.style.display = "block";

  newTodoObj = {
    id: todoArr.length + 1,
    text: elTodoInput.value,
    checked: false,
  };
  todoArr.push(newTodoObj);
  elTodoInput.value = "";

  // window.localStorage.setItem(JSON.stringify())

  renderTodos(todoArr);
});
