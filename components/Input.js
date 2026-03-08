"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Input.module.css";

export default function Input({ command, onSubmit }) {
  const [_command, setCommand] = useState(command ? command : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommand("");
    return onSubmit(_command);
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor={!command ? "command" : undefined}>
        <span style={{ color: "#ff9e64" }}>λ</span> ::{" "}
        <span style={{ color: "var(--primary)" }}>~</span>{" "}
        <span style={{ color: "var(--secondary)" }}>&gt;&gt;</span>
      </label>

      <input
        type="text"
        id={!command ? "command" : undefined}
        className={styles.input}
        value={_command}
        onChange={(e) => setCommand(e.target.value)}
        disabled={command ? true : false}
        ref={(input) => input && !command && input.focus()}
        autoFocus={command === ""}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </form>
  );
}
