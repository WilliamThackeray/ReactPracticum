import logo from './UVUMonogramGreen-0005.png'
import './App.css';
import Header from './Components/Header';
import React, { useState, useEffect } from 'react'

function App() {
  // Initialized default state
  const [serverResponse, setServerResponse] = useState('')
  const [courseDropdown, setCourseDropdown] = useState('')

  // useEffect() is called when the component loads onto the page. This is where we will do default setup type stuff
  useEffect(() => {
    // When the component loads, call the 'callServer()' function to set the state and test server response
    callServer()
  })

  // This will fetch data from the server
  function callServer() {
    fetch('http://localhost:9000/courses') // you can test manually when running the server on your local machine by going to this url
      .then(res => res.text())
      .then(res => setServerResponse(res))
  }


  return (
    <div className="App">
      <div className="">
        <div className="bg-white dark:bg-silver">
          <img src={logo} width="250" height="auto" alt='uvu logo' />
        </div>
        <div>
          Server response: {serverResponse}
        </div>
        <form className="flex flex-col">
          <div id="topDiv" className="px-12 py-2 text-white bg-primary-500">
            <label for="course">Select Course</label><br />
            <select aria-label="Select Course" id="course" name="course" data-cy="course_select" className="rounded text-black px-2 py-1">
              <option selected value="">Choose Courses</option>
            </select><br />

            <div id="uvuIdDiv" className="py-2 hidden">
              <label for="uvuId">UVU ID</label><br />

              <input type="text" placeholder="10234567" id="uvuId" name="uvuId" data-cy="uvuId_input" maxlength="8" className="text-black rounded px-1" />
              <div id="errorsDiv"></div>
            </div>
          </div>

          <div id="botDiv" className="px-12 py-2 mb-5 bg-uvuGray-500 text-black dark:bg-silver">
            <h3 id="uvuIdDisplay" data-cy="uvuIdDisplay" className="text-xl">
              No Logs Selected. Logs will show below.
            </h3>
            <ul data-cy="logs" id="logs"></ul>
            <br />
            <label className="text-xl py-2">New Log</label><br />
            <textarea id="txtArea" aria-label="add log textarea"
              data-cy="log_textarea" className="p-2 text-black"></textarea><br />
            <button id="submitBtn" type="submit" data-cy="add_log_btn" onsubmit="addLog()"
              className="rounded border-2 px-4 py-2 cursor-not-allowed bg-white transistion ease-in-out hover:bg-primary-700 hover:text-white duration-300" disabled>
              Add Log
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;
