'use client'
import Terminal from "../components/Terminal";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>
          shivanshVerma:$ <span className={styles.help}>start exploring ↓</span>
        </h2>
      </div>

      <Terminal />
    </div>
  );
}
