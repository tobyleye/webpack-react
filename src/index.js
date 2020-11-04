import * as React from "react";
import { render } from "react-dom";
import styles from "./style.module.css";
import TodoList from "./todoList";

function TodoApp() {
  const [todos, setTodos] = React.useState([]);
  const [nextTodo, setNextTodo] = React.useState("");

  const onSave = () => {
    if (!nextTodo) return;
    setTodos(todos.concat({ text: nextTodo, completed: false }));
    setNextTodo(""); // clear
  };

  const markAsComplete = (todoIndex) => {
    setTodos((todos) => {
      return todos.map((todo, idx) => {
        if (todoIndex === idx) {
          return { ...todo, completed: true };
        } else return todo;
      });
    });
  };

  const deleteTodoItem = (todoIndex) => {
    setTodos((todos) => todos.filter((todo, idx) => idx !== todoIndex));
  };

  return (
    <div className={styles.todoContainer}>
      <header className={styles.header}>
        <h1>Todoer</h1>
        <h3>Add your next todo gracefully. (click to mark as complete)</h3>
      </header>
      <div className={styles.formArea}>
        <textarea
          className={styles.textField}
          onChange={(e) => setNextTodo(e.target.value)}
          value={nextTodo}
        />
        <button onClick={onSave} className={styles.submitBtn}>
          Add
        </button>
      </div>

      <TodoList
        todos={todos}
        onComplete={markAsComplete}
        onDelete={deleteTodoItem}
      />
    </div>
  );
}

const app = document.getElementById("app");
render(<TodoApp />, app);
