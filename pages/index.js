import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  const inputRef = useRef(null)

  const [message, setMessage] = useState('')

  async function subscribe(e) {
    e.preventDefault()

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputRef.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const { error } = await res.json()

    if (error) {
      setMessage(error)

      console.log(error)
      return
    }

    inputRef.current.value = ''
    setMessage('Success!')



  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <form onSubmit={subscribe}>
            <label htmlFor='email-input'>Email Address</label>
            <input
              id="email-input"
              name="email"
              placeholder='you@awesome.com'
              ref={inputRef}
              required
              type="email"
            />
            <div>
              {message ? message : null}
            </div>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </main>
    </div>
  )
}
