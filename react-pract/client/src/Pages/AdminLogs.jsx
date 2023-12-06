import logo from '../UVUMonogramGreen-0005.png'
import React, { useState, useEffect } from 'react'

function AdminLogs() {
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

  function handleKeyUp(event) {
    let len = event.target.value.length
    document.querySelector('#submitBtn').disabled = true
    if (len === 8) {
      getLogs(event.target.value)
      document.querySelector('#submitBtn').disabled = false
    }
  }

  function dropdownUpdate() {
    console.log('dropdownUpdate')
    let val = document.querySelector('#course').value
    document.querySelector('#submitBtn').disabled = true // put this here in case they try to add log but have changed this field
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

  function getLogs(studentId) { //called on key up 
    setUvuId(studentId)
    document.querySelector('#uvuIdDisplay').style.display = 'none'
    let noLogs = document.querySelector('#noLogs')
    noLogs.innerText = ''
    fetch(`http://localhost:9000/api/v1/logs?courseId=${courseId}&uvuId=${studentId}`)
      .then(res => res.json())
      .then(data => {
        setStudentLogs(data)
        if (data.length === 0) {
          noLogs.innerText = 'No student logs for this course'
        }
      })
  }

  async function addLog(event) {
    event.preventDefault()
    let logText = document.querySelector('#txtArea')
    if (logText.value.trim().length) {
      //if the string is not empty or just whitespace
      //get and format date
      const now = new Date();
      let hr = now.getHours();
      let min = now.getMinutes();
      let sec = now.getSeconds();
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      let mon = now.getMonth() + 1; //returns 0-11
      let day = now.getDate();
      let yr = now.getFullYear();
      let time =
        mon +
        '/' +
        day +
        '/' +
        yr +
        ' @ ' +
        hr +
        ':' +
        min +
        ':' +
        sec
      const newLog = {
        courseId: courseId,
        uvuId: document.querySelector('#uvuId').value,
        date: time,
        text: document.querySelector('#txtArea').value.trim()
      }
      document.querySelector('#txtArea').value = ''
      await fetch(`http://localhost:9000/api/v1/logs`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLog)
      })
      getLogs(uvuId)
    }
  }



  return (
    <div className="App">
      <div className="">
        <div>
          <img src={logo} width="250" height="auto" alt='uvu logo' />
        </div>
        <form onSubmit={addLog} method='post'>
          <div id="topDiv">
            <label for="course">Select Course</label><br />
            <select aria-label="Select Course" id="course" name="course" data-cy="course_select" onChange={dropdownUpdate}>
              <option value="Choose Courses">Choose Courses</option>
              {courseDropdown.map(course => <option key={course.id}>{course.display}</option>)}
            </select><br />

            <div id="uvuIdDiv" className="py-2 hidden">
              <label for="uvuId">UVU ID</label><br />

              <input type="number" placeholder="10234567" onKeyDown={preventMoreText} onKeyUp={handleKeyUp} id="uvuId" name="uvuId" data-cy="uvuId_input" />
              <div id="errorsDiv"></div>
            </div>
          </div>
          <div id="botDiv">
            <h3 id="uvuIdDisplay" data-cy="uvuIdDisplay">
              No Logs Selected. Logs will show below.
            </h3>
            <div id='noLogs'></div>
            <ul data-cy="logs" id="logs"></ul>
              {studentLogs.map(log => <li>{log.text}</li>)}
            <br />
            <label>New Log</label><br />
            <textarea id="txtArea" aria-label="add log textarea"
              data-cy="log_textarea"></textarea><br />
            <button id="submitBtn" type="submit" data-cy="add_log_btn" disabled>
              Add Log
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogs;
