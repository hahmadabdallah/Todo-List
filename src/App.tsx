import React,{ChangeEvent, FC,useState} from 'react';
import './App.css';
import TodoTask from './components/TodoTask';
import { ITask } from './Interfaces';

const App:FC =() =>{
  const [task,setTask]=useState<string>("");
  const [deadline,setDeadline]=useState<number>(0);
  const [todoList,setTodoList]=useState<ITask[ ]>([]);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) : void =>{
    if(event.target.name ==='task') {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  }
  const addTask = () : void =>{
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList,newTask]);
    setTask("");
    setDeadline(0);
  }
  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };
   return (
    <React.Fragment>
      <div className="app">
        <div className="header">
          <h1>Todo List</h1>
        </div>
        <div className="todlist">
           <div className="container">
               <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                    <label>New Task</label>
                      <input 
                        type="text"
                        className="form-control"
                        placeholder="New Task..."
                        name="task"
                        value={task}
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Deadline</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Deadline" 
                        name="deadline"
                        value={deadline}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <button className="block" onClick={addTask} >Add Task</button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {
                      todoList.map((task:ITask,key:number) =>{
                        return <TodoTask key={key} task={task} completeTask={completeTask} />;
                      })
                    }
                  </div>
               </div>            
           </div>
        </div>
      </div>
    
    </React.Fragment>
  );
}

export default App;
