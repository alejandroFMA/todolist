import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Item from './Item'

import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  
  const initialData = [{
    task: "Finish react exercise"

  }]

  const [data, setData] = useState({}); //Deseo actual
  const [list, setList] = useState(initialData); //[{}]lista deseos
  const [show, setShow] = useState(false);


  const paintTasks = () => {
   
    return list.map((t, i) => (
      <Item
        key={uuidv4()} 
    
        task={t.task}

        url={t.url}
     
        deleteTask={()=>deleteTask(i)}
      />
    )); 
  };

  const clearTasks = () =>{

    setList([]); 
  }

  const resetTasks = () =>{

    setList(initialData); 
  }


  const deleteTask = (i) =>{
  const remainingTasks= list.filter((t,j)=> i!==j );
  setList(remainingTasks);
  }


 
    const handleChange = (e) => {
      if (e.target.value.length > 5)
        setShow(true);
      else
        setShow(false)
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const url = e.target.url.value;
   
    const todo = { task, url };
    setData({ task, url });
    setList([...list, todo]);
    alert(`Task: ${task} registred`);
    e.target.task.value=""
    e.target.url.value=""
    setShow(false)
  };


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your new task:</label><br />
        <input type="text" name="task" 
        onChange = {handleChange}/><br />
        <label htmlFor="name">Image</label><br />
        <input type="url" name="url" 
        onChange = {handleChange}/><br />
        {show && <button> SEND </button>} 
        <button onClick={clearTasks}> CLEAR </button>
        <button onClick={resetTasks}> RESET </button>
      </form>
     
      <h1>To Do List</h1>
      <section className="itemcontainer">{paintTasks()}</section>

    </>
  )
}


export default App
