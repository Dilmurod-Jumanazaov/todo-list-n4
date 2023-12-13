// const elForm = document.querySelector(".js-form");
// const elTodoInput = document.querySelector(".js-todo-input");
// const elList = document.querySelector(".hero__list");
// const elSoundBtn = document.querySelector(".hero__sound-btn");
// const elAllBtnNumber = document.querySelector(".js-all-btn-number");
// const elDeletedBtnNumber = document.querySelector(".js-deleted-btn-number");
// const elCompletedBtnNumber = document.querySelector(".js-completed-btn-number");
// const elUncompletedBtnNumber = document.querySelector(".js-uncompleted-btn-number");
// const todoArr = [];
// let newTodoObj = {};

// function renderTodos(array,node) {
//   node.innerHTML = "";

//   elAllBtnNumber.textContent = todoArr.length;
//   elCompletedBtnNumber.textContent = todoArr.filter((item) => item.checked).length;
//   elUncompletedBtnNumber.textContent = todoArr.filter((item) => !item.checked).length;


//   for (let i = 0; i < array.length; i++) {
//     const liElement = document.createElement("li");
//     const textWrapper = document.createElement("div");
//     const textEelement = document.createElement("p");
//     const checkedInput = document.createElement("input");
//     const btnWrapper = document.createElement("div");
//     const editBTn = document.createElement("button");
//     const deleteBtn = document.createElement("button");

//     liElement.classList.add("list-item");
//     textWrapper.classList.add("item-textwrapper");
//     textEelement.classList.add("list__item-text");
//     checkedInput.classList.add("list__item-check-input");
//     btnWrapper.classList.add("item-btn-wrapper");
//     editBTn.classList.add("item-edit-btn");
//     deleteBtn.classList.add("item-delete-btn");

//     textEelement.textContent = array[i].text;
//     checkedInput.setAttribute("type", "checkbox");
//     checkedInput.checked = array[i].checked;
//     editBTn.textContent = "Edit";
//     editBTn.type = "button";
//     editBTn.dataset.id = 
//     deleteBtn.textContent = "Delete";
//     deleteBtn.type = "button";

//     btnWrapper.append(editBTn,deleteBtn);
//     textWrapper.append(checkedInput,textEelement);
//     liElement.append(textWrapper,btnWrapper);
//     node.appendChild(liElement);
//   }
// }
// renderTodos(todoArr,elList);

// const userRecording = new webkitSpeechRecognition();

// const onStart = () => {
//   userRecording.start(1, 2, 10);
// };

// userRecording.onresult = (evt) => {
//   let voiceResult = evt.results[0][0].transcript;
//   elTodoInput.value = voiceResult;
// };

// elSoundBtn.addEventListener("click", (evt) => {
//   elSoundBtnText.style.display = "block";
//   elSoundBtn.classList.toggle("active-sound");
//   onStart();
// });

// elForm.addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   elList.style.display = "block";

//   newTodoObj = {
//     id: todoArr.length + 1,
//     text: elTodoInput.value,
//     checked: false,
//   };
//   todoArr.push(newTodoObj);
//   elTodoInput.value = "";
//   elAllBtnNumber.textContent = todoArr.length;
//   elUncompletedBtnNumber.textContent = todoArr.length;

//   // window.localStorage.setItem(JSON.stringify())

//   renderTodos(todoArr,elList);
// });
// elList.addEventListener("click", (evt) => {
//   if(evt.target.matches(".item-delete-btn")) {
//    console.log();
//   }
// })

const elForm = document.querySelector(".js-form");
const elFormInput = document.querySelector(".js-todo-input");
const elList = document.querySelector(".js-hero-list");
const elAllBtnCount = document.querySelector(".js-all-btn-number");
const elCompletedBtnNumber = document.querySelector(".js-completed-btn-number");
const elUncompletedBtnNumber = document.querySelector(".js-uncompleted-btn-number");
const elBtnWrapper = document.querySelector(".js-hero-btn-wrapper");
const elSoundBtn = document.querySelector(".js-hero-sound-btn");
const elSoundBtnText = document.querySelector(".hero__sound-btn-text");
const todoArr = [];

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elList.style.display = "block";
  
  let inputValue = elFormInput.value.trim();
  elFormInput.value = "";
  
  let newTodoObj = {
    id: todoArr.length ? todoArr.at(-1).id + 1 : 1,
    text: inputValue,
    isCompleted: false,
  };
  todoArr.push(newTodoObj);
  
  renderTodos(todoArr,elList);
});

