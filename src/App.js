import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setIsCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setIsCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);

    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setIsCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setIsCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>To - Do LIST</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="what's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Discription</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="what's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              value={newDescription}
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              isCompleteScreen === false ? "active" : ""
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${
              isCompleteScreen === true ? "active" : ""
            }`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {/*first screen */}
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete?"
                    />
                    <AiOutlineCheck
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                      title="Complete?"
                    />
                  </div>
                </div>
              );
            })}
          {/*first screen */}

          {/*completed screen */}
          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on : {item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
          {/*completed screen */}
        </div>
      </div>
    </div>
  );
}

export default App;
