import { useState } from "react";
import API from "../../api/api";
import "./Register.css"; // Import CSS

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const register = async () => {
    await API.post("/auth/register", {
      name,
      email,
      password,
      role
    });
    alert("Registered");
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="register-select"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button className="register-btn" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;