import * as React from "react";
import styles from "./styles.module.css";

export default function TodoItem({
  id,
  text,
  completed,
  onComplete,
  onDelete,
}) {
  return (
    <li className={styles.todoItem} onClick={() => onComplete(id)}>
      {text}
      {completed ? <span className={styles.checkMark}>✅</span> : null}
      {completed ? (
        <button onClick={() => onDelete(id)} className={styles.delete}>
          &times;
        </button>
      ) : null}
    </li>
  );
}
