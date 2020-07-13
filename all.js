let input = document.querySelector("#newTodo");
let btn = document.querySelector("#addTodo");
let todoList = document.querySelector("#todoList");
let clearTask = document.querySelector("#clearTask");

// 資料
let todoData = [];

// render 渲染
function render() {
    let string = "";
    todoData.forEach(function (item,key) {
        string = string + ` <li class="list-group-item d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <input type="checkbox" class="mr-3">
                <p class="mb-0">${item.text}</p>
            </div>
            <button type="botton" class="btn btn-warning removeBtn" data-id="${key}">刪除</button>
        </li>
        `});
        todoList.innerHTML = string; // 將 todoList 這個 ul 插入 li 資料

        let remove = document.querySelectorAll(".removeBtn"); // All 因為 <li> 有很多個
        remove.forEach(function(item) {
            item.addEventListener('click',removeTodo);
        });
        taskCount.textContent = todoData.length; // 還有 XX 筆任務
}

// 新增資料 updateTodo
function updateTodo() {
    let text = input.value.trim(); // trim 可以刪除前後空白
    if(text !== "") { // 如果 input 中的 value 不是空白就可以執行
        todoData.push({text: text}); // 在 todoData 中增加 text
    }
    input.value = ""; // 清除 input value
    render();
}
btn.addEventListener('click',updateTodo); // 按 btn 新增按鈕後就會執行 updateTodo()

// 刪除資料 removeTodo
function removeTodo(e) {
    todoData.splice(e.target.dataset.id,1); 
    console.log(e.target.dataset.id);
    render();
}

// 刪除全部資料 removeAllTodo
function removeAllTodo(e) {
    e.preventDefault(); // 刪除預設
    todoData = []; // 清空 todoData
    render();
}
clearTask.addEventListener('click',removeAllTodo);

// 按 Enter 新增 todo
function enterKey(e) {
    if(e.keyCode === 13) { // enter 的 keycode 是 13
        updateTodo();
    }
}
input.addEventListener('keypress',enterKey);