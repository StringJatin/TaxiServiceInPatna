'use client'
import React, { useState } from 'react';
import usersData from './LoginAccounts.json'; // Import the JSON data
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css'


const Login = ({}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    // Find the user based on entered credentials
    const user = usersData.users.find(
      (u) => u.username === username && u.password === password
    );

    
    if (user) {
     setLoginStatus(true);
      
      // Perform the desired action after successful login, e.g., redirect to dashboard
    } else {
      alert('Invalid credentials. Please try again.');
     
    }
  };
  const handleOnSubmit = ()=>{
    if (loginStatus){
        console.log("redirect")
        window.location.href = '/dashboard';
    }
  }

  return (
    <>

   
    <div className={styles.loginPageLogin}>
      <div className={styles.loginBoxLogin}>
        <div className={styles.illustrationWrapperLogin}>
          <Image src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login"  layout="responsive" width={100} height={100} />
        </div>
        <form className={styles.loginFormLogin} onSubmit={handleLogin}>
          <p className={styles.formTitleLogin}>Welcome Admin</p>
          <p>Login to the Dashboard</p>
          <div className={styles.formGroupLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroupLogin}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroupLogin}>
            <button type="submit" className={styles.loginFormButtonLogin} onClick={handleOnSubmit} >
              LOGIN
            </button>
            
          </div>
        </form>
        
      </div>
    </div>

   
    </>
  );
};

export default Login;