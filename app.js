 const form=document.getElementById("form")
 const input=document.getElementById("input")
 const todosUl=document.getElementById("todos")

 const todos=JSON.parse(localStorage.getItem('todos'))

 if(todos){
    todos.forEach(todo => addTodo(todo))
 }

 form.addEventListener("submit", (e)=>{
     e.preventDefault();
     addTodo();
 })


 function addTodo(todo){
     let todoText= input.value
    // console.log(todoText)
     if(todo){
         todoText=todo.text;
     }
     if(todoText){
         const todoEl=document.createElement("li")
         if(todo && todo.completed){
             todoEl.classList.add('completed')
         }
         todoEl.innerHTML=todoText;

         todoEl.addEventListener('click', () =>{
             todoEl.classList.toggle("completed")
             updateLS();
         })


         todoEl.addEventListener('contextmenu', (e) =>{
             e.preventDefault();
             todoEl.remove();
             updateLS();
         })


         todosUl.appendChild(todoEl);
         input.value='';
         updateLS();

     }
 }

function updateLS(){
    const todosEl = document.querySelectorAll("li");

    const todos = []
    todosEl.forEach(todo =>{
        todos.push({ // pushing an object --eg: this is for number - todos.push(23), this is for string {text:Todo1, completed:true} or {text:Todo2, completed:false}
            text:todo.innerText,
            completed:todo.classList.contains('completed')
        })
    })

    localStorage.setItem('todos',JSON.stringify(todos))
    //JSON.stringify(object) --  converting object into string
    //JSON.parse(text) -- converting object into string, string into object
}