import React from "react";
import TodoItem from "./TodoItem";
import styles from "./todoList.module.css";

export default function TodoList({ todos, onComplete, onDelete }) {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo, idx) => (
        <TodoItem
          key={idx}
          {...todo}
          onComplete={() => onComplete(idx)}
          onDelete={() => onDelete(idx)}
        />
      ))}
    </ul>
  );
}
