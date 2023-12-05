import logo from './UVUMonogramGreen-0005.png'
import './App.css';
// import Header from './Components/Header';
import React, { useState, useEffect } from 'react'

function App() {
  // Initialized default state
  const [courseDropdown, setCourseDropdown] = useState([])
  const [dropDownVal, setDropDownVal] =useState([])
  const [studentLogs, setStudentLogs] = useState([])
  const [studentNumber, setStudentNumber] = useState('')

  // useEffect() is called when the component loads onto the page. This is where we will do default setup type stuff
  useEffect(() => {
    // When the component loads, call the 'callServer()' function to set the state and test server response
    populateDropdown()
  }, [])

  // This will fetch data from the server
  function populateDropdown() {
    fetch('http://localhost:9000/courses') // you can test manually when running the server on your local machine by going to this url
      .then(res => res.json())
      .then(data => {
        setCourseDropdown(data)
        // console.log(data)
      })
  }

  function numUpdate() { // used to update the student number state to query the DB
    setStudentNumber(document.querySelector('input').value)
  }
  function dropdownUpdate() {
    console.log('dropdownUpdate')
    let val = document.querySelector('#course').value
    setDropDownVal(val)
    console.log(dropDownVal)
  }

  function getLogs() {
    // fetch url should look like:
      // logs?courseId={cs3380}&uvuId={10333333}
    
  }






  return (
    <div className="App">
      <div className="">
        <div className="bg-white dark:bg-silver">
          <img src={logo} width="250" height="auto" alt='uvu logo' />
        </div>
        <form className="flex flex-col">
          <div id="topDiv" className="px-12 py-2 text-white bg-primary-500">
            <label for="course">Select Course</label><br />
            <select aria-label="Select Course" id="course" name="course" data-cy="course_select" className="rounded text-black px-2 py-1" onChange={dropdownUpdate}>
              <option selected value="">Choose Courses</option>
              {courseDropdown.map(course => <option key={course.id}>{course.display}</option>)}
            </select><br />

            <div id="uvuIdDiv" className="py-2 hidden">
              <label for="uvuId">UVU ID</label><br />

              <input type="text" placeholder="10234567" onChange={numUpdate} id="uvuId" name="uvuId" data-cy="uvuId_input" maxlength="8" className="text-black rounded px-1" />
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
