'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './SignInPage.module.css';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Call useRouter at the top level

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual authentication logic
    if (username === '123' && password === '123') {
      // Successful login
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      // Redirect to homepage
      router.push('/');
    } else {
      // Handle login failure
      console.error('Invalid credentials');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign In</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Sign In</button>
        </form>
        <div className={styles.signup}>
          Don't have an account? <a href="/signup" className={styles.signupLink}>Sign Up</a>
        </div>
      </div>
    </div>
  );
}
