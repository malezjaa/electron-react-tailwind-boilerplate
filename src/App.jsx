import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App text-red-900">
      <h1>Electron, react and tailwindwdaaaaaaaaaaaaaa boilderpalte</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p></p>
      </div>
    </div>
  );
}

export default App;
