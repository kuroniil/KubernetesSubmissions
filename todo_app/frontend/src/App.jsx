import { useState } from "react";
import "./app.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 0, content: "Learn Kubernetes basics" },
    { id: 1, content: "Deploy an application to cluster" },
    { id: 2, content: "Configure persistent volumes" },
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Todo app</h1>
      <img
        style={{
          maxHeight: "400px",
          maxWidth: "400px",
          padding: "10px",
          borderRadius: "5%",
        }}
        src="/files/image.jpg"
      />
      <div>
        <input
          placeholder="Enter a new todo (max 140 characters)"
          maxLength={140}
        />
        <button>Send</button>
      </div>
      <h2>Todos</h2>
      <div>
        {todos.map((todo) => (
          <div className="todo">{todo.content}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
