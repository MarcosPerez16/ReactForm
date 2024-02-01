import { useState } from "react";

function Authenitcate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setSuccessMessage(result.message);

      if (result.data && result.data.username) {
        setUsername(result.data.username);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 style={{ color: "crimson" }}>Authenticate</h2>
      {successMessage && <p style={{ color: "crimson" }}>{successMessage}</p>}
      {error && <p>{error}</p>}
      {username && (
        <p style={{ color: "crimson" }}>Authenticated as: {username}</p>
      )}
      <button onClick={handleClick} style={{ color: "crimson" }}>
        Authenticate Token
      </button>
    </div>
  );
}

export default Authenitcate;
