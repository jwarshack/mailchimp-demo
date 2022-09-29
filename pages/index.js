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
        <div className={styles.headingWrapper}>
          <h1 className={styles.writeCopy}>
            Better product descriptions. <br /> More conversions.
          </h1>
          <div>
            <p className={styles.h4Copy}>
              Generate product descriptions that grabs your customers attention.
            </p>
          </div>

          <form className={styles.formStyles} onSubmit={subscribe}>
            <div>
              <input
                className={styles.emailInput}
                id="email-input"
                name="email"
                placeholder="Enter your email address"
                ref={inputRef}
                required
                type="email"
              />
            </div>
            <div>{message ? message : null}</div>
            <button type="submit" className={styles.waitlist}>
              Notify Me
            </button>
          </form>
        </div>
        <div className={styles.colorCircle}>
          <svg
            className={styles.blobBlur}
            width="300"
            height="383"
            viewBox="0 0 100 150"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#C0BFF8"
              d="M41.4,-56.9C52.8,-48.8,60.4,-35.4,61.3,-22.4C62.1,-9.3,56.3,3.5,52.2,17.3C48.2,31,46,45.6,37.6,54.8C29.2,64,14.6,67.7,0.9,66.5C-12.8,65.2,-25.6,59.1,-35.8,50.5C-45.9,41.9,-53.4,30.8,-62.8,16.9C-72.1,3,-83.3,-13.9,-80.5,-27.3C-77.7,-40.7,-60.9,-50.7,-45.1,-57.4C-29.4,-64.1,-14.7,-67.5,0.2,-67.7C15,-67.9,30.1,-65,41.4,-56.9Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className={styles.imageBlur}>
          <Image src="/bleuBlob.png" height={500} width={500} alt="blueblob" />
        </div>
      </div>
    </>
  );
}
