
import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [task, setTask] = useState('')
  const [description,setDescription]=useState('')
  const [dueDate,setDueDate]=useState('')
  const [toDos, setToDOs] = useState([])
  useEffect(() => {
    const oldToDos = localStorage.getItem('todos');
    console.log(oldToDos)
    if (oldToDos) {
      setToDOs(JSON.parse(oldToDos));
      console.log((toDos))
    }
    console.log((toDos))
  }, []); 

 
  const handleAdd = () => {
    const newToDo = { text: task, description, dueDate, status: false, id: Date.now() };
  
    setToDOs(prevToDos => {
      const updatedToDos = [...prevToDos, newToDo];
  

      localStorage.setItem('todos', JSON.stringify(updatedToDos));
  
      return updatedToDos;
    });
  };

  const handleDelete=(value)=>{
    const updatedToDos=toDos.filter((obj) => (obj.id !== value.id))
    setToDOs(prevToDos=>{
      localStorage.setItem('todos', JSON.stringify(updatedToDos));
      return updatedToDos;
    })
  }
  

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const day = days[today.getDay()]; // Get day index (0-6) and use it to access the day name

 
  return (
    <div className="app">
    
     
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝 ☕ </h2>
      </div>
    
      <div className="input" >
        
        <input className='task' type="text" value={task} onChange={(e) => { setTask(e.target.value) }} placeholder="🖊️ Task..." /> 
        <input className='description' value={description} onChange={(e) => { setDescription(e.target.value) }} type="text"  placeholder="Enter a Description" /> 
       <div className='dueDate'>
       <p>Due Date:  </p>
       <input type='date' id='myDate' min={new Date().toISOString().slice(0, 10)} value={dueDate} onChange={(e) => { setDueDate(e.target.value) }}  />
        <i onClick={handleAdd} className="fas fa-plus"></i>
      
       </div>
     </div>
      <div className="todos">
        {toDos.map(value => {
          // console.log(value)
          return (
            <div className="todo">
              <div className="left">
                <input onChange={(e) => {
                  var ticked = toDos.filter((obj) => {
                    if (obj.id === value.id) {
                      obj.status = e.target.checked
                    }
                    return obj
                  }
                  )
                  // console.log(ticked)
                  setToDOs(ticked)
                }} type="checkbox" name="" id="" />
                <div className='toDoDetails'>
                <p><span>Task:</span>{value.text}</p>
                <p><span>Description:</span>{value.description}</p>
                <p><span>Due Date:</span>{value.dueDate}</p>
                </div>
               
              </div>
              <div className="right">
                <i className="fas fa-times"   onClick={()=>handleDelete(value)}></i>
              </div>
            </div>
          )
        })}

        {toDos.map((obj) => {
          if (obj.status === true) {
            return (<p>{obj.text}</p>)
          }
          else {
            return (<p></p>)
          }
        })}


      </div>
    </div>
  );
}


export default App;


