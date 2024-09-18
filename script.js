// 選取DOM元素
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// 新增待辦事項
// 當使用者點擊 "新增" 按鈕時觸發這個事件。addEventListener 是一個用來監聽事件的函數。
addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value;

  if (taskText === "") return; // 如果使用者沒有輸入任何文字，就不新增待辦事項

  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "刪除";
  deleteButton.onclick = function () {
    taskList.removeChild(li);
  };

  li.appendChild(deleteButton);
  taskList.appendChild(li);

  taskInput.value = ""; // 清空輸入框
});

// 載入本地儲存的待辦事項
// 這段程式碼負責在頁面載入時從 localStorage 中恢復已保存的待辦事項
// 當網頁載入時觸發這個事件
window.onload = function () {
  const storedTasks =
    JSON.parse(localStorage.getItem("tasks")) ||
    storedTasks.forEach((task) => addTaskButton(task));
};

// 新增待辦事項並儲存至localStorage
function addTask(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "刪除";
  deleteButton.onclick = function () {
    taskList.removeChild(li);
    saveTasks();
  };

  li.appendChild(deleteButton);
  taskList.appendChild(li);
  saveTasks();
}

// 儲存待辦事項至localStorage
function saveTasks() {
  const tasks = Array.from(taskList.children).map(
    (li) => li.firstChild.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 事件監聽器:新增待辦事項
addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value;
  if (taskText === "") return;
  addTask(taskText);
  taskInput.value = "";
});
