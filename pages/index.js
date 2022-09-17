import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const inputRef = useRef(null);

  const [message, setMessage] = useState("");

  async function subscribe(e) {
    e.preventDefault();

    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: inputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();

    if (error) {
      setMessage(error);

      console.log(error);
      return;
    }

    inputRef.current.value = "";
    setMessage("Success!");
  }
  return (
    <>
      <div className={styles.landingWrapper}>
        <h1 className={styles.writeCopy}>
          Write Product Descriptions <br /> That Grabs Your
          <br /> Customers Attention
        </h1>
        <form className={styles.formStyles} onSubmit={subscribe}>
          <input
            className={styles.emailInput}
            id="email-input"
            name="email"
            placeholder="Enter your email address"
            ref={inputRef}
            required
            type="email"
          />
          <div>{message ? message : null}</div>
          <button type="submit" className={styles.waitlist}>
            Join the waitlist!
          </button>
        </form>
      </div>
    </>
  );
}
