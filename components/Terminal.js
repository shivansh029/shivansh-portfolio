"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENTS } from "../utils/commandHelper";
import Command from "./Command";
import styles from "./Terminal.module.css";
import MatrixRain from "./MatrixRain";

export default function Terminal() {
  const [commands, setCommands] = useState([{ command: "help", output: CONTENTS.help() }]);
  const [loading, setLoading] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [commandCount, setCommandCount] = useState(0);
  const [hintThreshold, setHintThreshold] = useState(Math.floor(Math.random() * 11) + 5);
  const [history, setHistory] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = terminalRef.current;
    if (!term) return;

    // Small delay to wait for React's DOM update and browser reflow
    const timer = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } = term;
      const isOverflowing = scrollHeight > clientHeight + scrollTop + 20;

      if (isOverflowing && !loading) {
        setShowScrollHint(true);
      }
    }, 100);

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = term;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 20;
      if (atBottom) {
        setShowScrollHint(false);
      }
    };

    term.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      term?.removeEventListener("scroll", handleScroll);
    };
  }, [commands, loading]);

  const escapeHTML = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el && terminalRef.current) {
      terminalRef.current.scrollTop = el.offsetTop;
    }
  };

  const addCommand = async (rawCommand) => {
    // 0. Update command count and history
    if (rawCommand.trim()) {
      setHistory(prev => {
        // Only add to history if it's different from the last command
        if (prev[prev.length - 1] === rawCommand.trim()) return prev;
        return [...prev, rawCommand.trim()];
      });
    }
    setCommandCount(prev => prev + 1);
    const isHintTime = commandCount + 1 >= hintThreshold;

    const showHint = () => {
      const proTip = "Pro-tip: Did you know there are hidden protocols? Try <u>secret</u> to list them.";
      setCommands(prev => [...prev, { 
        command: "SYSTEM TIP", 
        output: `<span style="color:var(--secondary)">[PRO-TIP]</span> ${proTip}` 
      }]);
      setCommandCount(0);
      setHintThreshold(Math.floor(Math.random() * 11) + 5); // New random threshold between 5-15
    };

    if (!rawCommand.trim()) {
      const cmdId = `cmd-${commands.length}`;
      setCommands((prev) => [...prev, { command: "", output: "" }]);
      setTimeout(() => scrollToId(cmdId), 10);
      
      if (isHintTime) {
        setTimeout(showHint, 200);
      }
      return;
    }

    const parts = rawCommand.toLowerCase().trim().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    if (command === "clear") return setCommands([]);
    if (command === "matrix") {
      setLoading(true);
      const output = CONTENTS.matrix();
      const cmdId = `cmd-${commands.length}`;
      setCommands((prev) => [...prev, { command: rawCommand, output }]);
      setTimeout(() => scrollToId(cmdId), 10);
      setTimeout(() => setShowMatrix(true), 1000);
      return;
    }

    setShowScrollHint(false);
    const cmdId = `cmd-${commands.length}`;

    // 1. Handle instant commands or errors
    const normalizedInput = rawCommand.toLowerCase().trim();
    if (
      command === "help" ||
      command === "whoami" ||
      normalizedInput === "sudo rm -rf /" ||
      !(command in CONTENTS)
    ) {
      const output =
        command === "help"
          ? CONTENTS.help()
          : command === "whoami"
          ? CONTENTS.whoami()
          : normalizedInput === "sudo rm -rf /"
          ? CONTENTS[normalizedInput]()
          : CONTENTS.error(escapeHTML(rawCommand));
      setCommands((prev) => [...prev, { command: rawCommand, output }]);
      setTimeout(() => scrollToId(cmdId), 10);
      
      if (isHintTime) {
        setTimeout(showHint, 200);
      }
      return;
    }

    // Special case for theme which needs to handle arguments immediately
    if (command === "theme") {
      const output = CONTENTS.theme(args);
      setCommands(prev => [...prev, { command: rawCommand, output }]);
      setTimeout(() => scrollToId(cmdId), 10);
      return;
    }

    // 2. Handle staggered reveal commands
    setLoading(true);
    const messages = {
      about: "user profile",
      experience: "professional experience",
      skills: "skill",
      education: "education",
      certifications: "certification",
      contact: "contact",
    };

    const isResume = command === "resume";
    const isHireMe = command === "hire-me";
    const isCoffee = command === "coffee";
    const label = messages[command] || command;

    const systemMsg = isResume
      ? `<span style="color:var(--system-msg)">[SYSTEM]</span> Fetching resume`
      : isHireMe
      ? `<span style="color:var(--system-msg)">[SYSTEM]</span> Access granted.<br /><span style="color:var(--primary)">[USER]</span> Recruiter detected.`
      : isCoffee
      ? `Brewing coffee...`
      : `<span style="color:var(--system-msg)">[SYSTEM]</span> Fetching ${label} records...`;

    const okMsg = isResume
      ? `<br /><span style="color:var(--system-msg)">[OK]</span> opening resume`
      : isHireMe
      ? `<br /><span style="color:var(--system-msg)">[OK]</span> Opening contact channels...<br /><br />`
      : isCoffee
      ? `<br />☕ Ready.<br /><br />`
      : `<br /><span style="color:var(--system-msg)">[OK]</span> ${label} records loaded successfully.<br /><br />`;

    // Start fetching and add initial entry
    const dataPromise = CONTENTS[command]();
    setCommands((prev) => [...prev, { command: rawCommand, output: systemMsg }]);
    setTimeout(() => scrollToId(cmdId), 10);

    try {
      // Parallel wait: Minimum delay for "realism" + background data fetch
      const [output] = await Promise.all([
        dataPromise,
        new Promise((r) => setTimeout(r, 600)), // Custom delay for resume
      ]);

      // Show success message
      setCommands((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          ...next[next.length - 1],
          output: systemMsg + okMsg,
        };
        return next;
      });
      setTimeout(() => scrollToId(cmdId), 10);

      if (isResume) {
        await new Promise((r) => setTimeout(r, 550));
        window.open(output, "_blank");
        setLoading(false);
        return;
      }

      // Brief pause to acknowledge success before dumping data
      await new Promise((r) => setTimeout(r, 185));

      setCommands((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          ...next[next.length - 1],
          output: systemMsg + okMsg + output,
        };
        return next;
      });
      setLoading(false);
      setTimeout(() => scrollToId(cmdId), 10);
      
      // Show hint if threshold reached
      if (isHintTime) {
        setTimeout(showHint, 500);
      }
    } catch (err) {
      setLoading(false);
      setCommands(prev => {
        const next = [...prev];
        next[next.length - 1].output = systemMsg + `<br /><span style="color:var(--error-msg)">[ERROR]</span> Internal system failure.`;
        return next;
      });
    }
  };

  const handleTerminalClick = () => {
    if (terminalRef.current) {
      const input = terminalRef.current.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <div className={styles.terminalWrapper}>
      <div className={styles.terminalHeader}>
        <div className={styles.buttons}>
          <span className={`${styles.button} ${styles.close}`}></span>
          <span className={`${styles.button} ${styles.minimize}`}></span>
          <span className={`${styles.button} ${styles.maximize}`}></span>
        </div>
        <div className={styles.title}>zsh terminal</div>
      </div>
      <div
        className={styles.terminal}
        ref={terminalRef}
        onClick={handleTerminalClick}
      >
        {commands.map(({ command, output }, index) => (
          <Command
            id={`cmd-${index}`}
            command={command}
            output={output}
            key={index}
          />
        ))}
        {!loading && (
          <Command 
            onSubmit={(command) => addCommand(command)} 
            history={history}
          />
        )}
      </div>
      {showScrollHint && (
        <div className={styles.scrollHint}>
          [ ↓ More data available — Scroll to view ]
        </div>
      )}
      {showMatrix && (
        <MatrixRain
          duration={5000}
          onComplete={() => {
            setShowMatrix(false);
            setLoading(false);
          }}
        />
      )}
    </div>
  );
}
