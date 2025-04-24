const tasks=["Wake up","Eat","Think","Sleep"];
const completedTasks = new Array(tasks.length).fill(false); // Array to track completed tasks


//addition
function addTasktoJsArray (taskName){
    tasks.push(taskName);
    completedTasks.push(false); // New task is initially not completed
    console.log(tasks);
    renderTaskList();
}


//deletion
function deleteTaskfromJsArray(taskIndex){
    tasks.splice(taskIndex,1);
    completedTasks.splice(taskIndex, 1); // Remove completion status as well
    console.log(tasks);
    renderTaskList();
    
}

//update
function updateTaskofJsArray(taskIndex,newTaskName){
tasks[taskIndex]=newTaskName;
console.log(tasks);
 renderTaskList();
}


// Capturing input and elements

//The script retrieves references to key HTML elements
const taskInputElement = document.getElementById("task-input");
const addTaskButton = document.getElementById("task-add-button");
const taskListElement = document.getElementById("task-list");

//click -> event trigger
addTaskButton.addEventListener("click",function(){
   // console.log(taskInputElement,addTaskButton)
   const taskName = taskInputElement.value;
   console.log(taskName);    
if (taskName.trim() !== "") { // Prevent adding empty tasks
   addTasktoJsArray(taskName);
      taskInputElement.value = ""; // Clear input after adding
    }
});



function renderTaskList(){
    taskListElement.replaceChildren(); //replace just removes everything from existing list before being added again by smth else

    for(let i=0;i<tasks.length;i++){
        const taskName=tasks[i]; //working w this task now

        const taskListItemElement=document.createElement("li");//this is used later to actually replace after replacechildren() clears 
        const taskItemDeleteButton=document.createElement("button");
        const taskItemUpdateButton=document.createElement("button");
        const taskItemCompleteButton=document.createElement("button");

        taskListItemElement.textContent=taskName;
        taskItemDeleteButton.textContent="Delete";
        taskItemDeleteButton.style.backgroundColor="pink";
        taskItemUpdateButton.textContent="Update";
        taskItemCompleteButton.style.backgroundColor="darkgreen";
        taskItemUpdateButton.style.backgroundColor="beige";
       
        taskItemCompleteButton.style.color="white";
        taskItemCompleteButton.textContent="Complete";

            // Restore completion status if task was previously marked as completed
            if (completedTasks[i]) {
                taskListItemElement.style.color = "grey";
                taskItemDeleteButton.disabled = true;
                taskItemUpdateButton.disabled = true;
                taskItemCompleteButton.disabled = true;
            }
    

        //delete functionality
        taskItemDeleteButton.addEventListener("click",function(){
            deleteTaskfromJsArray(i);
            alert("One task will be deleted");
        })
        
        //update functionality
        taskItemUpdateButton.addEventListener("click",function(){

              // Check if an update input already exists
              if (document.getElementById("update-input")) return;

              //creting new input field
              const updateInput=document.createElement("input");
              updateInput.type="text";
              updateInput.placeholder="Enter task title";
              updateInput.id="update-input";
             //updateInput.value = taskName; // Pre-fill with current value

              //creating update confirmation button
              const updateConfirmButton=document.createElement("button");
              updateConfirmButton.id="update-button";
              updateConfirmButton.textContent="Update Task";

              updateConfirmButton.addEventListener("click",function(){
                const newTaskName = updateInput.value.trim();
                if (newTaskName !== "") { // Prevent adding empty tasks
                    updateTaskofJsArray(i,newTaskName);
                    taskInputElement.value = ""; // Clear input after adding
                    updateConfirmButton.remove();
                    updateInput.remove();
                    }

              });
              taskListElement.appendChild(updateInput);
            taskListElement.appendChild(updateConfirmButton);
            updateInput.focus();//for taking the cursor to input directly after clicking update
        });

        //complete functionality
        taskItemCompleteButton.addEventListener("click",function(){
            taskListItemElement.style.color="grey";
            taskItemDeleteButton.disabled="true";
            taskItemUpdateButton.disabled="true";
            taskItemCompleteButton.disabled="true"; 
            completedTasks[i] = true;
        })
        //we could also do
       // taskItemCompleteButton.addEventListener("click", function () {
         //   completedTasks[i] = true; // Mark as completed
         //   renderTaskList(); // Re-render the list to apply styles
       // });



        //console.log(taskListItemElement)
        //console.log(i,"---",taskName)
        taskListElement.appendChild(taskListItemElement);
        taskListItemElement.appendChild(taskItemDeleteButton);
        taskListItemElement.appendChild(taskItemUpdateButton);
        taskListItemElement.appendChild(taskItemCompleteButton);
        
       // taskListElement.appendChild(taskListItemElement);

    }
}
renderTaskList();

  //all the things we did
  //functions for how 3 buttons would work
  //loop thru tasks array
  //create 3 button elements
  //add event listener to listen to button clicks
  //inject list element into task list