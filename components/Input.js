"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Input.module.css";
import { COMMANDS } from "../utils/commandHelper";

export default function Input({ command, onSubmit }) {
  const [_command, setCommand] = useState(command ? command : "");
  const [tabIndex, setTabIndex] = useState(-1);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [originalInput, setOriginalInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommand("");
    setTabIndex(-1);
    setCurrentSuggestions([]);
    return onSubmit(_command);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();

      let input = originalInput;
      let suggestions = currentSuggestions;
      let newTabIndex = tabIndex + 1;

      // If this is the first tab press or we're starting a new search
      if (tabIndex === -1) {
        input = _command.toLowerCase().trim();
        if (!input) return;
        
        suggestions = COMMANDS.filter((cmd) =>
          cmd.command.startsWith(input)
        ).map((cmd) => cmd.command);
        
        if (suggestions.length === 0) return;
        
        setOriginalInput(input);
        setCurrentSuggestions(suggestions);
        newTabIndex = 0;
      }

      // Cycle suggestions
      const index = newTabIndex % suggestions.length;
      setTabIndex(index);
      setCommand(suggestions[index]);
    } else {
      // Any other key clears the tab cycling state
      setTabIndex(-1);
      setCurrentSuggestions([]);
      setOriginalInput("");
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor={!command ? "command" : undefined} className={styles.promptLabel}>
        <span className={styles.bracket}>[</span>
        <span className={styles.user}>shivansh</span>
        <span className={styles.host}>@portfolio</span>
        <span className={styles.bracket}>]</span>
        <span className={styles.dollar}>$</span>
      </label>

      <input
        type="text"
        id={!command ? "command" : undefined}
        className={styles.input}
        value={_command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
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
