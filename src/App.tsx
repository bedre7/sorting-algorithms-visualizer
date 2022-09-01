import React from "react";
import "./App.css";
import Controls from "./components/Controls";
import MainHeader from "./components/MainHeader";
import SortingGraph from "./components/SortingGraph";

function App() {
  return (
    <div className="App">
      <MainHeader />
      <SortingGraph arraySize={15}/>
      <Controls />
    </div>
  );
}

export default App;
