import logo from './UVUMonogramGreen-0005.png'
import './App.css';
// import Header from './Components/Header';
import React, { useState, useEffect } from 'react'

function App() {
  // Initialized default state
  const [courseDropdown, setCourseDropdown] = useState([])
  const [courseId, setCourseId] =useState([])
  const [studentLogs, setStudentLogs] = useState([])
  const [uvuId, setUvuId] = useState('')

  // useEffect() is called when the component loads onto the page. This is where we will do default setup type stuff
  useEffect(() => {

    populateDropdown()
  }, [])

  // This will fetch data from the server
  function populateDropdown() {
    fetch('http://localhost:9000/api/v1/courses') // you can test manually when running the server on your local machine by going to this url
      .then(res => res.json())
      .then(data => {
        setCourseDropdown(data)
        // console.log(data)
      })
  }

  function preventMoreText(event) { //used to stop more text
    if (event.key === 'Backspace') return
    else if (event.target.value.length === 8) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  function dropdownUpdate() {
    console.log('dropdownUpdate')
    let val = document.querySelector('#course').value
    console.log('val: ',val)
    switch(val){
      case 'CS 3380':
        console.log('cs 3380')
        setCourseId('cs3380')
        break;
      case 'CS 4660':
        setCourseId('cs4660')
        break;
      case 'CS 4690':
        setCourseId('cs4690')
        break;
      default:
        console.log('default')
        setCourseId('')
    }

  }

  function getLogs(event) { //called on key up 
    // got this working... mostly...
    // something were being a little weird with not getting anything from the query and then after an error in the code the query gets stuff back.  -William

    // console.log('courseDropdown: ', courseDropdown)
    // console.log('courseId: ', courseId)
    // console.log('uvuId: ', event.target.value)

    if (event.target.value.length === 8) {
      setUvuId(event.target.value)
      fetch(`http://localhost:9000/api/v1/logs?courseId=${courseId}&uvuId=${event.target.value}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setStudentLogs(data)
        })
    }

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
              {courseDropdown.map(course => <option key={course.id} querydata={course.id}>{course.display}</option>)}
            </select><br />

            <div id="uvuIdDiv" className="py-2 hidden">
              <label for="uvuId">UVU ID</label><br />

              <input type="number" placeholder="10234567" onKeyDown={preventMoreText} onKeyUp={getLogs} id="uvuId" name="uvuId" data-cy="uvuId_input" maxlength="8" className="text-black rounded px-1" />
              <div id="errorsDiv"></div>
            </div>
          </div>

          <div id="botDiv" className="px-12 py-2 mb-5 bg-uvuGray-500 text-black dark:bg-silver">
            <h3 id="uvuIdDisplay" data-cy="uvuIdDisplay" className="text-xl">
              No Logs Selected. Logs will show below.
            </h3>
            <ul data-cy="logs" id="logs"></ul>
            {/*    this is not working yet     */}
              {studentLogs.map(log => <li>{log.text}</li>)}
            <br />
            <label className="text-xl py-2">New Log</label><br />
            <textarea id="txtArea" aria-label="add log textarea"
              data-cy="log_textarea" className="p-2 text-black"></textarea><br />
            <button id="submitBtn" type="submit" data-cy="add_log_btn" onSubmit="addLog()"
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
