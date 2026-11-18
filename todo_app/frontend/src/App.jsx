import { useState } from "react";
import "./app.css";
import { useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoContent, setNewTodoContent] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/todos");
      const fetchedTodos = await res.json();
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  const handleSend = async (event) => {
    event.preventDefault();
    const newTodo = { content: newTodoContent };
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();
    const updatedTodos = todos.concat(data);
    setTodos(updatedTodos);
    setNewTodoContent("");
  };

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
      <form onSubmit={handleSend}>
        <input
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
          placeholder="Enter a new todo (max 140 characters)"
          maxLength={140}
          required
        />
        <button type="submit">Send</button>
      </form>
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
