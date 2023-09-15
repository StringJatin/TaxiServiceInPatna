"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import usersData from "./LoginAccounts.json"; // Import the JSON data

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const authenticateUser = async (username, password) => {
    // Replace this with logic to fetch user data from your JSON data
    const userData = usersData.users.find(
      (user) => user.username === username && user.password === password
    );

    return userData;
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await authenticateUser(username, password);

    if (user) {
      // Store user information in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));

      // Redirect to the appropriate dashboard based on the user's role
      router.push(`/dashboard`);
    } else {
      // Handle authentication failure
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className={styles.loginPageLogin}>
        <div className={styles.loginBoxLogin}>
          <div className={styles.illustrationWrapperLogin}>
            <Image
              src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
              alt="Login"
              layout="responsive"
              width={100}
              height={100}
            />
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
              <button
                type="submit"
                className={styles.loginFormButtonLogin}
                onClick={handleLogin}
              >
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
