import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import React, { Component, useState, useEffect } from 'react'

function App() {
  // Initialized default state
  const [serverResponse, setServerResponse] = useState('booger')

  useEffect(() => {
    callServer()
  })

  // This will fetch data from the server
  function callServer() {
    fetch('http://localhost:9000/testServer')
      .then(res => res.text())
      .then(res => setServerResponse(res))
  }


  return (
    <div className="App">
      <Header name='William and Cache' />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          Response: {serverResponse}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    )
}

export default App;
