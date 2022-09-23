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
        <div className={styles.blueBlob}>
          <svg
            className={styles.blobBlur}
            viewBox="0 0 320 150"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#B1CAF0"
              d="M44.8,-59.2C58.5,-51.8,70.2,-39.2,77.4,-23.6C84.5,-8.1,87,10.5,77.6,20.8C68.1,31,46.7,32.9,31.8,33.3C16.9,33.7,8.4,32.5,-4,37.9C-16.4,43.4,-32.7,55.5,-34.8,50.9C-36.8,46.4,-24.5,25.2,-30.7,9.2C-36.8,-6.7,-61.5,-17.3,-64.9,-25.5C-68.4,-33.7,-50.6,-39.4,-36.2,-46.6C-21.9,-53.8,-10.9,-62.4,2.3,-65.6C15.6,-68.8,31.2,-66.6,44.8,-59.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
