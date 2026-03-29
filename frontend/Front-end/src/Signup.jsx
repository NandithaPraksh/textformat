import { useState } from "react";

function Signup({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = "https://precious-tranquility-production-0b28.up.railway.app";

  const handleSignup = async () => {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.message === "User created") {
      alert("Signup successful 💖");
      setPage("home"); // 🚀 GO TO MAIN APP
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">

      <h2 className="text-2xl mb-4">Signup 💖</h2>

      <input
        className="p-2 mb-3 text-black"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="p-2 mb-3 text-black"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Signup
      </button>

      <button
        onClick={() => setPage("home")}
        className="mt-3 text-sm text-blue-300"
      >
        Skip (Go to App)
      </button>

    </div>
  );
}

export default Signup;