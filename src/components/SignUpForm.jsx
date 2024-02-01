import { useState } from "react";

function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.length < 5) {
      setError("Username must be at least five characters long!");
      return;
    }

    try {
      const url = "https://fsa-jwt-practice.herokuapp.com/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json();
      console.log(result);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2 style={{ color: "blue" }}>Sign Up</h2>
      {error && <p style={{ color: "blue" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label style={{ color: "black" }}>
          UserName:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "10px", color: "black" }}>
          Password:{" "}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
