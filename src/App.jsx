import { useState } from "react";
import "./App.css";

import Topbar from "./components/Navbar";
import RoutesComp from "./route";
import Sidebar from "./components/Sidebar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Topbar />
      <div style={{ display: "flex", gap: "100px" }}>
        <Sidebar />
        <div className="flex-grow-1 p-4" style={{ marginLeft: "220px" }}>
          <RoutesComp />
        </div>
      </div>
    </>
  );
}

export default App;
