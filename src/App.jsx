import { useState } from 'react'
import reactLogo from './assets/monkey-face.svg'
import './App.css'
import Item from './Item'
import customData  from './customData.json'
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  
  

  const [data, setData] = useState( {task:"", url:""}); //Deseo actual
  const [list, setList] = useState([customData]); //[{}]lista deseos
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("")

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
    setData({});
    setList([]); 
  }

  const resetTasks = () =>{
    setData({});
    setList([customData]); 
  }


  const deleteTask = (i) =>{
  const remainingTasks= list.filter((t,j)=> i!==j );
  setList(remainingTasks);
  }


 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
      if (e.target.value.length > 5) {
        setShow(true);
        setTimeout(() => {
          setData({ task: "", url: "" });
          setShow(false)  
        }, 5000)
       } else
        setShow(false)
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const url = e.target.url.value;
   
    const toDo = { task, url };

    const confirmated = confirm(
      `Do you want to add this task? task:${task} url:${url}`
    );

    if (confirmated) {
      setData({ toDo }); //genera deseo {}
      setList([...list, toDo]); // [{}, {}] lista deseos
      alert("Task registered");
      setData({ task, url });
      setList([...list, toDo]);
      e.target.task.value=""
      e.target.url.value=""
      setShow(false)
      setMessage(`${task} was assed to your list`)
      setTimeout(() => {
        setMessage("")
      }, 5000);
  
  
    }

    

  };


  return (
    <>
      <div>
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
      </form>
      <button onClick={clearTasks}> CLEAR </button>
      <button onClick={resetTasks}> RESET </button>
     
      <h1>To Do List</h1>
      {message && <div>{message}</div>}
      <section className="itemcontainer">{paintTasks()}</section>

    </>
  )
}


export default App
