import React, { useState } from "react"
import "./Login.css" // Importing CSS for styling
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    // Implement your login logic here
    const loginData = {
      email,
      password,
    }
    try {
      const loginInfo = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
      if (loginInfo.ok) {
        navigate("/home")
      } else {
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error logging in ", error)
    }
    // console.log("Logging in with:", email, password)
  }

  const navigateToSignUp = () => {
    navigate("/signup")
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={navigateToSignUp} className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Login
