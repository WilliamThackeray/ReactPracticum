import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import React, { useState, useEffect } from 'react'

function App() {
  // Initialized default state
  const [serverResponse, setServerResponse] = useState('booger')

  // useEffect() is called when the component loads onto the page. This is where we will do default setup type stuff
  useEffect(() => {
    // When the component loads, call the 'callServer()' function to set the state and test server response
    callServer()
  })

  // This will fetch data from the server
  function callServer() {
    fetch('http://localhost:9000/testServer') // you can test manually when running the server on your local machine by going to this url
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
          {/* This is used to display the server's response for testing */}
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
