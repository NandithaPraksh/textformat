import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [type, setType] = useState("uppercase");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    const res = await fetch("https://precious-tranquility-production-0b28.up.railway.app/format", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text, type })
    });

    const data = await res.json();
    setResult(data.result);
    fetchHistory();
  };

  const fetchHistory = async () => {
    const res = await fetch("https://precious-tranquility-production-0b28.up.railway.app/history");
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex flex-col items-center p-6">

      <h1 className="text-4xl font-bold mb-6">🌌 Text Formatter</h1>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md">

        <input
          type="text"
          placeholder="Enter your text..."
          className="w-full p-2 mb-4 rounded bg-white text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className="w-full p-2 mb-4 rounded text-black"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="reverse">Reverse</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white font-semibold"
        >
          Transform
        </button>

        {result && (
          <div className="mt-4 p-3 bg-white text-black rounded">
            Result: {result}
          </div>
        )}
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl mb-2">History</h2>
        <div className="space-y-2">
          {history.map((item, index) => (
            <div key={index} className="bg-white/10 p-2 rounded">
              {item.text} → {item.result}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;