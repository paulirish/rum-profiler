import React, { useState } from "react";
import logo from "./logo.svg";
import FlameGraph from "./Flamegraph";
import "./App.css";

var noOfTasks = 0;
function makeSlowTask(ms) {
  var begin = window.performance.now();
  while (window.performance.now() < begin + ms);
}

(function loop() {
  if (noOfTasks > 5) {
    return;
  }
  // Random number in range 100 - 400ms
  var randTaskLen = Math.round(Math.random() * (400 - 10)) + 10;
  var randDelay = Math.round(Math.random() * (1000 - 300)) + 300;
  setTimeout(function() {
    makeSlowTask(randTaskLen);
    noOfTasks++;
    loop();
  }, randDelay);
})();

function App() {
  const [flameGraph, setFlameGraph] = useState(false);
  const Loading = () => (
    <div>Flame graph data is getting generated...</div>
  );

  setTimeout(() => {
    setFlameGraph(true);
  }, 4000);

  return <div className="App">{flameGraph ? <FlameGraph /> : <Loading />}</div>;
}

export default App;
