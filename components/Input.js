"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Input.module.css";
import { COMMANDS, CONTENTS } from "../utils/commandHelper";

export default function Input({ command, onSubmit, history }) {
  const [_command, setCommand] = useState(command ? command : "");
  const [tabIndex, setTabIndex] = useState(-1);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [originalInput, setOriginalInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(history?.length || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommand("");
    setTabIndex(-1);
    setCurrentSuggestions([]);
    setHistoryIndex(history?.length + 1 || 0); // Reset for next input
    return onSubmit(_command);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      // ... existing tab logic ...
      e.preventDefault();

      let input = originalInput;
      let suggestions = currentSuggestions;
      let newTabIndex = tabIndex + 1;

      // If this is the first tab press or we're starting a new search
      if (tabIndex === -1) {
        input = _command.toLowerCase().trim();
        if (!input) return;
        
        // Include both standard COMMANDS and keys from CONTENTS (for hidden commands)
        const allCommandKeys = Array.from(new Set([
          ...COMMANDS.map(c => c.command),
          ...Object.keys(CONTENTS).filter(k => k !== 'error')
        ]));

        suggestions = allCommandKeys.filter((cmd) =>
          cmd.startsWith(input)
        );
        
        if (suggestions.length === 0) return;
        
        setOriginalInput(input);
        setCurrentSuggestions(suggestions);
        newTabIndex = 0;
      }

      // Cycle suggestions
      const index = newTabIndex % suggestions.length;
      setTabIndex(index);
      setCommand(suggestions[index]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history || history.length === 0) return;

      const newIndex = Math.max(0, historyIndex - 1);
      if (newIndex !== historyIndex) {
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!history || history.length === 0) return;

      const newIndex = Math.min(history.length, historyIndex + 1);
      if (newIndex !== historyIndex) {
        setHistoryIndex(newIndex);
        if (newIndex === history.length) {
          setCommand("");
        } else {
          setCommand(history[newIndex]);
        }
      }
    } else {
      // Any other key clears the tab cycling state
      setTabIndex(-1);
      setCurrentSuggestions([]);
      setOriginalInput("");
      // Reset history index if user starts typing something new
      if (e.key !== "Enter" && e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt" && e.key !== "Meta") {
        setHistoryIndex(history?.length || 0);
      }
    }
  };

  if (command !== undefined && command !== null) {
    return (
      <div className={styles.form}>
        <label className={styles.promptLabel}>
          <span className={styles.bracket}>[</span>
          <span className={styles.user}>shivansh</span>
          <span className={styles.host}>@portfolio</span>
          <span className={styles.bracket}>]</span>
          <span className={styles.dollar}>$</span>
        </label>
        <span className={styles.input}>{command}</span>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="command" className={styles.promptLabel}>
        <span className={styles.bracket}>[</span>
        <span className={styles.user}>shivansh</span>
        <span className={styles.host}>@portfolio</span>
        <span className={styles.bracket}>]</span>
        <span className={styles.dollar}>$</span>
      </label>

      <input
        type="text"
        id="command"
        className={styles.input}
        value={_command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={(input) => input && input.focus()}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </form>
  );
}
