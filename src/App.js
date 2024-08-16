import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [toDos, setToDOs] = useState([]);

  useEffect(() => {
    const oldToDos = localStorage.getItem('todos');
    if (oldToDos) {
      setToDOs(JSON.parse(oldToDos));
    }
  }, []);

  const handleAdd = () => {
    setDescription('');
    setDueDate('');
    setTask('');
    const newToDo = { text: task, description, dueDate, status: false, id: Date.now() };
    setToDOs(prevToDos => {
      const updatedToDos = [...prevToDos, newToDo];
      localStorage.setItem('todos', JSON.stringify(updatedToDos));
      return updatedToDos;
    });
  };

  const handleDelete = (value) => {
    const updatedToDos = toDos.filter((obj) => (obj.id !== value.id));
    setToDOs(prevToDos => {
      localStorage.setItem('todos', JSON.stringify(updatedToDos));
      return updatedToDos;
    });
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const day = days[today.getDay()];

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <h2>Whoop, it's {day} 🌝 ☕</h2>
      </div>
      <div className="input">
        <input
          className="task"
          type="text"
          value={task}
          onChange={(e) => { setTask(e.target.value) }}
          placeholder="🖊️ Task..."
        />
        <input
          className="description"
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
          type="text"
          placeholder="Enter a Description"
        />
        <div className="dueDate">
          <p>Due Date:</p>
          <input
            type="date"
            id="myDate"
            min={new Date().toISOString().slice(0, 10)}
            value={dueDate}
            onChange={(e) => { setDueDate(e.target.value) }}
          />
          <i onClick={handleAdd} className="fas fa-plus"></i>
        </div>
      </div>

      <div className="todos-container">
        <div className="todos">
          <h3>Tasks</h3>
          {toDos.filter(obj => !obj.status).map(value => (
            <div className="todo" key={value.id}>
              <div className="left">
                <input
                  onChange={(e) => {
                    const updatedToDos = toDos.map((obj) => {
                      if (obj.id === value.id) {
                        obj.status = e.target.checked;
                      }
                      return obj;
                    });
                    setToDOs(updatedToDos);
                    localStorage.setItem('todos', JSON.stringify(updatedToDos));
                  }}
                  type="checkbox"
                  checked={value.status}
                />
                <div className="toDoDetails">
                  <p><span>Task:</span> {value.text}</p>
                  <p><span>Description:</span> {value.description}</p>
                  <p><span>Due Date:</span> {value.dueDate}</p>
                </div>
              </div>
              <div className="right">
                <i className="fas fa-times" onClick={() => handleDelete(value)}></i>
              </div>
            </div>
          ))}
        </div>

        <div className="completed-todos">
          <h3>Completed Tasks</h3>
          {toDos.filter(obj => obj.status).map(value => (
            <div className="todo completed" key={value.id}>
              <div className="toDoDetails">
                <p><span>Task:</span> {value.text}</p>
                <p><span>Description:</span> {value.description}</p>
                <p><span>Due Date:</span> {value.dueDate}</p>
              </div>
              <div className="right">
                <i className="fas fa-times" onClick={() => handleDelete(value)}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
