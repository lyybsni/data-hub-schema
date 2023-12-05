import React from 'react';
import './App.css';
import SchemaTreePage from "./pages/SchemaTree";

function App() {
  return (
      <div className="App">
      <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>

    <div>
        <SchemaTreePage/>
    </div>

      </div>
  );
}

export default App;