function renderTodos(array,node) {
  node.innerHTML = "";
  
  elAllBtnCount.textContent = todoArr.length;
  elUncompletedBtnNumber.textContent = todoArr.filter((item) => !item.isCompleted).length;
  elCompletedBtnNumber.textContent = todoArr.filter((item) => item.isCompleted).length;
  
  array.forEach(element => {
    const liElement = document.createElement("li");
    const todoTextWrapper = document.createElement("div");
    const checkInput = document.createElement("input");
    const todoText = document.createElement("p");
    const btnWrapper = document.createElement("div");
    const editBTn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    
    liElement.classList.add("list-item");
    todoTextWrapper.classList.add("todo-text-wrapper");
    checkInput.classList.add("item-check-input");
    todoText.classList.add("list__item-text");
    btnWrapper.classList.add("item-btn-wrapper");
    editBTn.classList.add("item-edit-btn");
    deleteBtn.classList.add("item-delete-btn");
    
    todoText.textContent = element.text;
    checkInput.type = "checkbox";
    checkInput.name = "user_select";
    checkInput.dataset.id = element.id;
    editBTn.textContent = "Edit";
    editBTn.type = "button";
    editBTn.dataset.id = element.id;
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";
    deleteBtn.dataset.id = element.id;
    
    todoTextWrapper.append(checkInput,todoText);
    btnWrapper.append(editBTn,deleteBtn);
    liElement.append(todoTextWrapper,btnWrapper);
    node.appendChild(liElement);
    
    if(element.isCompleted) {
      checkInput.checked = true;
      todoText.classList.add("item-check-input");
    }
  });
};

elList.addEventListener("click", (evt) => {
  // delete function 
  if(evt.target.matches(".item-delete-btn")) {
    let deleteBtnId = evt.target.dataset.id;
    let deletedTodoIndex = todoArr.findIndex((item) => {
      return item.id == deleteBtnId;
    });
    todoArr.splice(deletedTodoIndex,1);
    renderTodos(todoArr,elList);
  }
  // edit function 
  if(evt.target.matches(".item-edit-btn")) {
    let editBtnId = evt.target.dataset.id;
    let newText = prompt("Matnni kiriting");
    editedTodo = todoArr.find((item) => item.id == editBtnId);
    editedTodo.text = newText;
    
    renderTodos(todoArr,elList);
  };
  // check input function
  if(evt.target.matches(".item-check-input")) {
    let checkInputId = evt.target.dataset.id;
    let findedCheckInput = todoArr.find((item) => item.id == checkInputId);
    findedCheckInput.isCompleted = !findedCheckInput.isCompleted;
    renderTodos(todoArr,elList); 
  }
});

elBtnWrapper.addEventListener("click", (evt) => {
  if(evt.target.matches(".js-hero-all-btn")) {
    renderTodos(todoArr,elList);
  }
  if(evt.target.matches(".js-hero-completed-btn")) {
    const completedArr = todoArr.filter((item) => item.isCompleted);
    renderTodos(completedArr,elList);
  }
  if(evt.target.matches(".js-hero-uncompleted-btn")) {
    const uncompletedArr = todoArr.filter((item) => !item.isCompleted);
    renderTodos(uncompletedArr,elList);
  }
});

const voiceRecordingBtn = new webkitSpeechRecognition();

function startRecording() {
  voiceRecordingBtn.start();
}
voiceRecordingBtn.onresult = (evt) => {
  let userVoiceResult = evt.results[0][0].transcript;
  elFormInput.value = userVoiceResult;
};
elSoundBtn.addEventListener("click", (evt) => {
  elSoundBtnText.style.display = "block";
  elSoundBtn.classList.toggle("active-sound");
  startRecording();
});